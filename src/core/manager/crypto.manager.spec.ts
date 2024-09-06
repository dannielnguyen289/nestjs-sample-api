import { Test, TestingModule } from '@nestjs/testing'
import { CryptoManager } from './crypto.manager'

describe('CryptoManager', () => {
  let provider: CryptoManager

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoManager]
    }).compile()

    provider = module.get<CryptoManager>(CryptoManager)
  })

  it('should be defined', () => {
    expect(provider).toBeDefined()
  })
})
