import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionOneComponent } from './section-one/section-one.component';
import { SectionServiceComponent } from './section-service/section-service.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path: '', component: SectionOneComponent, data: { animation: '' }},
  {path: 'service', component: SectionServiceComponent, data: { animation: 'service' }},
  {path: 'contact', component: ContactComponent,data: { animation: 'contact' }},
   
  {path: '**', component: SectionOneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
