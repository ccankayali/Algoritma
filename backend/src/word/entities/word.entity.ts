import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Word extends Document {
    // Kullanıcında olacak verilerin doğrulaması
    @Prop({ required: true })
    english: string;

    @Prop({ required: true })
    turkish: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true, default: 0 })
    correctAnswers: number;

    @Prop({ required: true, default: false })
    isKnown: false | true;
}

export const WordSchema = SchemaFactory.createForClass(Word);