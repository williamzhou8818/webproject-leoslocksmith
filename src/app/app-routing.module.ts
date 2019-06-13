import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionOneComponent } from './section-one/section-one.component';
import { SectionServiceComponent } from './section-service/section-service.component';

const routes: Routes = [
  {path: '', component: SectionOneComponent},
   
  {path: '**', component: SectionOneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
