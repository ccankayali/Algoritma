// app.module.ts
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { WordModule } from './word/word.module';
import { CorsMiddleware } from './cors.middleware'; // CORS middleware'ini ekleyin

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Algoritma'),
    AuthModule,
    WordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware) // CORS middleware'i uygula
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Tüm istekler için CORS başlıklarını ekle
  }
}
