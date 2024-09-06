import { Module } from '@nestjs/common'
import { UnitController } from './unit/unit.controller'
import { UnitService } from './unit/unit.service'

@Module({
  controllers: [UnitController],
  providers: [UnitService]
})
export class UserModule {}
