import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormproyectComponent } from './formproyect.component';

describe('FormproyectComponent', () => {
  let component: FormproyectComponent;
  let fixture: ComponentFixture<FormproyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormproyectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormproyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
