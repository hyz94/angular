import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";

@Component({
  selector: 'sanjiliandong',
  templateUrl: './sanjiliandong.component.html',
  styleUrls: ['./sanjiliandong.component.css']
})
export class SanjiliandongComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = "../../../../../assets/jquery.area.js";
		document.body.appendChild(script);
		
	}
}
