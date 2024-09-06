import { Test, TestingModule } from '@nestjs/testing'
import { HashingManager } from './hashing.manager'

describe('HashingManager', () => {
  let provider: HashingManager

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingManager]
    }).compile()

    provider = module.get<HashingManager>(HashingManager)
  })

  it('should be defined', () => {
    expect(provider).toBeDefined()
  })
})
