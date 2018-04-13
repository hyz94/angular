import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from "@angular/router";
import { RouterModule, Routes } from '@angular/router';

import {HttpclientService} from '../../server/httpclientserver.service'

@Component({
	selector: 'app-buycar',
	templateUrl: './buycar.component.html',
	styleUrls: ['./buycar.component.scss']
})
export class BuycarComponent implements OnInit {
	showTxt: boolean= true;
	showBtn: boolean= false;
	dataset = {};
	totalNum:number=0;
	allSelect: boolean=false;
	productNum:number=0;
	account:number=0;
	accountID:Array<any>=[];
	username:string;
	constructor(private http: HttpclientService,private router:Router) { }
	ngOnInit() {
		var username1 = sessionStorage.getItem('username');
		this.username = username1;
		if(!username1){
			this.router.navigate(['/meilislogin']);
		}else{
			this.http.get('getCart',{username:this.username}).then((res) => {
				if(res['qty']>0){
					res['data'].map(function(item){
						item.checked=false;
					})
					this.dataset = res;
					this.productNum = res['qty'];
				}else{
					this.dataset = null;
				}
			})
		}
	}
	roading(){
		this.http.get('getCart',{username:this.username}).then((res) => {
			res['data'].forEach((item1)=>{
				this.dataset['data'].map((item2)=>{
					if(item1.id==item2.id){
						item2.qty=item1.qty;
					}
				})
			})
		})
	}
	compile(){
		this.showTxt = false;
		this.showBtn = true;
	}
	complete(){
		this.showTxt = true;
		this.showBtn = false;
	}
	total(){
		var res = 0;
		var accountNum = 0;
		this.dataset['data'].forEach(function(item){
			if(item.checked == true){
				res +=item.price*item.qty;
				accountNum++;
			}
		})
		this.account = accountNum;
		this.totalNum = res;
	}
	oneChecked(id,check){
		this.dataset['data'].map((item,idx)=>{
			if(item.id==id){
				item.checked=check;
			}
		})
		var a = this.dataset['data'].every(function(item){
			return item.checked == true;
		})
		if(a==true){
			this.allSelect = true;
		}else{
			this.allSelect = false;
		}
		this.total();
	}
	allChecked(m){
		this.dataset['data'].map((item) => {
			if(m==true){
				item.checked=true;
			}else{
				item.checked=false;
			}
		})
		this.total();
	}
	addQty(id,num){
		num++;
		this.http.get('update',{db:'cart',username:this.username,id:id,qty:num}).then((res)=>{
			this.roading();
			this.total();
		})
	}
	subQty(id,num){
		num--;
		if(num<1){
			num = 1;
		}
		this.http.get('update',{db:'cart',username:this.username,id:id,qty:num}).then((res)=>{
			this.roading();
			this.total();
		})
	}
	delete(){
		this.dataset['data'].forEach((item)=>{
			if(item.checked){
				this.http.get('delete',{db:'cart',username:this.username,id:item.id}).then((res)=>{
					console.log(res);
				})
			}
		})
		this.ngOnInit();
	}
	goAccount(){
		this.accountID = [];
		this.dataset['data'].forEach((item)=>{
			if(item.checked){
				this.accountID.push(item.id);
			}
		})
		if(this.accountID.length>0){
			var key= JSON.stringify(this.accountID);
			sessionStorage.setItem('accountid',key);
			location.pathname ="meilisAccount";
		}else{
			alert('请勾选需要购买的商品');
		}
		
	}
	goBack(){
	  window.history.back()
	}
}
