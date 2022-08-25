import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/product/Category'

export default class CategorySeeder extends BaseSeeder {
  public async run () {
    await Category.createMany([ 
      {
        name: 'Tablets',
      },
      {
        name: 'Liquid',
      },
      {
        name: 'Vials',
      },
    ])
  }
}
