import { Injectable } from "@nestjs/common";
import { SignUpDto } from "./dto/signup.dto";
import { SignInDto } from "./dto/signin.dto";
import nodemailer from 'nodemailer';
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document } from "mongoose";
import { User } from "./entities/user.entity";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
    
    async signUp(signUpDto: SignUpDto): Promise<any> {
        const { name, email, password } = signUpDto;
        
        // Yeni kullanıcı oluşturma
        const newUser = new this.userModel({
            name,
            email,
            password
        });

        // Veritabanına yeni kullanıcıyı kaydetme
        await newUser.save();

        return { message: 'Kullanıcı başarıyla oluşturuldu' };
    }
    
    async signIn(signInDto: SignInDto): Promise<any> {
        const { email, password } = signInDto;

        // Kullanıcıyı e-posta ve şifresine göre arama
        const user = await this.userModel.findOne({ email, password }).exec();
        
        if (!user) {
            return { message: 'Giriş bilgileri geçersiz' };
        } else {
            return { message: 'Giriş başarılı', user };
        }
    }

    // Tasarlanmadı
    async logout(): Promise<any> {
        return { message: 'Çıkış başarılı' };
    }

    // Forgot Password kısmı için tasarlandı fakat kullanıma açılmadı
    async generateTemporaryPassword(length: number = 8): Promise<string> {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let temporaryPassword = '';
        for (let i = 0; i < length; i++) {
            temporaryPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return temporaryPassword;
    }

    async forgotPassword(forgotPasswordDto: SignUpDto): Promise<any> {
        const { email } = forgotPasswordDto;
        
        // Kullanıcıyı e-posta adresine göre arama
        const user = await this.userModel.findOne({ email }).exec();
        
        if (!user) {
            return { message: 'Kullanıcı bulunamadı' };
        } else {
            // Geçici şifre oluşturma
            const temporaryPassword = await this.generateTemporaryPassword();
            
            // Kullanıcının şifresini güncelleme
            user.password = temporaryPassword;
            await user.save();
            
            // E-posta gönderme
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'canpanates@gmail.com',
                    pass: 'canpanates2024!'
                }
            });

            const mailOptions = {
                from: 'canpanates@gmail.com',
                to: 'a@aa',
                subject: 'Şifre Sıfırlama',
                text: `Yeni şifreniz: ${temporaryPassword}`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('E-posta gönderme hatası:', error);
                } else {
                    console.log('E-posta gönderildi:', info.response);
                }
            });

            return { message: 'Şifre sıfırlama e-postası gönderildi ve şifre güncellendi' };
        }
    }
}
