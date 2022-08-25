import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Manufacturer from './Manufacturer'
import Inventory from './Inventory'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public manufacturerId: number

  @column()
  public productName: string

  @column()
  public price: number

  @column()
  public type: string

  @column()
  public category: string

  @column()
  public dosage: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Manufacturer)
  public manufacturer: BelongsTo<typeof Manufacturer>

  @hasMany(() => Inventory)
  public inventory: HasMany<typeof Inventory>
}