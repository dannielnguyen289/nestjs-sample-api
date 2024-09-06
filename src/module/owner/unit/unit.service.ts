import * as fs from 'fs'
import { Injectable } from '@nestjs/common'
import { Paginator } from '../../../core/util/paginator'
import { BusinessException } from '../../../core/exception/business.exception'
import { DetailResBody } from './dto/detail.res-body'
import { UpdateReqBody } from './dto/update.req-body'

@Injectable()
export class UnitService {
  constructor(private paginator: Paginator) {}

  /**
   * Get detail of item
   *
   * @param id
   */
  detail(id: string): DetailResBody {
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

  /**
   * Update one item
   *
   * @param id
   * @param params
   */
  update(id: string, params: UpdateReqBody) {
    const rawData = fs.readFileSync('./data/unit.json', 'utf-8')
    const data = JSON.parse(rawData)

    const item = data.find(x => x.id === id)

    if (!item) {
      throw new BusinessException(1, `Item with id [${id}] does not exist.`, { id })
    }

    item.name = params.name
    data[data.findIndex(x => x.id === id)] = item

    fs.writeFileSync('./data/unit.json', JSON.stringify(data, null, 2), 'utf-8')

    return
  }
}
