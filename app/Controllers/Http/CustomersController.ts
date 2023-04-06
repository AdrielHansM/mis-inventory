import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/customer/Customer'
import Database from '@ioc:Adonis/Lucid/Database'
import UpdateCustomerValidator from 'App/Validators/customer/UpdateCustomerValidator'
import CreateCustomerValidator from 'App/Validators/customer/CreateCustomerValidator'

export default class CustomersController {

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 25)

    const customers = await Customer.query()
      .preload('transaction')
      .paginate(page, perPage)

    return response.ok({ data: customers })
  }

  public async store({ request, response }: HttpContextContract) {

    const validatedData = await request.validate(CreateCustomerValidator)

    const customer = await Customer.create(validatedData)

    return response.ok({ data: customer })
  }

  public async show({ params, response }: HttpContextContract) {
    const customer = await Customer.query()
      .where('id', params.id)
      .preload('transaction')
      .firstOrFail()

    return response.ok({ data: customer })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const customer = await Customer.findOrFail(params.id)

    const validatedData = await request.validate(UpdateCustomerValidator)

    customer.merge(validatedData)
    await customer.save()
    await customer.load('transaction')

    return response.ok({ data: customer })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const customer = await Customer.findOrFail(params.id)
    await customer.delete()

    return response.ok({ message: "Customer successfully deleted" })
  }

  public async search({ request, response }: HttpContextContract) {
    const customers = await Database.rawQuery(
      "SELECT * FROM customers " +
      "WHERE lower(first_name) like lower(:searchKey) " +
      "OR lower(last_name) like lower(:searchKey) " +
      "OR lower(clinic_name) like lower(:searchKey)",
      { searchKey: "%" + request.input('searchKey') + "%" }
    )

    return response.ok({ data: customers })
  }

  public async archive({ params, response }: HttpContextContract) {
    await Database.rawQuery(
      'UPDATE customers SET is_archived = 1 WHERE id = :id',
      { id: params.id }
    )

    return response.ok({ message: "Customer successfully archived" })
  }
}
