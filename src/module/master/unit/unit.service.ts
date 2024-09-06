import * as fs from 'fs'
import { uuid } from 'uuidv4'
import { Injectable } from '@nestjs/common'
import { Paginator } from '../../../core/util/paginator'
import { ListReqQuery } from './dto/list.req-query'
import { ListResBody } from './dto/list.res-body'
import { CreateReqBody } from './dto/create.req-body'
import { CreateResBody } from './dto/create.res-body'
import { DetailResBody } from './dto/detail.res-body'
import { UpdateReqBody } from './dto/update.req-body'
import { BusinessException } from '../../../core/exception/business.exception'

@Injectable()
export class UnitService {
  constructor(private paginator: Paginator) {}

  /**
   * Get list item
   *
   * @param params
   */
  list(params: ListReqQuery): ListResBody {
    const res = new ListResBody()

    const rawData = fs.readFileSync('./data/unit.json', 'utf-8')
    const data = JSON.parse(rawData)

    res.pagination = this.paginator.calculate(params.pageNo, params.pageSize, data.length)
    const offset = this.paginator.offset(params.pageNo, params.pageSize)

    res.list = data.slice(offset, params.pageSize)
    return res
  }

  /**
   * Create one item
   *
   * @param params
   */
  create(params: CreateReqBody): CreateResBody {
    const rawData = fs.readFileSync('./data/unit.json', 'utf-8')
    const data = JSON.parse(rawData)

    const id = uuid()
    data.push({
      id,
      name: params.name
    })

    fs.writeFileSync('./data/unit.json', JSON.stringify(data, null, 2), 'utf-8')

    const res = new CreateResBody()
    res.id = id
    res.name = params.name

    return res
  }

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

  /**
   * Remove one item
   *
   * @param id
   */
  remove(id: string) {
    const rawData = fs.readFileSync('./data/unit.json', 'utf-8')
    const data = JSON.parse(rawData)

    const item = data.find(x => x.id === id)

    if (!item) {
      throw new BusinessException(1, `Item with id [${id}] does not exist.`, { id })
    }

    data.splice(
      data.findIndex(x => x.id === id),
      1
    )

    fs.writeFileSync('./data/unit.json', JSON.stringify(data, null, 2), 'utf-8')

    return
  }
}
