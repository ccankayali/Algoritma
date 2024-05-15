import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";

@Module({

    // Bu dosya / DTO / SCHEMA arasında kkurulan bağlantı kodlarını bozmamaya dikkat edin
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
