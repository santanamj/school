import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarneComponent } from './create-carne.component';

describe('CreateCarneComponent', () => {
  let component: CreateCarneComponent;
  let fixture: ComponentFixture<CreateCarneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
