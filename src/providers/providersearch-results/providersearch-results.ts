import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProvidersearchResultsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvidersearchResultsProvider {

  constructor(public http: Http) {
    
  }
  searchRepo(data : any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get("https://api.github.com/search/repositories?q="+data.keyWord+"+language:"+data.lang).map(res => res.json())    

  }
  moreSearchRepo(id : any){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get("https://api.github.com/repositories/"+id).map(res => res.json())   
  }
  
  // getRequests(id){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   return this.http.get("http://constructionlkapi.azurewebsites.net/ServiceProvider/GetJobs").map(res => res.json())    

  // }

}
