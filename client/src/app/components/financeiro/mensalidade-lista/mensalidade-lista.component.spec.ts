import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalidadeListaComponent } from './mensalidade-lista.component';

describe('MensalidadeListaComponent', () => {
  let component: MensalidadeListaComponent;
  let fixture: ComponentFixture<MensalidadeListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensalidadeListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensalidadeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
