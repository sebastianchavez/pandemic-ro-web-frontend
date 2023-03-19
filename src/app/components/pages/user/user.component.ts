import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/interfaces/news,inferface';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  idLog: string = 'UserComponent'
  news: INews[] = []

  constructor(
    private newsService: NewsService,
    private logger: LoggerService,
    ) {
    this.getNews()
   }

  ngOnInit(): void {
  }

  async getNews(){
    try {
      const query = '?limit=10&page=1'
      const response = await this.newsService.getNews(query)
      this.news = response.news
      this.logger.log(this.idLog, this.getNews.name, {info: 'Success', response})
    } catch (error) {
      this.logger.error(this.idLog, this.getNews.name, {info: 'Error', error})
    }
  }
}
