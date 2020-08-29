import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TagSearchCatalogService
{
    httpAuthAttr;
    tokenValue: string;
    baseURL: string;

    constructor(private cookieservice: CookieService,
                @Inject('BASE_URL') baseUrl: string, 
                private http: HttpClient)
    {
        this.baseURL = baseUrl;
        this.tokenValue = this.cookieservice.get('token');

        this.httpAuthAttr = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + this.tokenValue
            })
        };
    }

    getTagPostsRange(name: string, from: number, to: number)
    {
        return this.http.get(this.baseURL + 'api/tag/' + name + '/posts/' + from + '-' + to, this.httpAuthAttr);
    }

    getPostPhoto(id: number)
    {
        return this.http.get(this.baseURL + 'api/posts/' + id + '/photo', this.httpAuthAttr);
    }
}