import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalidadeDetailComponent } from './mensalidade-detail.component';

describe('MensalidadeDetailComponent', () => {
  let component: MensalidadeDetailComponent;
  let fixture: ComponentFixture<MensalidadeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensalidadeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensalidadeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
