import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  stateOptions: any[];
  constructor() { }
  value1: string = 'off';
  ngOnInit(): void {
    this.stateOptions = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ];
  }

}
