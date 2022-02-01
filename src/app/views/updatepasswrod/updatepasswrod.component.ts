import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';

import { Message, MessageService } from 'primeng/api';
@Component({
  selector: 'app-updatepasswrod',
  templateUrl: './updatepasswrod.component.html',
  styleUrls: ['./updatepasswrod.component.scss']
})
export class UpdatepasswrodComponent implements OnInit {
  mssg: Message[];
  form: FormGroup = new FormGroup({});
  displayModal: boolean;
  constructor(private fb: FormBuilder,private messageService: MessageService) { 
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
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    console.log("Password Change Work")
  }
  changepasswordwork(){
    console.log("Password Change Work")
  }
  showModalDialog() {
    this.displayModal = true;
}

}
