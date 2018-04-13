import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router} from '@angular/router';  
import { DOCUMENT } from '@angular/platform-browser';
import { HttpclientService} from '../../server/httpclientserver.service';

@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    dataset: Array<any>;

    constructor(private http: HttpclientService,private router:Router) { }

    ngOnInit() {

        this.http.get('products?popular=1').then((res)=>{
            this.dataset = res['data'];
        })
       
        $('.home_cont').scroll(function(){
            // console.log(111)
            // console.log($('.home_cont').scrollTop())
            // console.log($('.clothes ul').offset().top)
            if($('.home_cont').scrollTop() >= 1542.345){
                $('.clothes ul').addClass('fixed');
            }else{
                $('.clothes ul').removeClass('fixed');
            }
        })
    }

    liuxing($event){
        this.http.get('products?popular=1').then((res)=>{
            this.dataset = res['data'];
            // console.log(this.dataset);
        })
    }
    xinkuan($event){
        this.http.get('products?new=1').then((res)=>{
            this.dataset = res['data'];
            // console.log(this.dataset);
        })
    }
    jingxuan($event){{
        this.http.get('products?choiceness=1').then((res)=>{
           this.dataset = res['data'];
           // console.log(this.dataset);
        })
    }}

    getid(id: number){
        this.router.navigate(['/meilisdetail'],{queryParams: { id: id}});
    }

    tosearch(){
        // console.log(111)
        this.router.navigate(['/meilissearch']);
    }

    tochat(){
        this.router.navigate(['/chat']);
    }

}