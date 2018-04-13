import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoucang',
  templateUrl: './shoucang.component.html',
  styleUrls: ['./shoucang.component.scss']
})
export class ShoucangComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goback(){
      window.history.back();
  }
}
