import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanConfirmationComponent } from './plan-confirmation.component';

describe('PlanConfirmationComponent', () => {
  let component: PlanConfirmationComponent;
  let fixture: ComponentFixture<PlanConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanConfirmationComponent]
    });
    fixture = TestBed.createComponent(PlanConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
