import { Response } from 'express'
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { BusinessException } from './business.exception'

@Catch(BusinessException)
export class BusinessExceptionFilter<BusinessException> implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    // @ts-expect-error business exception code
    const code = exception.code

    // @ts-expect-error business exception code
    const reason = exception.reason

    // @ts-expect-error business exception code
    const data = exception.data

    response.status(HttpStatus.OK.valueOf()).set('code', `${code}`).json({
      code: code,
      error: 'Business Logical Error',
      message: reason,
      data: data
    })
  }
}
