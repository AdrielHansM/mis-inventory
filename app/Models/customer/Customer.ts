import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Transaction from '../transaction/Transaction'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string
  
  @column()
  public lastName: string

  @column()
  public clinicName: string

  @column()
  public area: string

  @column()
  public discipline: string

  @column()
  public contact: string

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime 

  @hasMany(() => Transaction)
  public transaction: HasMany<typeof Transaction>
}