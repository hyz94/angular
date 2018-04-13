import { Injectable } from '@angular/core';
import {Http, RequestMethod, RequestOptions} from '@angular/http';




@Injectable()
export class HttpclientService {
	baseurl: string = "http://10.3.136.55:8181/";
	constructor(private http: Http) { }
	
	filterurl(url){
		if(url.startsWith('http')){
			return url;
		}
		return this.baseurl + url;
	}

	get(url: string, params?: {}){
		return new Promise((reslove, reject) => {
			// this.http.get(this.filterurl(url)).subscribe()

			// this.http.get(this.filterurl(url)).toPromise().then().catch()

			//http://localhost:88/student?_0.15451515
			params = params || {};
			params["_"] = Math.random();
			this.http.request(this.filterurl(url), new RequestOptions({
				method: RequestMethod.Get,
				search: params
			})).toPromise().then((res) => {
				reslove(res.json());
			}).catch((error) => {
				reject(error);
			})
		})

		// $.get('http://localhost:88/a', {page: 1, limit: 10, _: Math.random()});
		// http://localhost:88/a?page=1&limit=10&_=03.5452
	}

    post(url: string, params?: {}){
        return new Promise((resolve, reject) => {

            params = params || {};
            params['_'] = Math.random();
            this.http.request(this.filterurl(url), new RequestOptions({
                method: RequestMethod.Post,
                body: params
               
            })).toPromise().then((res) => {
                // let _res = res.json();
                // if(!_res.status && _res.error == "unauthorized"){
                //     // this.router.navigate(['/login']);
                //     console.log(_res)
                         
                //     return false;
                // }
                resolve(res);
            }).catch((error) => {
                reject(error);
            });  
        })
    }
    // post(url:string,params?:object){
    //     params = params || {};
    //     const _params = new URLSearchParams();
    //     for(let attr in params){
    //         _params.set(attr,params[attr]);
    //     }
    //     const header: any = new Headers({
    //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //         Authorization: window.sessionStorage.getItem('xxtoken')
    //     });
    //     const options: any = new RequestOptions({headers: header});
    //     return new Promise((resolve,reject)=>{
    //         this.http.post(this.filterurl(url),_params,options).subscribe(res=>{
    //             // if(!res.json().status && res.json().message == "unauthorized"){
    //             //     this.router.navigate(['/login']);
    //             //     return false;
    //             // }
    //             resolve(res);
    //         },err=>{
    //             reject(err);
    //         })
    //     })
    // }
}
