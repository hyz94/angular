import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-shezhi',
  templateUrl: './shezhi.component.html',
  styleUrls: ['./shezhi.component.scss']
})
export class ShezhiComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goback(){
    
      window.history.back();
  }
  goExit(){
      if(window.sessionStorage.getItem('username')){
          window.sessionStorage.removeItem('username');
      }
      this.router.navigate(['/meilislogin']);
  }

}
