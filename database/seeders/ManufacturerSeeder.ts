import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Manufacturer from 'App/Models/product/Manufacturer'

export default class extends BaseSeeder {
  public async run () {
    Manufacturer.createMany([
      {
      name: "ULSS"
      },
      {
      name: "J&J"
      },
      {
      name: "Pfizer"
      },
      {
      name: "Roche"
      },
      {
      name: "Abbvie"
      },
      {
      name: "Merck"
      },
    ])
  }
}
