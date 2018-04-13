import { Component, OnInit } from '@angular/core';
import { DatapickService } from '../../server/datapick.service';
import { HttpclientService } from '../../server/httpclientserver.service'
import {Router} from "@angular/router";


@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
export class MineComponent implements OnInit {


    constructor(private userSetting:DatapickService,private router:Router,private http:HttpclientService) { }

    ngOnInit() {
        let User = sessionStorage.getItem('username');
        if(!User){
            this.router.navigate(['/meilislogin'])
        }else{
                this.http.get('selectAppUsers',{username:User}).then((res)=>{
                let userInfo = res['data'][0];
                window.sessionStorage.setItem('userId',userInfo['id']);
                console.log(userInfo['username']);
                if(userInfo['username']){
                    this.userSetting.username = userInfo['username'];
                }
                if(userInfo['portrait']){
                    this.userSetting.imgUrl ="http://10.3.136.55:8181/assets/"+userInfo['portrait'];
                }
        })
        }

       
    
  }

}
