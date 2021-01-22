import { Injectable } from '@nestjs/common'

import { Dummy } from './dummy'

@Injectable()
export class DummyService {
  async get(): Promise<Dummy> {
    return { name: 'Toth Janos!' }
  }
}
