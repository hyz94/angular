import { Component, OnInit } from '@angular/core';
import { HttpclientService } from '../../server/httpclientserver.service'


@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})
export class ChangepwdComponent implements OnInit {
   username:String; 
   id:String;
  constructor(private http:HttpclientService) { }

  ngOnInit() {
      if(window.sessionStorage.getItem('username')){
           this.username = window.sessionStorage.getItem('username');
      }
      if(window.sessionStorage.getItem('userId')){
           this.id = window.sessionStorage.getItem('userId');
      }
     
  }
  golast(a,b){
      if(a==b){
          console.log(this.id);
          // http://10.3.136.55:8181/update?db=appusers&username=XXX&id=1&XXX=XXX
          this.http.get('update?db=appusers',{username:this.username,id:this.id,password:a}).then((res)=>{
              if(!res['status']){
                  alert('修改成功')
              }
          })

      }else{
          alert("两次输入密码不一样")
      }
  }
  goback(){
      window.history.back();
  }

}
