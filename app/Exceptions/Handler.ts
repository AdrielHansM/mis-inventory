
import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error, ctx: HttpContextContract) {
    if(error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.notFound({ message: 'Resource not found' })
    }

    if(error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.unauthorized({ message: 'Unauthorized Access' })
    } 

    return super.handle(error, ctx)
  }
}
