import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-updatepasswrod',
  templateUrl: './updatepasswrod.component.html',
  styleUrls: ['./updatepasswrod.component.scss']
})
export class UpdatepasswrodComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  displayModal: boolean;
  constructor(private fb: FormBuilder) { 
    this.form = fb.group({

      password: ['', [Validators.required,Validators.maxLength(10)]],
       

      confirm_password: ['', [Validators.required,Validators.maxLength(10)]]

    }, { 

      validator: ConfirmedValidator('password', 'confirm_password')

    })

  }

    

  get f(){

    return this.form.controls;

  }

  ngOnInit(): void {
  }
  submit(){

    console.log(this.form.value);

  }
  changework(){
    console.log("Password Change Work")
  }
  changepasswordwork(){
    console.log("Password Change Work")
  }
  showModalDialog() {
    this.displayModal = true;
}

}
