const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.objectId;

const alunoSchema = new Schema ({
    nome:{type:String},
    email: {type: String},
    telefone: {type:String},
    celular: {type: String},
    celular1: {type: String},
    CPF: {type: String},
    RG: {type:String},       
    sexo: {type: String},  
    datnsc: {type: Date},
    datamatricula:{type: Date},
    privenc: {type: Date},    
    endereco:{type:Array}, 
    responsavel:{type:Array},   
    observacao: {
        type: Array
    },  
    serie:{type:String} ,
    status: {type: String},
    createdAt: { type: Date, default: new Date(Date.now()) },    
    avatarAluno: [{
        secure_url: String,
        values: Schema.Types.Mixed
    }],
    matricula: {type: String}
})
module.exports = mongoose.model('Aluno', alunoSchema);