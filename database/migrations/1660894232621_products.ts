import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('manufacturer_id').unsigned().notNullable()
      table.string('product_name').notNullable()
      table.double('price').notNullable()
      table.string('type').notNullable()
      table.string('category').notNullable()
      table.integer('dosage').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}


// {	
// 	productId: ObjectID,
// 	manufacturerId: ObjectID,
// 	productName: string,
// 	productPrice: number,
// 	productType: string,
// 	productCategory: string,
// 	productDosage: string,	dateCreated: date,
// 	dateUpdated: date
// }