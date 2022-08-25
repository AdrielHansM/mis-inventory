import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string.optional({}, [rules.maxLength(255)]),
    last_name: schema.string.optional({}, [rules.maxLength(255)]),
    clinic_name: schema.string.optional({}, [rules.maxLength(255)]),
    area: schema.string.optional({}, [rules.maxLength(255)]),
    discipline: schema.string.optional({}, [rules.maxLength(255)]),
    contact: schema.string.optional({}, [rules.maxLength(255),  rules.unique({
      table: 'customers', column: 'contact'
    })]),
    email: schema.string.optional({}, [rules.maxLength(255), rules.unique({
      table: 'customers', column: 'email'
    })]),
  })

  public messages: CustomMessages = {}
}
