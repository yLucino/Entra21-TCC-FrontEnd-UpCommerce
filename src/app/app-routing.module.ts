import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Pages/main/main.component';
import { LibraryLayoutsComponent } from './Pages/library-layouts/library-layouts.component';
import { CreateLayoutsComponent } from './Pages/create-layouts/create-layouts.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path:'Library', component: LibraryLayoutsComponent },
  { path: 'Workshop', component: CreateLayoutsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
