import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import {HttpclientService} from '../../../server/httpclientserver.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	accountData: Array<any> = [];
	totalNum:number = 0;
	hasAddress:boolean = false;
	noAddress:boolean = true;
	newAddress:object = {};
	constructor(private http: HttpclientService) { }

	ngOnInit(){
		var user = sessionStorage.getItem("username");
		var key = JSON.parse(sessionStorage.getItem("accountid"));
		this.http.get('getCart',{username:user}).then((res)=>{
			var accountProduct =[];
			key.forEach((item1)=>{
				res['data'].map((item2)=>{
					item2.btn = false;
					if(item1==item2.id){
						accountProduct.push(item2);
					}
				})
			})
			this.accountData = accountProduct;
			this.total();
		});
		var _newAddress = JSON.parse(sessionStorage.getItem('newAddress'));
		console.log(_newAddress);
		if(!_newAddress){
			this.hasAddress = false;
			this.noAddress = true;
		}else{
			this.hasAddress = true;
			this.noAddress = false;
			this.newAddress = _newAddress;
			console.log(this.newAddress);
		}
	}
	total(){
		var res = 0;
		var accountNum = 0;
		this.accountData.forEach(function(item){
			res +=item.price*item.qty;
			accountNum++;
		})
		this.totalNum = res;
	}
	goBack(){
	  window.history.back()
	}
	showBtn(id){
		this.accountData.map((item)=>{
			if(id==item.id){
				item.btn = true;
			}
		})
	}
	addQty(id,num){
		num++;
		this.accountData.map((item)=>{
			if(id==item.id){
				item.qty = num;
			}
		})
		this.total();
	}
	subQty(id,num){
		num--;
		if(num<1){
			num = 1;
		}
		this.accountData.map((item)=>{
			if(id==item.id){
				item.qty = num;
			}
		})
		this.total();
	}
	goAddress(){
		let _allAddress = sessionStorage.getItem('allAddress');
		if(!_allAddress){
			location.pathname ="address";
		}else{
			location.pathname = "manageAddress";
		}
	}
}
