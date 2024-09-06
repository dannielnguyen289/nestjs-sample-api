import { Global, Module } from '@nestjs/common'
import { HashingManager } from './hashing.manager'
import { CryptoManager } from './crypto.manager'
import { JwtManager } from './jwt.manager'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '@nestjs/config'

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [HashingManager, CryptoManager, JwtManager],
  exports: [HashingManager, CryptoManager, JwtManager]
})
export class ManagerModule {}
