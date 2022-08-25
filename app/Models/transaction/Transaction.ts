import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Payment from './Payment'
import OrderItem from './OrderItem'
import Customer from '../customer/Customer'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customerId: number

  @column()
  public transactionType: string

  @column()
  public totalAmount: number

  @column()
  public transactionDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>

  @hasMany(() => Payment)
  public payment: HasMany<typeof Payment>

  @hasMany(() => OrderItem)
  public orderItem: HasMany<typeof OrderItem>


  
}