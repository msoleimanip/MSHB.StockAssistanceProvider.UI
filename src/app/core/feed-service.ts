import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FeedService {

    // private rssToJsonServiceBaseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.boursenews.ir%2Ffa%2Frss%2F14';    

    constructor(private http: HttpClient
    ) { }

    getFeedContent(): Observable<any> {
        return this.http.get('assets/files/rss.json');
    }
}