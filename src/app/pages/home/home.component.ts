import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { allCustomer } from '../../models/Customer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  allCustomers: allCustomer = [];
  constructor(private _customer: CustomersService) {}
  ngOnInit(): void {
    this.fetchAllCustomers();
  }

  fetchAllCustomers() {
    this._customer.getAllCustomers().subscribe({
      next: (data) => {
        this.allCustomers = data;
        console.log(this.allCustomers);
      },
      error: () => {
        console.log('Error, fail to featch customers');
      },
      complete: () => {},
    });
  }
}
