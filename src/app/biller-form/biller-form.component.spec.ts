import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerFormComponent } from './biller-form.component';

describe('BillerFormComponent', () => {
  let component: BillerFormComponent;
  let fixture: ComponentFixture<BillerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
