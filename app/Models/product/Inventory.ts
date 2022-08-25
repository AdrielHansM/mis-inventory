import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import OrderItem from '../transaction/OrderItem'

export default class Inventory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @column()
  public quantity: number

  @column()
  public expiryDate: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => OrderItem)
  public orderItem: HasMany<typeof OrderItem>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

}
