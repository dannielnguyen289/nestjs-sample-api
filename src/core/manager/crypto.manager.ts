import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createCipheriv, createDecipheriv } from 'crypto'

@Injectable()
export class CryptoManager {
  constructor(private configService: ConfigService) {}

  async encrypt(plainText: string) {
    const iv = this.configService.get('CRYPTO_IV')
    const secret = this.configService.get('CRYPTO_SECRET')

    const cipher = createCipheriv('aes-256-ctr', Buffer.from(secret, 'base64'), Buffer.from(iv, 'base64'))

    let encryptedText = cipher.update(plainText, 'utf-8', 'base64')
    encryptedText += cipher.final('base64')

    return encryptedText
  }

  async decrypt(encryptedText: any) {
    const iv = this.configService.get('CRYPTO_IV')
    const secret = this.configService.get('CRYPTO_SECRET')

    const decipher = createDecipheriv('aes-256-ctr', Buffer.from(secret, 'base64'), Buffer.from(iv, 'base64'))

    let decryptedText = decipher.update(encryptedText, 'base64', 'utf-8')
    decryptedText += decipher.final('utf-8')

    return decryptedText
  }
}
