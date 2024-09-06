import * as fs from 'node:fs'
import { Injectable } from '@nestjs/common'
import { BusinessException } from '../../../core/exception/business.exception'
import { DetailResBody } from './dto/detail.res-body'

@Injectable()
export class UnitService {
  /**
   * Get detail of item
   *
   * @param id
   */
  find(id: string): DetailResBody {
    const rawData = fs.readFileSync('./data/unit.json', 'utf-8')
    const data = JSON.parse(rawData)

    const item = data.find(x => x.id === id)

    if (!item) {
      throw new BusinessException(1, `Item with id [${id}] does not exist.`, { id })
    }

    const res = new DetailResBody()
    res.id = item.id
    res.name = item.name

    return res
  }
}
