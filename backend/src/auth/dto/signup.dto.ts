import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class SignUpDto {
    // Kullanıcıdan alınacak verilerin doğrulaması
    @IsNotEmpty()
    @IsString()
    readonly name: string;
  
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}