import { Component, OnInit } from '@angular/core';
import { UserFeedback } from './../../../models/user';
import { UserService } from './../../../service/user.service';
import { MessageService } from 'primeng/api';
import { cibDynatrace } from '@coreui/icons';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss']
})
export class UserFeedbackComponent implements OnInit {
  userFeedback: UserFeedback;
  terms: boolean = true;
  timeStamp = new Date();
  displayDialog: boolean;
  disableBTN: boolean = false;
  feedback: UserFeedback;
  feedbackList: UserFeedback[] = [];
  constructor(public userSvc: UserService, public msgService: MessageService) { }

  ngOnInit(): void {
    this.getFeedback();
    this.userFeedback = { rating: 0, opinionText: '', reviewTitle: '' , timeStamp: 'none'}
    console.log(this.userFeedback);
  }

  getFeedback() {
    this.userSvc.getFeedbacklist().subscribe(res => {
      this.feedbackList = res;
    });
  }
  showFeedbackDialog() {
    this.displayDialog = true;
  }
  onSubmit() {
    if (this.userFeedback.rating === 0 && this.userFeedback.opinionText === "" && this.userFeedback.rating === 0 && this.userFeedback.reviewTitle === "") {
      alert("Please provide Info");
      this.displayDialog = true;
    } else if(!this.terms) {
      alert("Please accept the terms and conditions");
      this.displayDialog = true;
    } else{
      this.userFeedback.timeStamp = new Date().toISOString();
      // this.userFeedback.id = this.feedbackList[this.feedbackList.length - 1].id + 1;
      this.userSvc.postReview(this.userFeedback).subscribe(res => {
        if (res) {
          this.feedbackList.push(this.userFeedback);
          this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Feedback Posted', life: 3000 }); 
          this.getFeedback();     
        }
      })
      this.userFeedback = {};
      this.displayDialog = false;
    }
  }
}

