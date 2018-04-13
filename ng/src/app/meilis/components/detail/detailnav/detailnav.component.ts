import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {HttpclientService} from '../../../server/httpclientserver.service'

@Component({
  selector: 'app-detailnav',
  templateUrl: './detailnav.component.html',
  styleUrls: ['./detailnav.component.scss']
})
export class DetailnavComponent implements OnInit {
  @Output() parentAttr = new EventEmitter<Boolean>();
  qty: number;
  // @Output() parentEvent = new EventEmitter<Boolean>();
  constructor(private http: HttpclientService) { }

  ngOnInit() {
    this.http.get('getCart',{username: 'st'}).then((res) => {
      let goodsQty = 0;
      for(let i=0;i<res['qty'];i++){
        goodsQty += res['data'][i]['qty']
      }
      this.qty = goodsQty;
    })
  }
  
  childrenEvent(val: Boolean){
    this.parentAttr.emit(val)
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
