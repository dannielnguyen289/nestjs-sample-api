import { Global, Module } from '@nestjs/common'
import { Paginator } from './paginator'

@Global()
@Module({
  providers: [Paginator],
  exports: [Paginator]
})
export class UtilModule {}
