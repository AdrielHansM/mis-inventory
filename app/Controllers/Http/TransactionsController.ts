import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Inventory from 'App/Models/product/Inventory'
import OrderItem from 'App/Models/transaction/OrderItem'
import Payment from 'App/Models/transaction/Payment'
import Transaction from 'App/Models/transaction/Transaction'
import CreateTransactionValidator from 'App/Validators/transaction/CreateTransactionValidator'

export default class TransactionsController {

  public async index({request, response} : HttpContextContract ) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 25)

    const transactions = await Transaction.query()
      .preload('customer')
      .preload('orderItem', (orderItem) => {
        orderItem.preload('inventory', (inventoryItem) => {
          inventoryItem.preload('product')
        })
      })
      .preload('payment')
      .paginate(page, perPage)

    return response.ok({data: transactions})
  }

  public async store({request, response} : HttpContextContract ) {
    const validatedData = await request.validate(CreateTransactionValidator)

    const transaction = await Transaction.create({
      customerId: validatedData.customer_id,
      transactionType: validatedData.transaction_type,
      totalAmount: validatedData.total_amount,
      transactionDate: validatedData.transaction_date,
    })

    if (transaction.transactionType == "PAYMENT" && validatedData.payment) {
      let payments = validatedData.payment
      payments.forEach((payment) => {
        payment.transaction_id = transaction.id
      })
      const payment = await Payment.createMany(payments)
      return response.ok({data: {transaction: transaction, payment: payment}})
    }

    if (transaction.transactionType == "ORDER" && validatedData.order_item) {
      let orderItems = validatedData.order_item
      orderItems.forEach((orderItem) => {
        orderItem.transaction_id = transaction.id
      })
      
      const orderItemsQuery = await OrderItem.createMany(orderItems)

      orderItemsQuery.forEach(async (orderItem) => {
        let inventory = await Inventory.findOrFail(orderItem.inventoryId)
        inventory.quantity = inventory.quantity - orderItem.itemQuantity
        await inventory.save()
      })

      return response.ok({data: {transaction: transaction, orderItem: orderItemsQuery}})
    } 
  }

  public async show({ params, response } : HttpContextContract ) {
    const transaction = await Transaction.query()
      .where('id', params.id)
      .preload('customer')
      .preload('payment')
      .preload('orderItem', (orderItem) => {
        orderItem.preload('inventory', (inventoryItem) => {
          inventoryItem.preload('product')
        })
      })
      .firstOrFail()

    return response.ok({data: transaction})
  }

  public async destroy({ params, response } : HttpContextContract ) {
    const transaction = await Transaction.findOrFail(params.id)
    const orderItems = await OrderItem.query()
      .where('transaction_id', params.id)

    const payments = await Payment.query()
      .where('transaction_id', params.id)

    if(orderItems.length > 0) {
      orderItems.forEach(async (orderItem) => {
        await orderItem.delete()
      });
    }

    if(payments.length > 0) {
      payments.forEach(async (payment) => {
        await payment.delete()
      });
    }

    await transaction.delete()

    return response.ok({message: "Transaction successfully deleted"})
  }
}