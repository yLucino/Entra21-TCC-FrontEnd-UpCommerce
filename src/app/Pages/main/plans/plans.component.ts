import { Component } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css', './plans-responsive.component.css']
})
export class PlansComponent {
  basicPlanVisible = false;
  proPlanVisible = false;
  advancedPlanVisible = false;

  togglePlan(plan: string) {
    if (plan === 'basic') {
      this.basicPlanVisible = !this.basicPlanVisible;
      this.proPlanVisible = false;
      this.advancedPlanVisible = false;
    } else if (plan === 'pro') {
      this.proPlanVisible = !this.proPlanVisible;
      this.basicPlanVisible = false;
      this.advancedPlanVisible = false;
    } else if (plan === 'advanced') {
      this.advancedPlanVisible = !this.advancedPlanVisible;
      this.basicPlanVisible = false;
      this.proPlanVisible = false;
    }
  }
}
