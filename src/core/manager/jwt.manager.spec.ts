import { Test, TestingModule } from '@nestjs/testing'
import { JwtManager } from './jwt.manager'

describe('JwtManager', () => {
  let provider: JwtManager

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtManager]
    }).compile()

    provider = module.get<JwtManager>(JwtManager)
  })

  it('should be defined', () => {
    expect(provider).toBeDefined()
  })
})
