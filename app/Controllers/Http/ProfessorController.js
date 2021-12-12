'use strict'

const Professor = use('App/Models/Professor');
const { validateAll } = use('Validator');

class ProfessorController {

  async create({request, response}) {
    try {

      const erroMessage = {
        'nome.required': 'Esse campo é obrigatório',
        'email.required': 'Esse campo é obrigatorio',
        'data_nascimento.required': 'Esse campo é obrigatorio'
      }

      const validation = await validateAll(request.all(), {
        nome: 'required|min:1',
        email: 'required|min:1',
        data_nascimento: 'required|min:1'
      }, erroMessage)

      if(validation.fails()){
        return response.status(404).send({message: validation.messages()})
      };

      const data = request.only(['nome','email','matricula','data_nascimento']);

      const professor = await Professor.create(data);

      return professor

    } catch(err) {
      return response.status(500).send({erro: `Erro: ${err.message}`});
    }
  }

  async listProfessor({params, response}) {
    const findProfessor = await Professor.find(params.id);

    if (!findProfessor) {
      return response.status(404).send({message: 'Nenhum Professor localizado com o id informado'});
    }
    return findProfessor;
  }

  async updateProfessor({request, response, params}) {
    const professor = await Professor.find(params.id);

    if (!professor) {
      return response.status(404).send({message: 'Nenhum Professor localizado com o id informado'});
    }

    const dataUpdate = request.only(['nome','email','data_nascimento']);

    professor.merge(dataUpdate);

    await professor.save();

    return professor;
  }

  async deleteProfessor({request, response, params}) {
    const professor = await Professor.find(params.id);

    if (!professor) {
      return response.status(404).send({message: 'Nenhum Professor localizado com o id informado'});
    }

    await professor.delete();

    return response.status(204).send({message: 'Professor removido da base de dados'});
  }


}

module.exports = ProfessorController
