import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../../common/order-history';
import { OrderHistoryService } from '../../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryList: OrderHistory[] = [];
  storage?: Storage =
    typeof window !== 'undefined' ? sessionStorage : undefined;

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    // read the user's email address from browser storage
    const userEmail = this.storage?.getItem('userEmail');
    if (userEmail) {
      const theEmail = JSON.parse(userEmail);

      // retrieve data from the service
      this.orderHistoryService.getOrderHistory(theEmail).subscribe((data) => {
        this.orderHistoryList = data._embedded.orders;
      });
    }
  }
}
