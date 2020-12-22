import { Component, OnInit } from '@angular/core';
import { FinanceiroService } from '../../../services/financeiro.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { CurrencyPipe, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-mensalidade-detail',
  templateUrl: './mensalidade-detail.component.html',
  styleUrls: ['./mensalidade-detail.component.css']
})
export class MensalidadeDetailComponent implements OnInit {
  role;
  username;
  mensalidade;
  associado;  
  form: FormGroup;
  claimMoney;
  date;
  boletoDate
  constructor(
    private mensalidadeService: FinanceiroService,   
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private _router: Router,   
    private currencyPipe : CurrencyPipe,
    private _location: Location,
    private toastr: ToastrService,
    
  ) {
    this.claimMoney = 0;
     this.form = this.formBuild.group({
      amount: [ this.formatMoney(this.claimMoney), Validators.required],
      boletoPagamento: [''],  
      observacao: ['']  
  })
 
  }
formatMoney(value) {
    const temp = `${value}`.replace(/\,/g, "");
    return this.currencyPipe.transform(temp).replace("R$", "");
}
disableForm() {
  this.form.controls['amount'].disable();
  this.form.controls['boletoPagamento'].disable(); 
  this.form.controls['observacao'].disable(); 
  
   }
transformTotal() {
  const value = this.form.controls.amount.value;
  this.form.controls.amount.setValue(
    this.formatMoney(value.replace(/\,/g, "")), 
    {emitEvent: false}
  );
}
registroSubmit(){
  const mensalidade = {
    vlrmen: this.form.get('amount').value,
    pgtomen: this.form.get('boletoPagamento').value,
    observacao: this.form.get('observacao').value,
    _id: this.mensalidade._id
    
  }
  console.log(mensalidade)
  this.mensalidadeService.editMensalidade(mensalidade).subscribe(data=>{
    if(!data){

    }else{
      this.disableForm();
      this.form.reset();
      this.toastr.success('Manutenção alterada com sucesso', 'ok',{
        timeOut: 3000
      });
    }
    
  })
}
cancelar(){
  const mensalidade = {
    status: 'cancelada' ,
    vlrman: 'cancelado',
    pgtoman: 'cancelado',
    _id: this.mensalidade._id   
    
  }
  console.log(mensalidade)
  this.mensalidadeService.editMensalidade(mensalidade).subscribe(data=>{
    if(!data){

    }else{
      this.disableForm();
      this.form.reset();
      this.toastr.success('Manutenção cancelada sucesso', 'ok',{
        timeOut: 3000
      });
    }
    
  })
}
  getmensalidade(){
    this.route.params.forEach((params: Params) => {
      let id = params['id'];  
      this.mensalidadeService.getMensalidadeId(id).subscribe(response => {
      this.mensalidade = response;  
      console.log(this.mensalidade)                     
  })
    });
  }
  voltar() {
    this._location.back(); // <-- go back to previous location on cancel
  }
 
  ngOnInit(): void {
    this.getmensalidade();
  }

}
