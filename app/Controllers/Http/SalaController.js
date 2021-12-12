'use strict'

const Sala = use('App/Models/Sala');
const Professor = use('App/Models/Professor');
const Aluno = use('App/Models/Aluno');
const SalaAluno = use('App/Models/Alocar')
const { validateAll } = use('Validator');

class SalaController {

  async create ({request, response, params}) {
    try {

      const erroMessage = {
        'numero.required': 'Esse campo é obrigatório',
        'capacidade.required': 'Esse campo é obrigatorio'
      }

      const validation = await validateAll(request.all(),{
        num_sala: 'required|min:1',
        capacidade: 'required|min:1'
      },erroMessage)

      if(validation.fails()){
        return response.status(404).send({message: validation.messages()});
      }

      const data = request.only(['num_sala','capacidade','disponivel']);

      const id = params.id;

      const sala = await Sala.create({...data,id_professor: id});

      return sala

    } catch(err){
      return response.status(500).send({erro: `Erro: ${err.message}`});
    }
  }

  async updateSala({request, response, params}){
    try {

     const findSala = await Sala.find(params.id);

      if(!findSala) {
        return response.status(404).send({message: 'Sala não localizada!'});
      }

      const dataUpdate = request.only(['num_sala','capacidade']);

      findSala.merge(dataUpdate);

      await findSala.save();


      return findSala;


    }catch(err){
      return response.status(500).send({erro: `Erro: ${err.message}`});
    }

  }

  async listSala({request, response, params}) {
    try {
      const findSala = await Sala.find(params.id);

      if(!findSala) {
        return response.status(404).send({message: 'Nenhuma sala localizada com o id informadp'});
      }

      return findSala;

    }catch(err) {
      return response.status(500).send({erro: `Erro: ${err.message}`})
    }
  }

  async deleteSala({request, response, params}) {
    try{

      const sala = await Sala.find(params.id);

      if(!sala) {
        return response.status(404).send({message: 'Nenhuma sala localizada com o id informado'});
      }

      await sala.delete();

      return response.status(204).send({message: 'Sala removida com sucesso!'});

    }catch(err){
      return response.status(500).send({erro: `Erro: ${err.message}`});
    }
  }

  async alocate({request, response, params}){
    try {

      const data = request.only(['matricula_professor','matricula_aluno','num_sala']);

      const professor = await Professor
      .query()
      .where('matricula','=',data.matricula_professor).first()

      if(!professor) {
        return response.status(404).send({message: 'Nenhum Professor localizado com o id informado'});
      }

      const matricula_professor = professor.id;

      const sala = await Sala
      .query()
      .where('num_sala','=',data.num_sala).first()

      if(!sala) {
        return response.status(404).send({message: 'Nenhuma sala localizado com o numero informado'});
      }

      const professor_sala = sala.id_professor;

      if(matricula_professor != professor_sala) {
        return response.status(404).send({message: 'Somente o professor que criou a sala pode alocar alunos'});
      }

      const aluno = await Aluno
      .query()
      .where('matricula','=',data.matricula_aluno).first()

      if(!aluno){
        return response.status(404).send({message: 'Matricula do aluno inválida'});
      }

      const sala_aluno = (sala.id_sala, professor.id, aluno.id)

      const alocate = await SalaAluno.create(sala_aluno);

      return alocate;


    } catch(err){
      return response.status(500).send({erro: `Erro ${err.message}`});
    }
  }
}

module.exports = SalaController
