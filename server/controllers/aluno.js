const Aluno = require ('./../model/aluno');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const path = require('path');
cloudinary.config({
    cloud_name: 'djbfmiwlg',
    api_key: '935956179985733',
    api_secret: 'paNLYmeQHHPGXFHSI23PeDkzVqM'
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "uploads",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 100, height: 100, crop: "limit" }]
});



exports.newAluno = (req, res)=>{
    Aluno.find({}, (err, alunos)=>{
        const numeroMatri = alunos.map((item)=>{ return item.matricula})
        console.log('numeroMatri', numeroMatri[0])
        console.log(parseInt(numeroMatri[0]) + 1)
    
   // parseInt(numeroMatri[0].valor) + 1
  
    const aluno = new Aluno ({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        celular: req.body.celular,
        CPF: req.body.CPF,
        RG: req.body.RG,
        datamatricula: req.body.datamatricula,       
        sexo: req.body.sexo,
        datnsc: req.body.datnsc,
        datamatricula: req.body.datamatricula,
        privenc: req.body.privenc,             
        endereco: req.body.endereco,
        responsavel: req.body.responsavel,
        status: req.body.status,
        observacao: req.body.observacao,
        matricula: parseInt(numeroMatri[0]) + 1
    })
    aluno.save((err, aluno)=>{
        if(err){
            res.json({message:false})
        }else{
          console.log(aluno)
            res.json({message:true, aluno})
        }
    })
  }).sort({ '_id': -1 })
}

exports.getAluno = (req, res)=>{
  const id = req.params.id;
  Aluno.findById({'_id': id}, (err, aluno)=>{
    if(err){
      console.log('erro aluno', err)
    }else{
      res.json(aluno)
    }
  })
}
exports.getAllAlunos = (req, res)=>{
  Aluno.find({}, (err, alunos)=>{
    if(err){
      console.log(err, 'não foi possível carregar alunos')
    }else{
      res.json(alunos)
    }
  }).sort({ '_id': -1 }).limit(10); 
}
exports.getAlunos = (req, res, next) => {
  var s = req.query.term;
  var t = req.query.matricula;  
  Aluno.find({
      nome: {
          $regex: s, $options: "i",
      },
      matricula: {
          $regex: new RegExp(t)
      }
  }, (err, alunos) => {
      if (err) {
          res.json({ success: false, err })
      } else {
        console.log(alunos)
          res.json(alunos)
      }
  }) // Sort orders from newest to oldest .sort({ '_id': -1 });
}
exports.getMatriculaAlunos = (req, res, next) => {   
  var t = req.query.matricula;  
  console.log(req.query)
  Aluno.find({       
      matricula: {
          $regex: new RegExp(t)
      }
  }, (err, alunos) => {
      if (err) {
          res.json({ success: false, err })
      } else {
          res.send(alunos)

      }
  }) // Sort orders from newest to oldest .sort({ '_id': -1 });
}
exports.imgAluno = (req, res) => {
    console.log('req.params', req.params)
  const alunoId = req.params.id;
  const upload = multer({ storage: storage }).array('files[]', 12);
  upload(req, res, function (err) {
      if (err) {
         
      }
    
      files = req.files;
      Aluno.find({ '_id': alunoId }, (err, alunos) => {
         
          Aluno.findByIdAndUpdate(alunos, { avatarAluno: files }, { new: true }, (err, alunos) => {
              if (err) {
                  res.status(500).send({ message: 'Error al actualizar el usuario' });
              } else {
                  if (!alunos) {
                      res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                  } else {

                      res.send({ success: true, message: 'usuário atualizado' });
                  }
              }
          });
      })
  })
}
exports.oneAluno = (req, res, next) => {
  const alunoId = req.params.id;

  Aluno.findById({ '_id': alunoId }, (err, aluno) => {
      if (err) {
          res.status(500).send({ message: 'Erro na solicitação' })
      } else {
          if (!aluno) {
              res.status(404).send({ message: 'Pedido não existe' })
          } else {
              res.send(aluno);
          }
      }
  })
}
exports.countAluno = (req, res)=>{
  Aluno.countDocuments({"status": "Ativo"}, (err, alunos)=>{
    res.json(alunos)
  })
}
exports.updateAluno = (req, res) => {
  console.log('req.body', req.body)
  if (!req.body._id) {
      res.json({ success: false, message: 'No aluno id provided' }); // Return error message
    } else {
  Aluno.findOne({ _id: req.body._id }, req.body,(err, aluno) => {
     
      if (err) {
          res.json({ success: false, message: 'Not a valid aluno id' }); // Return error message
      } else {
          
          aluno.nome = req.body.nome,
          aluno.email= req.body.email,
          aluno.telefone=req.body.telefone,
          aluno.celular=req.body.celular,
          aluno.RG= req.body.RG,
          aluno.CPF = req.body.CPF,
          aluno.sexo = req.body.sexo,          
          aluno.datnsc = req.body.datnsc,
          aluno.datamatricula = req.body.datamatricula,
          aluno.privenc = req.body.privenc,
          aluno.status = req.body.status,
          aluno.sexo = req.body.sexo
      aluno.save((err) => {
              if (err) {
                  if (err.errors) {
                      res.json({ success: false, message: 'Please ensure form is filled out properly' });
                  } else {
                      res.json({ success: false, message: err }); // Return error message
                  }
              } else {
                  console.log(aluno)
                  res.json({ success: true, message: 'Aluno Updated!' }); // Return success message
              }
          });
      }
  });
    }
};
exports.addressAluno = (req, res) => {   
  if (!req.body._id) {
      res.json({ success: false, message: 'No dependente id provided' }); // Return error message
  } else {
      var alunoId = req.body._id;
      var data = req.body.endereco.endereco;
     
      Aluno.findByIdAndUpdate({ _id: req.body._id }, { $set: { "endereco": data } }, { new: true }, (err, aluno) => {
          if (err) {
              res.status(500).send({ message: 'Error al actualizar el usuario' });
          } else {
              if (!aluno) {
                  res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
              } else {
                  res.send({ success: true, message: 'usuário atualizado' });
              }
          }
      });
  }
}
exports.responsavelAluno = (req, res) => {
   
    if (!req.body._id) {
        res.json({ success: false, message: 'No dependente id provided' }); // Return error message
    } else {
        var alunoId = req.body._id;
        var data = req.body.responsavel.responsavel;
       
        Aluno.findByIdAndUpdate({ _id: req.body._id }, { $set: { "responsavel": data } }, { new: true }, (err, aluno) => {
            if (err) {
                res.status(500).send({ message: 'Error al actualizar el usuario' });
            } else {
                if (!aluno) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                } else {
                    res.send({ success: true, message: 'usuário atualizado' });
                }
            }
        });
    }
  }