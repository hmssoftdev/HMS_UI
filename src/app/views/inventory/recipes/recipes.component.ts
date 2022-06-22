import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipesmodal:boolean
  constructor() { }
  wei:any[]
  weigth:string;
  ngOnInit(): void {
    this.wei=[
      {name:"Kg",value:"kilo"},
      {name:'Gms',value:'grams'}
    ]
  }
  openNew(){
    this.recipesmodal=true

  }

}
