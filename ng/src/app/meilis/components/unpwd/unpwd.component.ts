import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {Router} from "@angular/router";
import { HttpclientService } from '../../server/httpclientserver.service';

@Component({
  selector: 'app-unpwd',
  templateUrl: './unpwd.component.html',
  styleUrls: ['./unpwd.component.css']
})
export class UnpwdComponent implements OnInit {

    p1:String = '你的手机号码是?'; 
    username:String = ''; 
    qty:Number = null;
    time:Number = 15;
    times:String = '发送验证码';
    timesp1:String = 'block';
    timesp2:String = 'none';
    alertStr:String = '';
    alertdisplay:String = 'none';
    rotalImgdisplay:String = 'none';
    picArr: Array<any> = [];
    timer:String = '';
    judgeYzm1:String = '';
    judgeYzm2:String = '';
    judgeRegister:String = 'false';
    imgArr:Array<any> = [
        '../../../../assets/img/bb2-2.jpg',
        '../../../../assets/img/jx2.jpg',
        '../../../../assets/img/jx3.jpg',
        '../../../../assets/img/jx4.jpg',
        '../../../../assets/img/jx5.jpg',
        '../../../../assets/img/list2.jpg',
        '../../../../assets/img/gzmh5.jpg',
        '../../../../assets/img/lyq2.jpg',
        '../../../../assets/img/lyq5.jpg',
        '../../../../assets/img/nyi3.jpg',
        '../../../../assets/img/ps4.jpg',
        '../../../../assets/img/qz1.jpg',
        '../../../../assets/img/sy2.jpg',
        '../../../../assets/img/tx2.jpg',
    ];
    imgDeg:Array<any> = [
        '0deg','90deg','180deg','270deg'
    ]

  constructor(private http: HttpclientService,private router:Router) { }

  ngOnInit() {
  }


  onFocusPhone(e){
    this.p1 = '你的手机号码是?';
  }
  onKeyUpPhone(e){
    let num = this.username.length
    this.p1 = num+'个字符';
  }
  onBlurPhone(e){
    let phoneRe = /^1[34578]\d{9}$/g;
    let num = this.username.length;
    let phoneNum = e.target.value;
    let numStr = this.username;

    this.http.get('selectAppUsers',{username:numStr}).then((res)=>{
        this.qty = res['qty'];
        console.log(this.qty);

        if(num<1){
           this.alertStr = '手机号码不能为空';
           this.alertdisplay = 'block';
           setTimeout(()=>{
               this.alertdisplay ='none';
               this.rotalImgdisplay = 'none';
           }, 2000)
        }
        else if(num<11){
            this.alertStr = '手机号码不能小于11位';
            this.alertdisplay = 'block';
            setTimeout(()=>{
                this.alertdisplay ='none';
                this.rotalImgdisplay = 'none';
            }, 2000)
        }
        else if(num>11){
            this.alertStr = '手机号码不能超过11位';
            this.alertdisplay = 'block';
            setTimeout(()=>{
                this.alertdisplay ='none';
                this.rotalImgdisplay = 'none';
            }, 2000)
        }
        else if(!phoneRe.test(phoneNum)){
            this.alertStr = '手机号码格式错误,请重新输入';
            this.alertdisplay = 'block';
            setTimeout(()=>{
                this.alertdisplay ='none';
                this.rotalImgdisplay = 'none';
            }, 2000)
        }
        else if(this.qty<1){
            console.log(this.qty);
            this.alertStr = '用户不存在,请重新输入';
            this.alertdisplay = 'block';
            setTimeout(()=>{
                this.alertdisplay ='none';
                this.rotalImgdisplay = 'none';
            }, 2000)
        }
        else{
            console.log(this.qty);
            this.rotalImgdisplay = 'block';
            this.getArrayArr(this.imgArr);
            this.p1 = '用户存在!';
        }
    })
  }


  getArrayArr(arr){
      let picList = this.getArrayItems(arr, 4);
      let imgList = document.getElementsByClassName('lii');
      // console.log(imgList);
      let deg = '';
      let pic = '';

      for(var i=0;i<imgList.length;i++){
          deg =  this.randomArr(this.imgDeg);
          pic = picList[i];
          imgList[i].setAttribute('style',`transform:rotate(${deg});background-image:url(${pic})`);
      }
  }
  // 点击旋转
  rotateLi(e){
      let deg = e.target.style;
      let deg2 = e.target.style.transform;
      deg2 = deg2.slice(7,-4);
      deg2 = deg2*1 + 90;
      e.target.style.transform = `rotate(${deg2}deg)`;
  }
  authCode(e){
      if(this.username.length==0){
        this.alertStr = '手机号码不能为空';
        this.alertdisplay = 'block';
        setTimeout(()=>{
            this.alertdisplay ='none';
            this.rotalImgdisplay = 'none';
        }, 2000)
      }
      if(this.rotalImgdisplay=='block'){
      let imgList2 = document.getElementsByClassName('lii');
      let listDeg = '';
      let lastList = [];
      let lastDeg = 0;
      for(var i=0;i<imgList2.length;i++){
          listDeg = imgList2[i].getAttribute('style');
          let listidx = listDeg.indexOf(';');
          listDeg = listDeg.slice(17,listidx-4);
          lastList.push(listDeg);
      }
      for(let k=0;k<lastList.length;k++){
          if(lastList[k].indexOf('(')>-1){
              // let listidx2 = lastList[k].indexOf('(');
              lastList[k] = lastList[k].substring(1,)
          }
      }
      for(var j=0;j<lastList.length;j++){
          let ddd = lastList[j]*1;
          let ccc = ddd%360;
          lastDeg+=ccc;
      }
      
      if(lastDeg==0){
          this.timesp1 = 'none';
          this.timesp2 = 'block';
          var num = 15;
          this.judgeYzm1 = this.vCode();
          console.log(this.judgeYzm1);
          var timer = setInterval(()=>{
              // this.countDown(this.time);
              if(this.time==0){
                  this.timesp2 = 'none';
                  this.timesp1 = 'block';
                  this.times = '重新获取';
                  this.time = 15;
                  num = 15;
                  clearInterval(timer);
                  this.judgeYzm1 = '验证码已经失效!';
                  console.log(this.judgeYzm1);
              }
              else{
                  num--;
                  this.time = num;
              }
          },1000);
          

      }
      else{
          this.alertStr = '请点击图片旋转至正面朝上';
          this.alertdisplay = 'block';
          setTimeout(()=>{
              this.alertdisplay ='none';
              this.getArrayArr(this.imgArr);
          }, 2000)
      }
    }
  }
  judgeFocus(){
      let num = this.username.length;
      if(num<=1){
          this.alertdisplay = 'block';
          this.alertStr = '请输入手机号码';
          setTimeout(()=>{
              this.alertdisplay ='none';
          }, 2000)
      }
  }
  clickRegister(e,val){
      let num = this.judgeYzm2.length;
      if(num<=1){
          this.alertdisplay = 'block';
          this.alertStr = '请重新输入验证码';
          setTimeout(()=>{
              this.alertdisplay ='none';
          }, 2000)
      }
      else if(this.judgeYzm1 != this.judgeYzm2){
          this.alertdisplay = 'block';
          this.alertStr = '验证码错误或失效';
          setTimeout(()=>{
              this.alertdisplay ='none';
          }, 2000)
      }
      else{
          console.log('成功登录');
          let numStr = this.username;
          this.alertdisplay = 'block';
          // console.log('号码:',val);
          this.alertStr = '登录成功,跳转登录页面';
          sessionStorage.setItem('username',val);
          console.log(sessionStorage.getItem('username'));
          setTimeout(()=>{
            this.alertdisplay ='none';
            this.router.navigate(['/meilismine'])
        }, 1000)
      }
  }


  getArrayItems(arr, num) {
      //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
      var temp_array = new Array();
      for (var index in arr) {
          temp_array.push(arr[index]);
      }
      //取出的数值项,保存在此数组
      var return_array = new Array();
      for (var i = 0; i<num; i++) {
          //判断如果数组还有可以取出的元素,以防下标越界
          if (temp_array.length>0) {
              //在数组中产生一个随机索引
              var arrIndex = Math.floor(Math.random()*temp_array.length);
              //将此随机索引的对应的数组元素值复制出来
              return_array[i] = temp_array[arrIndex];
              //然后删掉此索引的数组元素,这时候temp_array变为新的数组
              temp_array.splice(arrIndex, 1);
          } else {
              //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
              break;
          }
      }
      return return_array;
  }
  // 随机return一个deg
  randomArr(arr){
      var idx = Math.floor((Math.random()*arr.length)); 
      return arr[idx];
  }
  // 生成随机4个验证码
  vCode(){
      var res = '';
      for(var i=0;i<6;i++){
          let resStr = Math.floor((Math.random()*10));
          res+=resStr;
      }
      return res;
  }
// end
}
