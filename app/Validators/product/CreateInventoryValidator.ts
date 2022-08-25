import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateInventoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.number(),
    quantity: schema.number(),
    expiry_date: schema.date(),
  })

  public messages: CustomMessages = {}
}
