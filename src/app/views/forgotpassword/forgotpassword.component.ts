import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private messageServie: MessageService) { }

  ngOnInit(): void {
  }
  showResponse(event) {
    this.messageServie.add({severity:'info',
     summary:'SuccessFully', detail: 'Verified'});
}
}
