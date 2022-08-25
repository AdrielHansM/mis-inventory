import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Threads extends BaseSchema {
  protected tableName = 'threads'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable()
      table.integer('category_id').unsigned().notNullable()
      table.boolean('is_deleted').defaultTo(0)
      table.string('title').notNullable()
      table.text('content').notNullable()
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