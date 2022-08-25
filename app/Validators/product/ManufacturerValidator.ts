import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ManufacturerValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    name: schema.string({}, 
      [rules.unique({table: 'manufacturers', column: 'name'})])
  })

  public messages: CustomMessages = {}
}
