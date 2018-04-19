import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';  
import {HttpclientService} from "../../server/httpclientserver.service"
declare var $: any; 

@Component({
  selector: 'classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss']
})

export class ClassifyComponent implements OnInit {
   dataset:Array<any>;
  constructor(private http:HttpclientService,private router:Router) { }

  ngOnInit() {
        this.http.get("products").then((res)=>{
            if(res){
                this.dataset = res['data'];
            }
        })
    //高亮当前
    $('.popular').css({
      color: '#f90'
    })
  }
  getKeys(items){
        return items? Object.keys(items):[];
  }
  dimSearch(){
    this.router.navigate(['/meilissearch']);
  }
  popular(e){
    this.http.get("products").then((res)=>{
      if(res){
          this.dataset = res['data'];
      }
    })
    $('.classify_tab span').css({
      color: '#3e3e3e'
    })
    e.target.style.color = '#f90'
    
  }
  hotSale(e){
    this.http.get("hotSale").then((res)=>{
      if(res){
          this.dataset = res['data'];
      }
    })
    $('.classify_tab span').css({
      color: '#3e3e3e'
    })
    // console.log(e.target)
    e.target.style.color = '#f90'

  }
  newTime(e){
    this.http.get("newTime").then((res)=>{
      if(res){
          this.dataset = res['data'];
      }
    })
    $('.classify_tab span').css({
      color: '#3e3e3e'
    })
    e.target.style.color = '#f90'

  }
}
