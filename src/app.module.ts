import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODBURI),
    
    PassportModule,
    JwtModule.register({
      secret: 'your-super-secret-jwt-key-change-in-production',
      signOptions: { expiresIn: '30m' },
    }),
    AuthModule,
    ServicesModule,
    PortfolioModule,
    ContactModule,
  ],
})
export class AppModule {}