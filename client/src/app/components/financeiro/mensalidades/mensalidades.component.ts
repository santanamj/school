import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FinanceiroService } from '../../../services/financeiro.service';
import { CurrencyPipe, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-mensalidades',
  templateUrl: './mensalidades.component.html',
  styleUrls: ['./mensalidades.component.css']
})
export class MensalidadesComponent implements OnInit {
 
  nome;
  mensalidades;
  id;
  form: FormGroup;
  claimMoney;
  date;
  boletoDate;
  tipos; 
  financeiro;
  parcelas;
  aluno;
  messageClass;
  message;
  settime;
  processing;
  constructor(
    private financeiroService: FinanceiroService,
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
    private currencyPipe : CurrencyPipe,
    private _location: Location
  ) 
  { 
    this.claimMoney = 0;
    this.route.params.forEach((params: Params) => {
      let id = params['id'];  
      this.financeiroService.getSingleAluno(id).subscribe(
        response => {
            this.aluno = response;
           console.log(this.aluno)
  })
    });
    this.form = this.formBuild.group({
      amount: [ this.formatMoney(this.claimMoney), Validators.required],
      boletoPagamento: ['', Validators.required],  
      observacao: [''],
      tipo: ['', Validators.required] 
  })  
    this.tipos = [
      { id: 'cartao', name: 'Cartão' },
      { id: 'cheque', name: 'Cheque' },
      { id: 'promissoria', name: 'Promissoria' },
      { id: 'dinheiro', name: 'Dinheiro' }
    ]
  }
  formatMoney(value) {
    const temp = `${value}`.replace(/\,/g, "");
    return this.currencyPipe.transform(temp).replace("R$", "");
}
transformTotal() {
  const value = this.form.controls.amount.value;
  this.form.controls.amount.setValue(
    this.formatMoney(value.replace(/\,/g, "")), 
    {emitEvent: false}
  );
}
registroSubmit(){
  if(this.parcelas > 1){
    this.parcelasSubmit();
  }else{
  const d = new Date(this.form.get('boletoPagamento').value);  
    this.boletoDate = moment(d).format('YYYY-MM-DD');
  const mensalidade = {
    valor: this.form.get('amount').value,
    boletoDate: this.boletoDate,
    observacao: this.form.get('observacao').value,
    tipo: this.form.get('tipo').value,
    matricula: this.aluno.matricula    
  }
  console.log(mensalidade)
  this.financeiroService.newMensalidade(mensalidade).subscribe(data=>{
    if(!data){

    }else{      
      this.form.reset();
      this.toastr.success('Pagamento criado com sucesso', 'ok',{
        timeOut: 3000
      });
    }
    
  })
}
}

selectParcelas(event){
 this.parcelas =  event.target.value;
 console.log(this.parcelas)
}
async parcelasSubmit(){
  const d = new Date(this.form.get('boletoPagamento').value);  
    this.boletoDate = moment(d).format('YYYY-MM-DD');
    this.financeiro = {     
      valor: this.form.get('amount').value,
      boletoDate: this.boletoDate,    
      observacao: this.form.get('observacao').value,
      tipo: this.form.get('tipo').value,        
      matricula: this.aluno.matricula
    }
    let today = new Date(this.financeiro.boletoDate);
    let day = today.getDate() + 1;
    const monthDate = today.getMonth();
    let year = today.getFullYear();
   // this.financeiro.boletoDate = year + '-' + monthDate + '-' + day;   
    let date = moment(this.financeiro.boletoDate);
    let month = date.month() + 1;
    for (var i = 0; i < parseInt(this.parcelas); i++) {
      await new Promise(next => {        
        
        this.settime = 2000 * parseInt(this.parcelas);     
        this.financeiroService.newMensalidade(this.financeiro).subscribe((data: any) => { console.log(data)       
          if (!data.success) {
            this.messageClass = 'alert alert-danger'; // Return error class
            this.message = data.message; // Return error message
            this.processing = false; // Enable submit button    
            console.log(this.message)
            this.toastr.error(`${this.message}`, 'error',{
              timeOut: 3000
            });    
          } else {
            this.form.reset();
            const mydate = (date.add(1, 'month').format("YYYY-MM-DD"))
            this.financeiro.boletoDate = mydate;
        this.toastr.success('Manutenção criada com sucesso', 'ok',{
          timeOut: this.settime
        });      
        }       
        next();
      })     
      setInterval(() => {       
   }, this.settime)
    
  })
}
}
  ngOnInit(){  
   
  }

}
