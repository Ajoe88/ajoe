import { Controller, Get } from '@nestjs/common'

import { DummyService } from './dummy.service'
import { Dummy } from './dummy'

@Controller('api/dummy')
export class DummyController {
  constructor(private dummyService: DummyService) {}

  @Get()
  async one(): Promise<Dummy> {
    return this.dummyService.get()
  }
}
