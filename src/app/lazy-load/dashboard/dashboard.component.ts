import { NewsService } from './../../core/news-service';
import { FeedViewModel } from './../../dataModels/viewModels/feedViewModel';
import { FeedService } from '../../core/feed-service';
import { Component, OnInit } from '@angular/core';
import { NewsViewModel } from 'src/app/dataModels/viewModels/newViewModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  images = [
    '/assets/images/dashboard/dash1.jpg',
    '/assets/images/dashboard/dash2.jpg'];

  rssNews = new FeedViewModel();
  news = new Array<NewsViewModel>();

  constructor(private feedService: FeedService, private newsService: NewsService) {
  }

  ngOnInit() {
    this.loadRss();
    this.loadNews();
  }

  loadRss() {
    this.feedService.getFeedContent().subscribe((res: FeedViewModel) => {
      this.rssNews = res;
    });
  }

  loadNews() {
    this.newsService.getNews().subscribe((res: Array<NewsViewModel>) => {
      this.news = res;
    });
  }
}



