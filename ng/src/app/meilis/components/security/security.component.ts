import { Component, OnInit } from '@angular/core';
import { DatapickService } from '../../server/datapick.service';
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  username:String;
  constructor(private userSetting:DatapickService) { }

  ngOnInit() {
      this.username = window.sessionStorage.getItem('username');
  }

  goback(){
      window.history.back();
  }

}
