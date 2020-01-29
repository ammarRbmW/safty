import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StatisticApi} from '../../../core/_api/statistic.api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  statistics = {
    users: 0,
    orders: 0,
    products: 0,
    articles: 0,
    categories: 0,
  };

  constructor(public statisticApi: StatisticApi) {
    this.statisticApi.get().subscribe((data: any) => {
        const arr = ['products', 'users', 'orders', 'articles', 'categories'];

        arr.forEach((val, index) => {
          if (typeof data[val][0] === 'undefined') {
            // does not exist
            this.statistics[val] = 0;
          } else {
            console.log(data[val][0].count);
            // does exist
            this.statistics[val] = data[val][0].count;
          }
        });

      }
    );
  }

  ngAfterViewInit() {

  }
}
