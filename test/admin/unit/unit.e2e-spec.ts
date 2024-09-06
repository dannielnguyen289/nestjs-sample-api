import * as fs from 'fs'
import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from '../../../src/app.module'
import { BusinessExceptionFilter } from '../../../src/core/exception/business.exception.filter'

describe('Admin > UnitController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    // Declare variable
    app = moduleFixture.createNestApplication()

    // Global filter
    app.useGlobalFilters(new BusinessExceptionFilter())

    // Global pipes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        validateCustomDecorators: true
      })
    )

    // Init app
    await app.init()
  })

  /**
   * List: Case 01 - Normal
   */
  it('List: Case 01 - Normal', () => {
    // Prepare
    const data = fs.readFileSync('./test/admin/unit/list/case-01-data.json', 'utf-8')
    fs.writeFileSync('./data/unit.json', data, 'utf-8')

    // Expect
    const exceptBody = JSON.parse(fs.readFileSync('./test/admin/unit/list/case-01-expect.json', 'utf-8'))

    // Execute
    return request(app.getHttpServer()).get('/admin/unit').expect(200).expect(exceptBody)
  })

  /**
   * Create: Case 01 - Normal
   */
  it('Create: Case 01 - Normal', () => {
    // Prepare
    const data = fs.readFileSync('./test/admin/unit/create/case-00-data.json', 'utf-8')
    fs.writeFileSync('./data/unit.json', data, 'utf-8')

    // Expect
    const requestBody = JSON.parse(fs.readFileSync('./test/admin/unit/create/case-01-body.json', 'utf-8'))

    // Expect
    const exceptBody = JSON.parse(fs.readFileSync('./test/admin/unit/create/case-01-expect.json', 'utf-8'))

    // Execute
    return request(app.getHttpServer())
      .post('/admin/unit')
      .send(requestBody)
      .expect(201)
      .expect((result: any) => {
        console.log()
        return result.id && result.name === exceptBody.name
      })
  })

  /**
   * Create: Case 01 - Empty
   */
  it('Create: Case 02 - Empty', () => {
    // Prepare
    const data = fs.readFileSync('./test/admin/unit/create/case-00-data.json', 'utf-8')
    fs.writeFileSync('./data/unit.json', data, 'utf-8')

    // Expect
    const requestBody = JSON.parse(fs.readFileSync('./test/admin/unit/create/case-02-body.json', 'utf-8'))

    // Expect
    const exceptBody = JSON.parse(fs.readFileSync('./test/admin/unit/create/case-02-expect.json', 'utf-8'))

    // Execute
    return request(app.getHttpServer())
      .post('/admin/unit')
      .send(requestBody)
      .expect(400)
      .expect((result: any) => {
        console.log()
        return result.id && result.name === exceptBody.name
      })
  })

  /**
   * Create: Case 02 - Max Length
   */
  it('Create: Case 02 - Max Length', () => {
    // Prepare
    const data = fs.readFileSync('./test/admin/unit/create/case-00-data.json', 'utf-8')
    fs.writeFileSync('./data/unit.json', data, 'utf-8')

    // Expect
    const requestBody = JSON.parse(fs.readFileSync('./test/admin/unit/create/case-02-body.json', 'utf-8'))

    // Expect
    const exceptBody = JSON.parse(fs.readFileSync('./test/admin/unit/create/case-02-expect.json', 'utf-8'))

    // Execute
    return request(app.getHttpServer())
      .post('/admin/unit')
      .send(requestBody)
      .expect(400)
      .expect((result: any) => {
        console.log()
        return result.id && result.name === exceptBody.name
      })
  })

  /**
   * Detail: Case 01 -> Normal
   */
  it('Detail: Case 01 -> Normal', () => {
    // Prepare
    const data = fs.readFileSync('./test/admin/unit/detail/case-00-data.json', 'utf-8')
    fs.writeFileSync('./data/unit.json', data, 'utf-8')

    // Expect
    const exceptBody = JSON.parse(fs.readFileSync('./test/admin/unit/detail/case-01-expect.json', 'utf-8'))

    // Execute
    return request(app.getHttpServer())
      .get('/admin/unit/3b19d4db-d843-419f-aabf-db7b7457e7bc')
      .expect(200)
      .expect((result: any) => {
        return result.id && result.name === exceptBody.name
      })
  })

  /**
   * Detail: Case 01 -> Not Found
   */
  it('Detail: Case 02 -> Not Found', () => {
    // Prepare
    const data = fs.readFileSync('./test/admin/unit/detail/case-00-data.json', 'utf-8')
    fs.writeFileSync('./data/unit.json', data, 'utf-8')

    // Expect
    const exceptBody = JSON.parse(fs.readFileSync('./test/admin/unit/detail/case-02-expect.json', 'utf-8'))

    // Execute
    return request(app.getHttpServer())
      .get('/admin/unit/b633e98a-df9a-418a-8d29-fdda0e771a0a')
      .expect(200)
      .expect('code', '1')
      .expect(exceptBody)
  })

  /**
   * Detail: Case 01 -> Not Found
   */
  it('Detail: Case 03 -> Must UUID', () => {
    // Prepare
    const data = fs.readFileSync('./test/admin/unit/detail/case-00-data.json', 'utf-8')
    fs.writeFileSync('./data/unit.json', data, 'utf-8')

    // Expect
    const exceptBody = JSON.parse(fs.readFileSync('./test/admin/unit/detail/case-03-expect.json', 'utf-8'))

    // Execute
    return request(app.getHttpServer()).get('/admin/unit/1234567890').expect(400).expect(exceptBody)
  })
})
