'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlunoSchema extends Schema {
  up () {
    this.create('alunos', (table) => {
      table.increments('id')
      table.string('nome',150).notNullable()
      table.string('email',150).notNullable()
      table.integer('matricula',15).notNullable()
      table.date('data_nascimento').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('alunos')
  }
}

module.exports = AlunoSchema
