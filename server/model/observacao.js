const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const observacoesSchema = new Schema({   
    message: {type: String},
    createdAt: { type: Date, default: new Date(Date.now()) },    
    matricula: {type: String}    
});

module.exports = mongoose.model('Observacoes', observacoesSchema)