const Mensalidade = require('./../model/mensalidade');
const Aluno = require('./../model/aluno');

exports.newMensalidade = (req, res, nex) => {
    const mensalidade = new Mensalidade({
        matricula: req.body.matricula,
        vctmen: req.body.boletoDate,
        vlrmen: req.body.valor,
        pgtomen: "1970-12-31",
        observacao: req.body.observacao,
        tipo: req.body.tipo
    });
    console.log(mensalidade.pgtomen, mensalidade.pgtomen)
    mensalidade.save((err, mensalidade) => {
        if (err) {
            res.json({ success: false, message: err })
        } else {
            res.json({ success: true, message: 'created mensalidade' });
        }
    })

}
exports.oneAlunoMensalidade = (req, res, next) => {
    const alunoId = req.params.id;
    console.log('req.params.id', req.params.id)
    Aluno.findById({ '_id': alunoId }, (err, aluno) => {
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!aluno) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                //get dependentes
                const matricula = aluno.matricula;
                Mensalidade.find({ 'matricula': matricula }, (req, mensalidades) => {
                    if (err) {
                        res.status(500).send({ message: 'erro em buscar mensalidades' })
                    } else {
                        const atenManu = mensalidades.filter((item) => String(item.status) != 'cancelada');
                        res.send(mensalidades);
                    }
                }).sort({ '_id': -1 })//.limit(5);      

            }
        }
    })
}
exports.oneAlunoMensalidadeList = (req, res, next) => {
    const alunoId = req.params.id;
    console.log('req.params.id', req.params.id)
    Aluno.findById({ '_id': alunoId }, (err, aluno) => {
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!aluno) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                //get dependentes
                const matricula = aluno.matricula;
                Mensalidade.find({ 'matricula': matricula, "pgtomen":{$in: "1970-12-31T00:00:00.000Z"} }, (req, mensalidades) => {
                    if (err) {
                        res.status(500).send({ message: 'erro em buscar mensalidades' })
                    } else {
                        const atenManu = mensalidades.filter((item) => String(item.status) != 'cancelada');
                        res.send(mensalidades);
                    }
                }).sort({ '_id': -1 })//.limit(5);      

            }
        }
    })
}
exports.oneMensalidade = (req, res) => {
    var mensalidadeId = req.params.id;

    Mensalidade.findById(mensalidadeId).populate().exec((err, mensalidade) => {

        res.send(mensalidade);
    });
};
exports.mensalidaMes = (req, res)=>{
    var date = new Date();
var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    Mensalidade.find({
        "pgtomen":{'$gte': primeiroDia, '$lt': ultimoDia}, "pgtomen":{$ne: "1970-12-31T00:00:00.000Z"}
    }, (err, mensalidades)=>{
        res.json(mensalidades)
    })
}
exports.mensalidaMesFalte = (req, res)=>{
    var date = new Date();
var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    Mensalidade.find({
        "pgtomen":{'$gte': primeiroDia, '$lt': ultimoDia}, "pgtomen":{$in: "1970-12-31T00:00:00.000Z"}
    }, (err, mensalidades)=>{
        console.log('mensalidades', mensalidades)
        res.json(mensalidades)
    })
}
exports.mensalidaDays = (req, res)=>{
    const dados = req.query
    
var start = new Date(dados.dateInit);
var end = new Date(dados.dataEnd);
console.log('start', start)
console.log('end', end)

    Mensalidade.find({ 
        "pgtomen":{"$gte": start, "$lt": end}
    }, (err, mensalidades)=>{
        res.json(mensalidades)
    })
}
exports.mensalidaDaysFalte = (req, res)=>{
    const dados = req.query
    
var start = new Date(dados.dateInit);
var end = new Date(dados.dataEnd);
console.log('start', start)
console.log('end', end)

    Mensalidade.find({ 
        "pgtomen":{"$gte": start, "$lt": end}, "pgtomen":{$in: "1970-12-31T00:00:00.000Z"}
    }, (err, mensalidades)=>{
        const MT = mensalidades[0].matricula;
        Aluno.findOne({'matricula':MT}, (err, aluno)=>{
          
            res.json({mensalidade: mensalidades, aluno:aluno})
        })
        
       
    })
}
exports.oneDataAlunoMensalidade = (req, res, next)=>{    
    const IdAluno = req.query.idAluno; 
    const datasB = req.query.datasMensalidade; 
    const datas = JSON.parse(datasB);  
    console.log('datas', req.query)  
    Aluno.findById({'_id':IdAluno}, (err, aluno)=>{
        if(err){
            res.status(500).send({message: 'Erro na solicitação'})
        }else{
            if(!aluno){
            res.status(404).send({message:'Pedido não existe'})
        }else{         
         const nome = aluno.nome.toUpperCase().toString;  
         console.log(nome)   
         console.log('data', datas)       
         Mensalidade.find({"code":{$in: datas}, 'matricula':aluno.matricula, 
         }, 
         (req, mensalidades)=>{
             if(err){
                 res.status(500).send({message: 'erro em buscar mensalidades'})
             }else{
              console.log('boletos', mensalidades)
              res.send(mensalidades);
             }
         }).sort({ '_id': -1 }).limit(5);      
           
        }
    }
    })
  }
exports.updateMensalidade = (req, res) => {
    if (!req.body._id) {
        res.json({ success: false, message: 'No dependente id provided' }); // Return error message
    } else {
        const data = req.body
        Mensalidade.findByIdAndUpdate({ _id: req.body._id }, data, { new: true }, (err, mensalidade) => {
            if (err) {
                res.status(500).send({ message: 'Error al actualizar el usuario' });
            } else {
                if (!mensalidade) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                } else {
                    res.send({ success: true, message: 'usuário atualizado' });
                }

            }
        });
    }
}