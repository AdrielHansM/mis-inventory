import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/product/Product'
import ProductValidator from 'App/Validators/product/ProductValidator'
import ProductRepository from '@ioc:mis-inventory/ProductRepository'
export default class ProductsController {


  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 25)

    const products = await ProductRepository.getAllProducts(page, perPage)

    return response.ok({ data: products })
  }

  public async store({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(ProductValidator)

    const product = await Product.create(validatedData)

    return response.ok({ data: product })

  }

  public async show({ params, response }: HttpContextContract) {
    const product = await Product.query()
      .where('id', params.id)
      .preload('manufacturer')
      .preload('inventory')
      .firstOrFail()

    return response.ok({ data: product })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)

    const validatedData = await request.validate(ProductValidator)

    product.merge(validatedData)
    await product.save()
    await product.load('manufacturer')
    await product.load('inventory')

    return response.ok({ data: product })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    await product.delete()

    return response.ok({ message: "Product successfully deleted" })
  }

  public async archive({ params, response }: HttpContextContract) {
    await Database.rawQuery(
      'UPDATE customer SET is_archived = 1 WHERE id = :id',
      { id: params.id }
    )

    return response.ok({ message: "Customer successfully archived" })
  }
}
