import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional(),
    customer_id: schema.number(),
    transaction_type: schema.enum(['ORDER', 'PAYMENT']),
    total_amount: schema.number(),
    transaction_date: schema.date(),
    order_item: schema.array.optional().members(
      schema.object().members({
        id: schema.number.optional(),
        transaction_id: schema.number.optional(),
        inventory_id: schema.number(),
        item_amount: schema.number(),
        item_quantity: schema.number()
      })
    ),
    payment: schema.array.optional().members(
      schema.object().members({
        id: schema.number.optional(),
        transaction_id: schema.number.optional(),
        payment_method: schema.enum(['CASH', 'CHEQUE', 'ONLINE']),
        payment_amount: schema.number(),
        payment_date: schema.date()
      })
    )
  })

  public messages: CustomMessages = {}
}
