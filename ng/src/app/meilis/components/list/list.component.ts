import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpclientService} from "../../server/httpclientserver.service"

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    ulwidth;
    type:string;
    dataset;
    listdata;
    listSmalltype;
    smalltypeArr:Array<any>=[];
    constructor( private activatedRoute:ActivatedRoute,private http:HttpclientService, private router:Router) { }

    ngOnInit() {
    //    console.log($('#j_list'))
       $('#j_list').scroll(function(){
        //    console.log(111)
        //    console.log($('#j_list').scrollTop())
        //    console.log($('.list_tab').offset().top)
            let scrollY = $('#j_list').scrollTop();
            // console.log(scrollY)
            if(scrollY >= 300){
                $('.list_tab').addClass('fixed')
            } else {
                $('.list_tab').removeClass('fixed')
            }
        })

        this['sub'] = this.activatedRoute.queryParams.subscribe(queryParams=>{
            // console.log("queryParams参数:",queryParams);
            if(JSON.stringify(queryParams) == '{}'){
                // console.log(typeof(queryParams))
                let obj = {type: '精选套装'}
                queryParams = JSON.parse(JSON.stringify(obj))
            }
            this.type = queryParams.type;
            // console.log(this.type);
        })
        if(this.type == '卫衣'){
            this.http.get('smalltype',{'db':'products','type':this.type}).then((res)=>{
                this.listdata = res['data'];
            })
            $('#list_goods').css({
                marginTop: '1.25rem' 
            })
            $('.icon-icon--1').css({
                top: '0.43rem'
            })
            $('.icon-icon--').css({
                top: '0.43rem'
            })
        } else if(this.type == '气质毛衣'){
            // console.log(this.type)
            this.http.get("smalltype",{'db':'products','type':this.type}).then((res)=>{
                // console.log(res)
                this.listdata = res['data'];
                // console.log(this.listdata,'111')
            })
            $('#list_goods').css({
                marginTop: '1.25rem' 
            })
            $('.icon-icon--1').css({
                top: '0.43rem'
            })
            $('.icon-icon--').css({
                top: '0.43rem'
            })
        }  else if(this.type == 'T恤'){
            // console.log(this.type)
            this.http.get("smalltype",{'db':'products','type':this.type}).then((res)=>{
                // console.log(res)
                this.listdata = res['data'];
                // console.log(this.listdata,'111')
            })
            $('#list_goods').css({
                marginTop: '1.25rem' 
            })
            $('.icon-icon--1').css({
                top: '0.43rem'
            })
            $('.icon-icon--').css({
                top: '0.43rem'
            })
        }  else if(this.type == '连衣裙'){
            // console.log(this.type)
            this.http.get("smalltype",{'db':'products','type':this.type}).then((res)=>{
                // console.log(res)
                this.listdata = res['data'];
                // console.log(this.listdata,'111')
            })
            $('#list_goods').css({
                marginTop: '1.25rem' 
            })
            $('.icon-icon--1').css({
                top: '0.43rem'
            })
            $('.icon-icon--').css({
                top: '0.43rem'
            })
        } else{
            //ajax请求数据———二级分类nav
            this.http.get("smallType",{'db':'smalltype','type':this.type}).then((res)=>{
                this.dataset = res['data'];
                // console.log(this.dataset);
                this.ulwidth = (160*this.dataset.length)/64*1;

                for(let i=0;i<this.dataset.length;i++){
                    this.smalltypeArr.push(this.dataset[i].smalltype);
                } 
                // console.log('arr',this.smalltypeArr); 
                
                //默认渲染 
                this.http.get("smallType1",{'type':this.type,'smalltype':this.smalltypeArr[0]}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
                
            })
        }
        
        //高亮当前
        $('.popular').css({
            color: '#ef4562'
        });
        
        //点击高亮
    
        let currentsSpan = $('.list_tab span')
        $('.list_tab').on('click', 'span',function(){
                currentsSpan.css({
                    color: '#3e3e3e'
                })
                $('.out').css({
                    color: '#3e3e3e'
                })
                $('.up').css({
                    color: '#3e3e3e'
                })
                this.style.color='#ef4562'
                // console.log(this.innerText)
                // console.log(this)
                if(this.innerText == '价格'){
                    $('.out').css({
                        color: '#ef4562'
                    })
                    $('.price').css({
                        color: '#ef4562'
                    })
                    $('.up').css({
                        color: '#ef4562'
                    })
                }
            
        })

        
    }
    getArr(){

    }
                
    selectSt(smalltype){
            this.listSmalltype = smalltype;
            this.http.get("smallType1",{'type':this.type,'smalltype':this.listSmalltype}).then((res)=>{
                this.listdata = res['data'];
                // console.log('listdata',this.listdata);
            })
            let currentsSpan = $('.list_tab span')
            currentsSpan.css({
                color: '#3e3e3e'
            })
            $('.popular').css({
                color: '#ef4562'
            });
            $('.out').css({
                color: '#3e3e3e'
            })
            $('.up').css({
                color: '#3e3e3e'
            })
    }
    popular(){
        if(this.type == '卫衣'){
            // console.log(this.type)
            this.http.get("smallType1",{'type':this.type}).then((res)=>{
                // console.log(res)
                this.listdata = res['data'];
                // console.log(this.listdata,'111')
            })
        } else if(this.type == '气质毛衣'){
            // console.log(this.type)
            this.http.get("smallType1",{'type':this.type}).then((res)=>{
                // console.log(res)
                this.listdata = res['data'];
                // console.log(this.listdata,'111')
            })
        } else if(this.type == 'T恤'){
            // console.log(this.type)
            this.http.get("smallType1",{'type':this.type}).then((res)=>{
                // console.log(res)
                this.listdata = res['data'];
                // console.log(this.listdata,'111')
            })
        } else if(this.type == '连衣裙'){
            // console.log(this.type)
            this.http.get("smallType1",{'type':this.type}).then((res)=>{
                // console.log(res)
                this.listdata = res['data'];
                // console.log(this.listdata,'111')
            })
        }
        else{
            this.http.get("smallType1",{'type':this.type,'smalltype':this.listSmalltype || this.smalltypeArr[0]}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        }
        
    }
    hotSale(){
        if(this.type == '卫衣'){
            this.http.get("smallTypeSaleqty",{'type':this.type,}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        } else if(this.type == '气质毛衣'){
            this.http.get("smallTypeSaleqty",{'type':this.type,}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        }  else if(this.type == 'T恤'){
            this.http.get("smallTypeSaleqty",{'type':this.type,}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        } else if(this.type == '连衣裙'){
            this.http.get("smallTypeSaleqty",{'type':this.type,}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        }
        else {
            this.http.get("smallTypeSaleqty",{'type':this.type,'smalltype':this.listSmalltype || this.smalltypeArr[0]}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        }
        
        
    }
    newTime(){
        if(this.type == '卫衣'){
            this.http.get("smallTypeNewTime",{'type':this.type}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        } else if(this.type == '气质毛衣'){
            this.http.get("smallTypeNewTime",{'type':this.type}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        } else if(this.type == 'T恤'){
            this.http.get("smallTypeNewTime",{'type':this.type}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        }else if(this.type == '连衣裙'){
            this.http.get("smallTypeNewTime",{'type':this.type}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        }
        else{
            this.http.get("smallTypeNewTime",{'type':this.type,'smalltype':this.listSmalltype || this.smalltypeArr[0]}).then((res)=>{
                this.listdata = res['data'];
                // console.log(this)
            })
        }
        
    }
    price(parmas){
        // console.log(parmas)
        
        if(parmas == 'out'){
            $('.out').css({
                display: 'none'
            })
            $('.up').css({
                display: 'block',
                color: '#ef4562'
            })
            if(this.type == '卫衣'){
                this.http.get("smallTypePrice",{'type':this.type}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
            } else if(this.type == '气质毛衣'){
                this.http.get("smallTypePrice",{'type':this.type}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
            } else if(this.type == 'T恤'){
                this.http.get("smallTypePrice",{'type':this.type}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
            } else if(this.type == '连衣裙'){
                this.http.get("smallTypePrice",{'type':this.type}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
            }
            else {
                this.http.get("smallTypePrice",{'type':this.type,'smalltype':this.listSmalltype || this.smalltypeArr[0]}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
            }
            
        }
        if(parmas == 'up'){
            $('.out').css({
                display: 'block',
                color: '#ef4562'
            })
            $('.up').css({
                display: 'none'
            })
            if(this.type == '卫衣'){
                this.http.get("smallTypePriceDesc",{'type':this.type}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
            } else if(this.type == '气质毛衣'){
                this.http.get("smallTypePriceDesc",{'type':this.type}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
            } else if(this.type == 'T恤'){
                this.http.get("smallTypePriceDesc",{'type':this.type}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
            } else if(this.type == '连衣裙'){
                this.http.get("smallTypePriceDesc",{'type':this.type}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
            }
            else {
                this.http.get("smallTypePriceDesc",{'type':this.type,'smalltype':this.listSmalltype || this.smalltypeArr[0]}).then((res)=>{
                    this.listdata = res['data'];
                    // console.log(this)
                })
            }
        }
        
    }
    dimSearch(){
        this.router.navigate(['/meilissearch']);
    }
   

}
