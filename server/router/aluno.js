const alunoController = require ('./../controllers/aluno');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');
const aluno = require('../model/aluno');

var api = express.Router();

api.post('/newAluno', alunoController.newAluno);
api.post('/imgAluno/:id', alunoController.imgAluno);
api.get('/getAluno/:id', alunoController.getAluno);
api.get('/getAlunos', alunoController.getAlunos);
api.get('/getMatriculaAlunos', alunoController.getMatriculaAlunos);
api.get('/getAllAlunos', alunoController.getAllAlunos);
api.get('/oneAluno/:id', alunoController.oneAluno);
api.get('/countAluno', alunoController.countAluno);
api.put('/updateAluno', alunoController.updateAluno);
api.put('/addressAluno', alunoController.addressAluno);
api.put('/responsavelAluno', alunoController.responsavelAluno);
module.exports = api;