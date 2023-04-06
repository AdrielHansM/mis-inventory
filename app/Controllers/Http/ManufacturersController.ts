import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Manufacturer from 'App/Models/product/Manufacturer'
import ManufacturerValidator from 'App/Validators/product/ManufacturerValidator'

export default class ManufacturersController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 25)

    const manufacturers = await Manufacturer.query()
      .preload('product')
      .paginate(page, perPage)

    return response.ok({ data: manufacturers })
  }

  public async store({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(ManufacturerValidator)
    const manufacturer = await Manufacturer.create(validatedData)

    return response.ok({ data: manufacturer })
  }

  public async show({ params, response }: HttpContextContract) {
    const manufacturer = await Manufacturer.query()
      .where('id', params.id)
      .preload('product')
      .firstOrFail()

    return response.ok({ data: manufacturer })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const manufacturer = await Manufacturer.findOrFail(params.id)

    const validatedData = await request.validate(ManufacturerValidator)

    manufacturer.merge(validatedData)
    await manufacturer.save()
    await manufacturer.load('product')

    return response.ok({ data: manufacturer })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const manufacturer = await Manufacturer.findOrFail(params.id)
    await manufacturer.delete()

    return response.ok({ message: "Manufacturer Successfully Deleted" })
  }

  public async archive({ params, response }: HttpContextContract) {
    await Database.rawQuery(
      'UPDATE manufacturer SET is_archived = 1 WHERE id = :id',
      { id: params.id }
    )

    return response.ok({ message: "Customer successfully archived" })
  }
}
