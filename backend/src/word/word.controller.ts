import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, Query, Render, Res } from '@nestjs/common';
import { WordService } from './word.service';
import { Word } from './entities/word.entity';
import { CreateWordDto } from './dto/create-word.dto';

@Controller('/words')
export class WordController {
    constructor(private readonly wordService: WordService) {}

    // Kelime CRUD işlemleri için endpoint'ler
    @Post('/create-word')
    async create(@Body() createWordDto: CreateWordDto): Promise<Word> {
        return this.wordService.create(createWordDto);
        
    }

    @Get('/all-words')
    async findAll(): Promise<Word[]> {
        return this.wordService.findAll();
    }

    @Get('/word/:english | :turkish')
    async findById(@Param('id') id: string): Promise<Word> {
        try {
            return await this.wordService.findById(id);
        } catch (error) {
            throw new NotFoundException('Kelime bulunamadı');
        }
    }

    // Test işlemi ve soru sayısı belirleme endpointi
    @Get('/word/test')
    async test(@Query('count') count: string): Promise<Word[]> {
        const questionCount = parseInt(count, 0) || 0; // Varsayılan değeri 10 olarak ayarla
        return this.wordService.test(questionCount);
    }

    // Test Kontrol
    // correctAnswer kısmını arttırmak (PUT)
    // word/test/check kısmında cevap doğruluğunu döndürebildim
    // ben de burada doğru cevap verildiğinde correctAnswer'ı arttırmak istiyorum
    @Post('/word/test/check')
    async checkAndIncreaseCorrectAnswers(@Body() body: any): Promise<any> {
        const { id, userAnswer } = body;
        return this.wordService.increaseCorrectAnswers(id, userAnswer);
    }

    @Get('/word/analysis')
    async getAnalysis(@Res() res) {
        const analysisData = await this.wordService.getAnalysis();
        res.status(200).json(analysisData);
    }
 }
