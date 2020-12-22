import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FinanceiroService } from '../../../services/financeiro.service';

@Component({
  selector: 'app-dados-financas',
  templateUrl: './dados-financas.component.html',
  styleUrls: ['./dados-financas.component.css']
})
export class DadosFinancasComponent implements OnInit {
  mensalidades;
  faltaMensalidades;
  valorMensalidade;
  valorMensalidadeFalte;
  data;
  user;
  gestor;
  constructor(
    private financeiroService: FinanceiroService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.authService.getProfile().subscribe((data: any) => {
      if(data.success ==false){       
       this.router.navigate(['/login']);
      }
      this.user = data;    
      this.gestor = this.user.user.role;      
    }) 
    this.financeiroService.getmensalidaMes().subscribe((data: any)=>{
      this.mensalidades = data;
      console.log(this.mensalidades)
      const ValorMen = this.mensalidades.map((item)=> {return parseInt(item.vlrmen)})
      this.valorMensalidade = ValorMen.reduce((total, numero) => total + numero, 0)
      console.log(this.valorMensalidade)
    });
    this.financeiroService.getmensalidaMesFalte().subscribe((data: any)=>{
      this.faltaMensalidades = data;
      const ValorMenFalte = this.faltaMensalidades.map((item)=> {return parseInt(item.vlrmen)})
      this.valorMensalidadeFalte = ValorMenFalte.reduce((total, numero) => total + numero, 0)
      console.log(this.faltaMensalidades)
    });
  }

  ngOnInit(): void {
  }

}
