import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/accounting/User'
import RegisterValidator from 'App/Validators/accounting/RegisterValidator'

export default class AuthController {

  public async accounts({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 25)

    const accounts = await User.query()
      .paginate(page, perPage)

    return response.ok({ data: accounts })
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const validatedData = await request.validate(RegisterValidator)

    const user = await User.create(validatedData)
    const token = await auth.login(user)
    return response.ok({ data: token })
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)
      return response.ok({ data: token })
    } catch (error) {
      return response.badRequest({ message: "Incorrect Username or Password" })
    }
  }
}
