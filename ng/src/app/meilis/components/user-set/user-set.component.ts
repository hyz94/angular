import { Component, OnInit } from '@angular/core';
import { HttpclientService } from '../../server/httpclientserver.service';
import { DatapickService } from '../../server/datapick.service'

@Component({
  selector: 'app-user-set',
  templateUrl: './user-set.component.html',
  styleUrls: ['./user-set.component.scss']
})
export class UserSetComponent implements OnInit {
  file:Object = {};
  username:String;
  id:String;



  constructor(private http:HttpclientService,private datePicker:DatapickService) { }

  ngOnInit() {

     if(window.sessionStorage.getItem('username')){
           this.username = window.sessionStorage.getItem('username');
      }
      if(window.sessionStorage.getItem('userId')){
           this.id = window.sessionStorage.getItem('userId');
      }
  }
  getpic(event: any){
    var el  = event.target;
    this.file =el['files'][0];
    // console.log(this.file); 
    var filepath = el['value'];
    var fileFormat = filepath.substring(filepath.lastIndexOf(".")).toLowerCase();  
    var src = window.URL.createObjectURL(el['files'][0]);
    if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {  
        window.alert('上传错误,文件格式必须为：png/jpg/jpeg');  
        return;    
    }  
    
    $(el).next('img').attr('src',src); 

    // this.http.get('http://localhost:889/students').then((res)=>{
    //     console.log(res);
    // })
    
    // this.http.post('http://localhost:889/students').then((res)=>{
    //     console.log(res);
    // })

   
  }
  upload(){
     
      let formData = new FormData(); 
      let is:any = this;
    
      var ad=[];
      $('.pic').each((idx,item) => {
          // console.log(item['files']);
          if(item['files'].length==0){
          }else{
            // console.log(item['files'][0]);
              formData.append(item['name'],item['files'][0],item['files'][0].name);
              ad.push(item['files'][0]);
          }
      })
   

      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //     }
      // }
       
      // this.http.post('http://localhost:889/upload',{formData,config}).then((res)=>{
        
        // console.log(res);
      // })

      $.ajax({
          url: 'http://10.3.136.55:8181/upload',
          type: 'POST',
          cache: false,
          data: formData,
          processData: false,
          contentType: false
      }).done(
            function(res) {
                console.log(res);
                  is.http.get('update?db=appusers',{username:is.username,id:is.id,portrait:`'${res}'`}).then((ress)=>{
                     console.log(ress);
                  })

                var params =  'http://10.3.136.55:8181/assets/';
                is.datePicker.imgUrl = params +res;
                 $('.plaCenter').hide();
            })

        .fail(function(res) {
            console.log('失败');
        }); 


      return ad;
  }
 

  updata(){
      this.upload();
      
  }
  
  goback(){
      window.history.back();
  }

  hideGetpic(){
      $('.plaCenter').hide();
  }

  changePortrait(){
    $('.plaCenter').show();
  }
  
    
    

}
