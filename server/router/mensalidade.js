const mensalidadeController = require ('./../controllers/mensalidade');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newMensalidade', mensalidadeController.newMensalidade);
api.get('/oneAlunoMensalidade/:id', mensalidadeController.oneAlunoMensalidade); //get todas as manutenções
api.get('/oneMensalidade/:id',  mensalidadeController.oneMensalidade);
api.get('/mensalidaMes', mensalidadeController.mensalidaMes);
api.get('/mensalidaDays', mensalidadeController.mensalidaDays);
api.get('/mensalidaMesFalte', mensalidadeController.mensalidaMesFalte);
api.get('/mensalidaDaysFalte', mensalidadeController.mensalidaDaysFalte);
api.get('/oneAlunoMensalidadeList/:id', mensalidadeController.oneAlunoMensalidadeList);
api.get('/oneDataAlunoMensalidade', mensalidadeController.oneDataAlunoMensalidade);
api.put('/updateMensalidade',  mensalidadeController.updateMensalidade);
//api.get('/getMensalidade/:id', mensalidadeController.getMensalidade);
// api.get('/getMensalidades', mensalidadeController.getMensalidades);
// api.post('/imgMensalidade/:id', mensalidadeController.imgMensalidade);
module.exports = api;