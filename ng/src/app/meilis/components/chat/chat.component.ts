import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

declare var $:any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  msg:String = '';
  msgData:Array<any> = [];
  // reg:any = new RegExp('[\w]+','g');
  q:Array<any> = '你好,请问可以退货吗,请问你是机器人吗,笑嘻嘻,去看电影吗'.split(',');
  a:Array<any> = '你好&nbsp;请问有什么要问的吗,不可以,不是&nbsp;我是可爱的小仙女,？？,我去洗澡了'.split(',');
  min:Array<any>  = 'Fuck,SB,金三胖,屎,傻,逼,六合彩'.split(',');

  constructor(private router:Router) { }

  ngOnInit() {
     let User = sessionStorage.getItem('username');
        if(!User){
            this.router.navigate(['/meilislogin'])
        }

  }
  goback(){
      window.history.back();
  }

  sendMsg(){
    let is:any =  this;
    let re = /\*/ig;
    let rs = /退货/ig;
    // let regFace = new RegExp
   // this.msgData.push(this.msg);
   // console.log(this.msgData);
   
    // let qli = document.createElement('li');
    
  
     
    // <li class="active"> <div id="show"></div></li>
    
    let qli = $("<li></li>");
    qli.css({
         float:'right',clear:'both',
         margin:'10px 0',padding:'12px',lineHeight:2,borderRadius:'10px',
         backgroundColor:'#FF3366',color:'#fff',
         border:'1px solid #ED5983',fontsize:'28px',fontWeight:'400'

         
    })
    // console.log(is.msg)
    if(/^[\w\u4e00-\u9fa5]+$/g.test(is.msg)  && is.msg.length !=0 ){

      this.min.forEach(function(item){
        // 创建一个匹配item变量且忽略大小写且全部匹配的正则表达式
        var reg = new RegExp(item,'gi');

        // 替换敏感字符、并重新赋值
        is.msg = is.msg.replace(reg,'**');
      })
     
      qli.html(is.msg);
      // console.log(is.msg);
      
      


      // 把li写入ul
      $('.chatCont').append(qli);
      
    }else{
        
         // $(".Fshow").remove()
        // if(is.msg.length !=0){
          // <li class="active"> <div id="show"></div></li>
          let qdiv = $("<div class='Fshow'></div>");
          // console.log(qdiv);
          qli.append(qdiv);
          $('.chatCont').append(qli);
          // is.msg = '';

           // qqFace start
          this.chufa();

          var str = $("#saytext").val();

          $(".Fshow").html(is.replace_em(str));
          // qqFace over 
         

    }

    

    // 判断msg是否存在q数组中
    var idx = this.q.indexOf(this.msg);
    var ali =  $("<li></li>");
    ali.css({
        float:'left',clear:'both',
        margin:'10px 0',padding:'12px',lineHeight:2,
         backgroundColor:'#fff',color:'#4B4B4B',fontWeight:'400',borderRadius:'10px',
         border:'1px solid #E2E2E2',

    })

    if(idx >= 0){
        ali.html(this.a[idx]);
    }else if(/^[\w]+$/.test(is.msg)){
       ali.html('请说中文，谢谢');

    }else if(is.msg.match(re)){
        ali.html('请文明用语');
    }else if(is.msg.match(rs)){
       ali.html('对不起，我们公司是不能退货的');
    }else{
        ali.html('不好意思，客服姐姐出去玩了');
    }
    // console.log($('.chatCont'));
    setTimeout(function(){
        $('.chatCont').append(ali);
    },2000);

       // 清空输入框并获取焦点
      $('.chatMsg').val('').attr('placeholder','');
      $('.chatMsg').focus();

       is.msg = '';

  }
 chufa(){
    
     let is:any = this;

      $('.emotion').qqFace({
       

        id : 'facebox', 

        assign:'saytext', 

        path:'http://localhost:4200/assets/arclist/'  //表情存放的路径

      });

      // $(".sub_btn").click(function(){

      //   var str = $("#saytext").val();

      //   $(".Fshow").html(is.replace_em(str));

      // });
    
  }

  replace_em(str){

        str = str.replace(/\</g,'&lt;');

        str = str.replace(/\>/g,'&gt;');

        str = str.replace(/\n/g,'<br/>');

        str = str.replace(/\[em_([0-9]*)\]/g,'<img src="http://localhost:4200/assets/arclist/$1.gif" border="0" />');

        return str;
  }
}

