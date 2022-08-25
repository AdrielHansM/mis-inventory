import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Transaction from './Transaction'
import Inventory from '../product/Inventory'

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public transactionId: number

  @column()
  public inventoryId: number

  @column()
  public itemAmount: number

  @column()
  public itemQuantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Transaction)
  public transaction: BelongsTo<typeof Transaction>

  @belongsTo(() => Inventory)
  public inventory: BelongsTo<typeof Inventory>

}