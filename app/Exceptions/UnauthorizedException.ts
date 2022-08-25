import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class UnauthorizedException extends Exception {
  constructor (message: string) {
    super(message, 403)
  }

  public async handle (error: this, { response }: HttpContextContract){
    return response.forbidden({ message: error.message })
  }
}