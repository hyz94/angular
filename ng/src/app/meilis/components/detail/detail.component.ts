import { Component, OnInit, NgModule } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from "@angular/router";
import {DetailnavComponent} from './detailnav/detailnav.component'
import {HttpclientService} from '../../server/httpclientserver.service'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  dataset:Array<any>;
  recommendDataset:Array<any>;
  hostDataset:Array<any>;
  buyShow:Boolean;
  goodsId:String;
  username: String;
  constructor(private http: HttpclientService,private router:Router) {
  }
  
  ngOnInit() {
  
    // console.log($('.detail_cont'))
    // $('.detail_cont').scroll(function(){
    //   console.log($('.detail_cont').scrollTop())
    // })
    // console.log(sessionStorage.getItem('username'))
    this.username = sessionStorage.getItem('username');
    if(location.search == ''){
      location.search = '?id=1';
    }
    let id = location.search.slice(4);
    this.goodsId = id;
    // window.location.reload();
    // console.log(id)
    this.http.get('products',{id: id}).then((res) => {
      // console.log(res['data'])
      this.dataset = res['data'];
    })
    this.http.get('products',{choiceness: 1}).then((res) => {
      // console.log('111',res['data'])
      this.recommendDataset = res['data'];
    })
    this.http.get('products',{new: 1}).then((res) => {
      // console.log('111',res['data'])
      this.hostDataset = res['data'];
    })
    if(this.username != 'null'){
      this.http.get('getCart',{username: this.username}).then((res) => {
        let goodsQty = 0;
        for(let i=0;i<res['qty'];i++){
          goodsQty += res['data'][i]['qty']
        }
        $('.cartQty').text(goodsQty)
      })
    }
    
    
  }

  cutQty(){
    if(Number($('.qtyGoods')[0].innerText) > 1){
      $('.qtyGoods')[0].innerText = String((Number($('.qtyGoods')[0].innerText) - 1));
    }
  }
  addQty(){
    $('.qtyGoods')[0].innerText = String((Number($('.qtyGoods')[0].innerText) + 1));
  }
  confirmP(){
    console.log(this.username)
    if(!this.username){
      this.router.navigate(['/meilislogin']);
    }
    let _id = this.dataset[0].id;
      let name = this.dataset[0].name;
      let qty = $('.qtyGoods')[0].innerText;
      let img = this.dataset[0].img;
      let username = this.username;
      let color = this.dataset[0].color;
      let size = this.dataset[0].size;
      let price = this.dataset[0]['saleprice'];
      // console.log(_id,name,qty,img,username,color,size,price)
      this.http.get('addCollect1',{db:'cart',_id:_id,name: name,qty: qty,img: img,username: username,color: color,size: size,price: price}).then((res) => {
        // console.log(res)
        let goodsQty = 0;
        for(let i=0;i<res['qty'];i++){
          goodsQty += res['data'][i]['qty']
        }
        $('.cartQty').text(goodsQty)
        $('.zhanwei').css({
          display: 'none'
        })
        $('.allMassage').css({
          display: 'none'
        })
        $('.confirmP').css({
          display: 'none'
        })
      })
  }
  addCart(){
    console.log('cart')
    let $ = jQuery;
    $('.zhanwei').css({
      display: 'block'
    })
    $('.allMassage').css({
      display: 'block'
    })
    $('.confirmP').css({
      display: 'block'
    })
    //高亮当前
    let currentColor = this.dataset[0]['color'];
    let currentsSpan = $('.clickColor span');
    currentsSpan.css({
      backgroundColor: '#faecec',
      color: '#000'
    })
    // console.log(currentsSpan[0].innerText)
    for(let i=0;i<currentsSpan.length;i++){
      if(currentsSpan[i].innerText == currentColor){
        currentsSpan[i].style.backgroundColor = '#f90';
        currentsSpan[i].style.color='#fff'
      } else {
        currentsSpan[i].style.backgroundColor = '#faecec';
        currentsSpan[i].style.color='#000'
      }
    }
    let currentSize = this.dataset[0]['size'];
    let currentsSpanSize = $('.clickSize span');
    currentsSpanSize.css({
      backgroundColor: '#faecec',
      color: '#000'
    })
    // console.log(currentsSpan[0].innerText)
    for(let i=0;i<currentsSpanSize.length;i++){
      if(currentsSpanSize[i].innerText == currentSize){
        currentsSpanSize[i].style.backgroundColor = '#f90';
        currentsSpanSize[i].style.color='#fff'
      } else {
        currentsSpan[i].style.backgroundColor = '#faecec';
        currentsSpan[i].style.color='#000'
      }
    }
    //点击高亮
    $('.clickColor').on('click', 'span',function(){
      currentsSpan.css({
        backgroundColor: '#faecec',
        color: '#000'
      })
      currentColor = this.innerText;
      this.style.backgroundColor = '#f90';
      this.style.color='#fff'
    })
    $('.clickSize').on('click', 'span',function(){
      currentsSpanSize.css({
        backgroundColor: '#faecec',
        color: '#000'
      })
      currentSize = this.innerText;
      this.style.backgroundColor = '#f90';
      this.style.color='#fff'
    })
    //数量的加减
    

    $('.closeBuyShow').click(function(){
      $('.zhanwei').css({
        display: 'none'
      })
      $('.allMassage').css({
        display: 'none'
      })
      $('.confirmP').css({
        display: 'none'
      })
    })
  }

  collect(){
    $('.collectS').css({
      display: 'block'
    })
    setTimeout(function(){
      $('.collectS').css({
        display: 'none'
      })
    },1000)
    $('.z_li1').css({
      display:'none'
    })
    $('.z_li2').css({
      display:'block'
    })
    $('.z_li2 i').css({
      transform: 'scale(1.2)'
      
    })
  }
  collectF(){
    $('.collectF').css({
      display: 'block'
    })
    setTimeout(function(){
      $('.collectF').css({
        display: 'none'
      })
    },1000)
    $('.z_li2').css({
      display:'none'
    })
    $('.z_li1').css({
      display:'block'
    })
  }
}
