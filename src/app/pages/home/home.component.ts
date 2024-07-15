import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { allCustomer, IChartData } from '../../models/Customer';
import { TableComponent } from '../../widgets/table/table.component';
import { CommonModule } from '@angular/common';
import { TransactionsService } from '../../services/transactions.service';
import { allTransaction } from '../../models/Transaction';
import { forkJoin } from 'rxjs';
import { TransChartComponent } from '../../widgets/trans-chart/trans-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, CommonModule, TransChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  allCustomers: allCustomer = [];
  allTransaction: allTransaction = [];

  filteredCustomers: allCustomer = [];
  OneCustomerTransaction: { date: string; amount: number }[] = [];

  customerTransactionAmout: { [key: string]: number } = {};

  constructor(
    private _customer: CustomersService,
    private _trans: TransactionsService
  ) {}
  ngOnInit(): void {
    this.fetchAllDataAndCalculate();
  }

  fetchAllDataAndCalculate() {
    forkJoin({
      customers: this._customer.getAllCustomers(),
      transactions: this._trans.getAllTransactions(),
    }).subscribe({
      next: ({ customers, transactions }) => {
        this.allCustomers = customers;
        this.filteredCustomers = customers;
        this.allTransaction = transactions;
        this.calcTransactionAmount();
      },
      error: () => {
        console.log('Error, failed to fetch data');
      },
    });
  }

  calcTransactionAmount(): void {
    this.customerTransactionAmout = this.allCustomers.reduce(
      (acc, customer) => {
        const totalAmount = this.allTransaction
          .filter((transaction) => transaction.customer_id === +customer.id)
          .reduce((sum, transaction) => sum + transaction.amount, 0);
        acc[customer.id] = totalAmount;
        return acc;
      },
      {} as { [key: string]: number }
    );
  }

  getCustomerTransactions(customerId: number) {
    return this.allTransaction
      .filter((transaction) => transaction.customer_id === +customerId)
      .map((transaction) => ({
        date: transaction.date,
        amount: transaction.amount,
      }));
  }

  onViewCustomer(customerId: number) {
    this.OneCustomerTransaction = this.getCustomerTransactions(customerId);
  }
}
