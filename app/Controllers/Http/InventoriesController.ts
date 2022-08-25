import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Inventory from 'App/Models/product/Inventory'
import InventoryValidator from 'App/Validators/product/CreateInventoryValidator'
import UpdateInventoryValidator from 'App/Validators/product/UpdateInventoryValidator'

export default class InventoriesController {
  public async index({request, response} : HttpContextContract ) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page')

    const inventories = await Inventory.query()
      .preload('product')
      .preload('orderItem')
      .paginate(page, perPage)
    
    return response.ok({data: inventories})
  }

  public async store({request, response} : HttpContextContract ) {
    const validatedData = await request.validate(InventoryValidator)

    const inventory = await Inventory.create(validatedData)

    await inventory?.load('product')
    
    return response.ok({data: inventory})

  }

  public async show({params, response} : HttpContextContract ) {
    const inventory = await Inventory.query()
      .where('id', params.id)
      .preload('product')
      .preload('orderItem')
      .firstOrFail()
    
    return response.ok({data: inventory})
  }

  public async update({request, response, params} : HttpContextContract ) {
    const inventory = await Inventory.findOrFail(params.id)

    const validatedData = await request.validate(UpdateInventoryValidator)

    inventory.merge(validatedData)
    await inventory.save()
    await inventory.load('product')
    await inventory.load('orderItem')

    return response.ok({data: inventory})
  }

  public async destroy({params, response} : HttpContextContract ) {
    const inventory = await Inventory.findOrFail(params.id)
    await inventory.delete()

    return response.ok({message: "Inventory item successfully deleted"})
  }

  public async archive({params, response} : HttpContextContract ) {
    await Database.rawQuery(
      'UPDATE inventory SET is_archived = 1 WHERE id = :id',
      {id: params.id}
    )

    return response.ok({message: "Inventory item successfully archived"})

  }
}
