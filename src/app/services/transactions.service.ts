import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { transactionsUrl } from '../constant/api-constant';
import { allTransaction } from '../models/Transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private _http: HttpClient) {}

  getAllTransactions(): Observable<allTransaction> {
    return this._http.get<allTransaction>(`${transactionsUrl}`);
  }
}
