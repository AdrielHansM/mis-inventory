import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateInventoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.number.optional(),
    quantity: schema.number.optional(),
    expiry_date: schema.date.optional(),
  })

  public messages: CustomMessages = {}
}
