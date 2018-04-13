import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import {HttpclientService} from '../../../server/httpclientserver.service'


@Component({
  selector: 'youlike',
  templateUrl: './youlike.component.html',
  styleUrls: ['./youlike.component.scss']
})
export class YoulikeComponent implements OnInit {
	dataset:Array<any> = []
  constructor(private http: HttpclientService) { }

  ngOnInit() {
  	this.http.get('products',{new:1}).then((res)=>{
  		this.dataset = res['data'].slice(0,8);
  	})
  }

}
