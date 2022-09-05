import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_name: schema.string({}, [rules.maxLength(255)]),
    manufacturer_id: schema.number([
      rules.exists({ table: 'manufacturers', column: 'id'})
    ]),
    price: schema.number(),
    type: schema.string(),
    category: schema.string(),
    dosage: schema.number(),
    image_url: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}