'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalaSchema extends Schema {
  up () {
    this.create('salas', (table) => {
      table.increments('id')
      table.integer('num_sala',10).notNullable()
      table.integer('capacidade',10).notNullable()
      table.boolean('disponivel')
      table.integer('id_aluno')
      .unsigned()
      .references('id')
      .inTable('alunos')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.integer('id_professor')
      .unsigned()
      .references('id')
      .inTable('professors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('salas')
  }
}

module.exports = SalaSchema
