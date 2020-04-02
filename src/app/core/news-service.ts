import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class NewsService {

    constructor(private http: HttpClient) { }

    getNews(): Observable<any> {
        return this.http.get('assets/files/news.json');
    }
}