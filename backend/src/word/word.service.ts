import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word } from './entities/word.entity';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class WordService {
    constructor(@InjectModel(Word.name) private readonly wordModel: Model<Word>) {}


    // Kelime CRUD işlemleri
    private questionCount: number = 10; // Default olarak 10 soru

    async create(createWordDto: CreateWordDto): Promise<Word> {
        const { english, turkish, image } = createWordDto;
        
        const word = new this.wordModel({
            english,
            turkish,
            image
        });

        return word.save();
    }

    async findAll(): Promise<Word[]> {
        return this.wordModel.find();
    }

    async findById(id: string): Promise<Word> {
        const word = await this.wordModel.findById(id);
        if (!word) {
            throw new NotFoundException('Kelime bulunamadı');
        }
        return word;
    }


    // Kelime test sayısı ve getirme işlemleri
    async test(count: number): Promise<Word[]> {
        return this.wordModel.aggregate([
            {
                $match: {
                    $or: [
                        { isKnown: false },
                        { correctAnswers: { $lt: 6 } }
                    ]
                }
            },
            { $sample: { size: count } }
        ]);
    }
    
    // Doğruluk
    async checkAndCorrectAnswer(id: string, userAnswer: any): Promise<Word | null> {
        const word = await this.wordModel.findById(id);
        if (!word) {
            throw new NotFoundException('Kelime bulunamadı');
        }

        if (word.turkish === userAnswer) {
            return this.increaseCorrectAnswers(id, userAnswer);
        }

        return word;
    }

    // Doğru cevap sayısını artırma
    async increaseCorrectAnswers(id: string, userAnswer: any): Promise<Word> {
        const word = await this.wordModel.findById(id);
        if (!word) {
            throw new NotFoundException('Kelime bulunamadı');
        }

        word.correctAnswers += 1;

        // eğer 6 defa doğru varsa isknown true olacak
        if (word.correctAnswers === 6) {
            word.isKnown = true;
        }
        
        return word.save();
    }

    // Kelime analiz işlemi
    async getAnalysis(): Promise<any[]> {
        const totalWords = await this.wordModel.countDocuments();
        const knownWords = await this.wordModel.countDocuments({ isKnown: true });
        const unknownWords = totalWords - knownWords;
        const analysisData = [
            { topic: 'Toplam Kelime', learnedWords: totalWords, totalWords: totalWords },
            { topic: 'Bilinen Kelime', learnedWords: knownWords, totalWords: totalWords },
            { topic: 'Bilinmeyen Kelime', learnedWords: unknownWords, totalWords: totalWords }
        ];
        return analysisData;
    }
    
    
}
