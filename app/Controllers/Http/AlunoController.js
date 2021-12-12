'use strict'

const Aluno = use('App/Models/Aluno');
const { validateAll } = use('Validator')

class AlunoController {

  async create({request, response}) {
    try {

      const erroMessage = {
        'nome.required': 'Esse campo é obrigatório',
        'email.required': 'Esse campo é obrigatorio',
        'data_nascimento.required': 'Esse campo é obrigatorio'
      }

      const validation = await validateAll(request.all(),{
        nome: 'required|min:1',
        email: 'required|min:1',
        data_nascimento: 'required|min:1'
      },erroMessage)

      if(validation.fails()){
       return response.status(404).send({message: validation.messages()})
      }


      const data = request.only(['nome','email','matricula','data_nascimento']);
      const aluno = await Aluno.create(data);

      return aluno
    } catch(err) {
      return response.status(500).send({ error: `Erro: ${err.message}`})
    }
  }

  async listAluno({params, response}){
    const findAluno = await Aluno.find(params.id);

    if(!findAluno) {
      return response.status(404).send({message: 'Nenhum aluno localizado com o id informado'});
    }

    return findAluno;
  }

  async updateAluno({params, request, response}){
    const aluno = await Aluno.find(params.id);

    if(!aluno) {
      return response.status(404).send({message: 'Nenhum aluno localizado com o id informado'});
    }

    const dataUpdate = request.only(['nome','email','data_nascimento']);

    aluno.merge(dataUpdate);

    await aluno.save();

    return aluno;

  }

  async deleteAluno({params, request, response}) {
    const aluno = await Aluno.find(params.id);

    if(!aluno) {
      return response.status(404).send({message: 'Nenhum aluno localizado com o id informado'});
    }

    await aluno.delete();

    return response.status(204).send({message: "Aluno removido da base de dados"});

  }


}

module.exports = AlunoController
