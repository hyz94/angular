import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpclientService} from '../../server/httpclientserver.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    dataset: Array<any>;
    show1:Boolean = false;
    show2:Boolean = true;
    show3:Boolean = false;

    constructor(private http: HttpclientService,private router:Router) { }

    ngOnInit() {
        $('#ipt').focus();
    }

    getid(id: number){
        this.router.navigate(['/meilisdetail'],{queryParams: { id: id}});
    }

    hsearch($event){
        if($event.keyCode=='13'){
            this.show2=false;
            this.show3=true;

            let title:any = document.querySelector('#ipt');
            this.http.get('dimSearch',{name:title.value}).then((res) => {
                // console.log(res);
                if(res['data']){
                    this.show1=false;
                    if(res['data'].data.length>0){
                        this.dataset=res['data'].data;
                    }
                }else{
                    this.show1=true;
                    this.show2=false;
                    this.show3=false;
                }
            })
            title.value='';
            title.focus();

        }
    }

}
