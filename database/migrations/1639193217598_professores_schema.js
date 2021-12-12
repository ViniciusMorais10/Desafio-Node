'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessoresSchema extends Schema {
  up () {
    this.create('professors', (table) => {
      table.increments('id')
      table.string('nome',150).notNullable()
      table.string('email',100).notNullable()
      table.integer('matricula',15).notNullable()
      table.date('data_nascimento').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('professors')
  }
}

module.exports = ProfessoresSchema
