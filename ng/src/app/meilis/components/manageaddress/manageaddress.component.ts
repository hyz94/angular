import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manageaddress',
  templateUrl: './manageaddress.component.html',
  styleUrls: ['./manageaddress.component.scss']
})
export class ManageaddressComponent implements OnInit {
	manageAddress:Array<any> = [];
	constructor() { }

	ngOnInit() {
		this.manageAddress = JSON.parse(sessionStorage.getItem('allAddress'));
		console.log(this.manageAddress);
	}
	goAddress(){
		location.pathname ="address";
	}
	goBack(){
	  window.history.back()
	}
}
