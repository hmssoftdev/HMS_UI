import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  constructor() { }
  limitFileSize(fileObject , minSize: number, maxSize: number){
    if(fileObject.target.files.length > 0){
      for(let i = 0; i <= fileObject.target.files.length - 1; i++){
        const fsize = fileObject.target.files.item(i).size; //Get file size
        const file = Math.round((fsize / 1024)); // Map file size  in KB
        if(file > maxSize){
          alert(`File is too big, Please select a file less than ${maxSize} KB`);
          console.log((fsize / 1024 / 1024) + " MB"); //Printing the file size in MB
          return;
        } else if(file < minSize) {
          alert(`File is too samll, Please select a file greater than ${minSize} KB`);
          return;
        } else {
          return fileObject.target.files[0]; 
        }
      }
    }
  }
}
