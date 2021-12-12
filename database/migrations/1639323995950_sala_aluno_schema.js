'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalaAlunoSchema extends Schema {
  up () {
    this.create('sala_alunos', (table) => {
      table.increments()
      table.integer('id_sala')
      .unsigned()
      .references('num_sala')
      .inTable('salas')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.integer('id_professor')
      .unsigned()
      .references('id')
      .inTable('professors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.integer('id_aluno')
      .unsigned()
      .references('id')
      .inTable('aluno')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')


      table.timestamps()
    })
  }

  down () {
    this.drop('sala_alunos')
  }
}

module.exports = SalaAlunoSchema
