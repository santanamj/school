const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const mensalidadesSchema = new Schema({
   
    matricula: {type: String},   
    vctmen: {type: Date},
    vlrmen: {type: String},
    createdAt: { type: Date, default: new Date(Date.now()) }, 
    pgtomen: {type: Date},
    juros: {type: String},    
    observacao: {type: String},
    tiprec: {type: String},
    tipo: {type: String},
    status: {type: String}
    
    
    
});

module.exports = mongoose.model('Mensalidades', mensalidadesSchema)