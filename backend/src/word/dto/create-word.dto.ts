import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateWordDto {
    // Kullanıcıdan alınacak verilerin doğrulaması
    @IsNotEmpty()
    @IsString()
    english: string;

    @IsNotEmpty()
    @IsString()
    turkish: string;

    @IsNotEmpty()
    @IsUrl()
    image: string;

    @IsNumber()
    correctAnswers: number;
    
    @IsBoolean()
    isKnown: false | true;
}
