import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-address',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
	address:Array<any>= [];
	constructor() { }

	ngOnInit() {

	}
	complete(){
		let obj = {};
		let username:any = document.querySelector('#username')['value'];
		let tel:any = document.querySelector('#tel')['value'];
		let address:any = document.querySelector('dd').innerText;
		let _detailaddress:any = document.querySelector('#detailaddress')['value'];
		let _user = username + ' ' + tel;
		let _address = address + _detailaddress;
		obj['user'] = _user;
		obj['address'] = _address;
		console.log(obj);
		if(username){
			if(tel){
				if(_detailaddress){
					let _user = username + ' ' + tel;
					let _address = address + _detailaddress;
					obj['user'] = _user;
					obj['address'] = _address;
					let _newAddress = JSON.stringify(obj);
					let allAddress1 = sessionStorage.getItem('allAddress');
					if(!allAddress1){
						let allAddress = [];
						allAddress.push(obj);
						let _allAddress = JSON.stringify(allAddress);
						sessionStorage.setItem('allAddress',_allAddress);
					}else{
						let allAddress = JSON.parse(allAddress1);
						allAddress.push(obj);
						let _allAddress = JSON.stringify(allAddress);
						sessionStorage.setItem('allAddress',_allAddress);
					}
					sessionStorage.setItem('newAddress',_newAddress);
					console.log(sessionStorage);
					location.pathname ="meilisAccount";
				}else{
					alert('请输入详细地址');
				}
			}else{
				alert('请输入手机号');
			}
		}else{
			alert('请输入收货人姓名');
		}
	}
	goBack(){
	  window.history.back()
	}
}
