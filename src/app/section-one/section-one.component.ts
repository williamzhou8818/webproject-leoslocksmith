import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService } from './emails.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.scss']
})
export class SectionOneComponent implements OnInit {



  form: FormGroup;
  imagePreview: any;

  constructor(public emailService: EmailService) { }

  ngOnInit() {

    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'address': new FormControl(null, {validators: [Validators.required]}),
      'email': new FormControl(null, {validators: [Validators.required]}),
      'messages':  new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})

    });

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
    // console.log(file);
    // console.log(this.form);
}   

  onSaveMessage() {
   
    if(this.form.invalid) {
      return;
    }

    this.emailService.addEmails(this.form.value.name, this.form.value.address, this.form.value.email, this.form.value.messages, this.form.value.image);

    console.log( this.form.value.image);
    // this.form.reset();
    this.form.reset();


  }



}
