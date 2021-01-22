import { Module } from '@nestjs/common'

import { DummyService } from './dummy.service'
import { DummyController } from './dummy.controller'

@Module({
  imports: [],
  providers: [DummyService],
  controllers: [DummyController]
})
export class DummyModule {}
