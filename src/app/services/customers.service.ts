import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl, customersUrl } from '../constant/api-constant';
import { Observable } from 'rxjs';
import { allCustomer } from '../models/Customer';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private _http: HttpClient) {}

  getAllCustomers(): Observable<allCustomer> {
    return this._http.get<allCustomer>(`${customersUrl}`);
  }
}
