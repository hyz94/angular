import { Injectable } from '@angular/core';

@Injectable()
export class DatapickService {

  username:string = "";
  addr:string = "";
  gender:string = "";
  id:Number;
  birthDay:string = "2018-03-03"; 
  imgUrl:string = "http://10.3.136.55:8181/assets/protrait.jpg";   
  constructor() { }

}
