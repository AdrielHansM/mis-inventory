import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string.optional({}, [rules.maxLength(255)]),
    last_name: schema.string.optional({}, [rules.maxLength(255)]),
    clinic_name: schema.string.optional({}, [rules.maxLength(255)]),
    area: schema.string.optional({}, [rules.maxLength(255)]),
    discipline: schema.string.optional({}, [rules.maxLength(255)]),
    contact: schema.string.optional({}, [rules.maxLength(255)]),
    email: schema.string.optional({}, [rules.maxLength(255)]),
  })

  public messages: CustomMessages = {}
}
