'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/ping', () => {
  return { greeting: 'PONG' }
})

Route.post('/aluno','AlunoController.create');
Route.get('/aluno/:id','AlunoController.listAluno');
Route.put('/aluno/:id','AlunoController.updateAluno');
Route.delete('/aluno/:id','AlunoController.deleteAluno');

Route.post('/professor','ProfessorController.create');
Route.get('/professor/:id','ProfessorController.listProfessor');
Route.put('/professor/:id','ProfessorController.updateProfessor');
Route.delete('/professor/:id','ProfessorController.deleteProfessor');

Route.post('/sala/:id','SalaController.create');
Route.post('/alocar','SalaController.alocate');
Route.get('/sala/:id','SalaController.listSala');
Route.put('/sala/:id','SalaController.updateSala');
Route.delete('/sala/:id','SalaController.deleteSala');


