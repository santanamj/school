const observacoesController = require ('./../controllers/observacao');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newObservacao',  observacoesController.newObservacao);
api.get('/getObservacoes/:id',  observacoesController.getObservacoes);

//api.get('/getObservacoes', AuthenticationControler.use, observacoesController.getObservacoes);
api.get('/oneObservacao/:id',  observacoesController.oneObservacao);
api.put('/editObservacao', observacoesController.editObservacao)
api.delete('/deleteObs/:id', observacoesController.deleteObs);


module.exports = api;