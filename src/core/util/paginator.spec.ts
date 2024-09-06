import { Test, TestingModule } from '@nestjs/testing'
import { Paginator } from './paginator'

describe('Paginator', () => {
  let provider: Paginator

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Paginator]
    }).compile()

    provider = module.get<Paginator>(Paginator)
  })

  it('should be defined', () => {
    expect(provider).toBeDefined()
  })
})
