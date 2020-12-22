import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FinanceiroService } from '../../../services/financeiro.service';
import { AlunosService } from '../../../services/alunos.service';
import { Location } from '@angular/common';
declare var jsPDF: any;
@Component({
  selector: 'app-mensalidade-lista',
  templateUrl: './mensalidade-lista.component.html',
  styleUrls: ['./mensalidade-lista.component.css']
})
export class MensalidadeListaComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  mensalidades;
  aluno;
  dataBoletoList;
  buscaDate;
  buscaDate$= new Subject<any>();
  dataForm;
  id;
  infoMensalidades;
  responsaveList;
  listEndereco;
  
  constructor(
    private financeiroService: FinanceiroService,
    private _router: ActivatedRoute,
    private formBuild: FormBuilder,
    private alunoService: AlunosService,
    private _location: Location
  ) {
    this.dataForm = this.formBuild.group({
      nomes: new FormArray([]),
      nome: ['', Validators.required]
     }) 
    this._router.params.forEach((params:Params)=>{
      this.id = params['id'];
      this.alunoService.getAluno(this.id).subscribe((data: any)=>{
        this.aluno = data;
        this.responsaveList = this.aluno.responsavel;
        this.listEndereco = this.aluno.endereco;
        console.log(this.aluno)
    this.financeiroService.oneAlunoMensalidadeList(this.id).subscribe((data:any)=>{
      this.mensalidades = data;  
      for ( var nomes in this.mensalidades){
        if(this.mensalidades.hasOwnProperty(nomes)){
         const control = new FormControl(); // if first item set to true, else false
         (this.dataForm.controls.nomes as FormArray).push(control);
        }
      }   
    })
  })
})
   }
   submit(){
    const selectedOrderIds = this.dataForm.value.nomes
    .map((v, i) => v ? this.mensalidades[i].code : null)
    .filter(v => v !== null);  
 
  const selectData = JSON.stringify(selectedOrderIds)
  this.buscaDate = `idAluno=${this.id}&datasMensalidade=${selectData}`;
  console.log(this.buscaDate);
this.buscaDate$.next(this.buscaDate);
  this.financeiroService.searchMensalidadeAluno(this.buscaDate$).subscribe((response: any) => {
    this.infoMensalidades = response;

  })
   }
   public downloadPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a2');

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('Relatorio-mensal.pdf');
  }
  onPrint(){
    window.print();
}
voltar() {
  this._location.back(); // <-- go back to previous location on cancel
}
  ngOnInit(): void {
  }

}
