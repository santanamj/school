const Observacao = require ('./../model/observacao');
const fs = require ('fs');
const Aluno = require ('./../model/aluno');
exports.newObservacao = (req, res, next) => {
   const observacao = new Observacao({
   message: req.body.message,   
   matricula: req.body.matricula
     })
    console.log(observacao);
    observacao.save((err, observacao) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, message: 'created observacao' });
        }
    })
};
exports.getObservacoes = (req, res, next)=>{    
    const alunoId = req.params.id;    
    Aluno.findById({'_id':alunoId}, (err, aluno)=>{
        if(err){
            res.status(500).send({message: 'Erro na solicitação'})
        }else{
            if(!aluno){
            res.status(404).send({message:'Pedido não existe'})
        }else{ 
            const matricula = aluno.matricula;
            console.log('meu matricula', matricula)
    Observacao.find({'matricula': matricula}, (err, observacoes)=>{
        console.log(observacoes)
        if(err){
            res.json({success:false, err} )
        }else{           
            res.send(observacoes)
            console.log(observacoes)
        }
    }).sort({ '_id': -1 }); // Sort orders from newest to oldest
}}})
}

exports.oneObservacao = (req, res, next)=>{
    console.log(req.params.id)
    const observacaoId = req.params.id;
    Observacao.findById(observacaoId).populate().exec((err, observacao)=>{
        console.log('meu', observacao)
        if(err){
            res.status(500).send({message: 'Erro na solicitação'})
        }else{
            if(!observacao){
            res.status(404).send({message:'Pedido não existe'})
        }else{
            res.status(200).send({observacao}), console.log('SubObservacao', observacao);
        }
    }
    })
}
exports.editObservacao =  (req, res) =>{     
    console.log(req.body) 
    if (!req.body._id) {
      res.json({ success: false, message: 'No Observacao id provided' }); // Return error message
    } else {
  var data = req.body; 
  Observacao.findByIdAndUpdate(req.body._id, data,  (err, Observacao) => {
   if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario' });
    } else {
      if (!Observacao) {
        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
      } else {       
        res.status(200).send({ success: true, message: 'usuário atualizado' });
      }
    }
  });
  }  
  }
exports.deleteObs =  (req, res) =>{
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' }); // Return error message
      } else {
        Observacao.findOne({ _id: req.params.id }, (err, observacao) => {
        console.log('antes', req.params.id)
        if (err) {
            res.json({ success: false, message: 'Invalid id' }); // Return error message
          } else {
            // Check if observacao was found in database
            if (!observacao) {
              res.json({ success: false, messasge: 'observacao was not found' }); // Return error message
            }  else {       
            observacao.remove((err) => {
                console.log('primeir Subobservacao', observacao)
                if (err) {
                    res.json({ success: false, message: err }); // Return error message
                  } else {
                    res.json({ success: true, message: 'observacao deletado!' }), console.log('Subobservacao', observacao); // Return success message
                  }
            });
        }
    }
    });
}
  }