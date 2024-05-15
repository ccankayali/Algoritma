import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from "./entities/word.entity";
import { WordController } from './word.controller';
import { WordService } from './word.service';

@Module({
    // Bu dosya / DTO / SCHEMA arasında kkurulan bağlantı kodlarını bozmamaya dikkat edin
    imports: [MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }])],
    controllers: [WordController],
    providers: [WordService],
})
export class WordModule {}
