import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ICustomer, allCustomer } from '../../models/Customer';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { UITablePaginationStatus } from '../../models/table.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NotFoundComponent, CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  @Input() customers: allCustomer = [];
  @Input() theaders: TemplateRef<any> | null = null;
  @Input() tbody: TemplateRef<any> | null = null;
  @Input() customerTransactionAmount: { [key: string]: number } = {};
  @Input() pageSize = 5;
  @Input() pagination = false;
  @Input() search = false;

  @Output() selectCustomer = new EventEmitter<string>();

  totalRecords = 0;
  paginationStatus: UITablePaginationStatus = {
    page: 1,
    pageSize: this.pageSize,
    totalPages: 0,
  };
  tableData: allCustomer = [];
  searchTerm = '';

  ngOnChanges(): void {
    this.initialPagenation();
  }

  initialPagenation() {
    this.totalRecords = this.customers.length;
    this.paginationStatus = {
      ...this.paginationStatus,
      totalPages: Math.ceil(this.totalRecords / this.paginationStatus.pageSize),
    };
    this.refreshTable();
  }

  refreshTable() {
    let data = this.customers;

    // Apply search filter to the entire customers list
    if (this.searchTerm !== '') {
      data = this.customers.filter((item) => this.matches(item));
      this.paginationStatus.page = 1; //Reset to avoid pagination issues
    }

    // Update total records and total pages based on filtered data
    this.totalRecords = data.length;

    this.paginationStatus.totalPages = Math.ceil(
      this.totalRecords / this.paginationStatus.pageSize
    );

    // Apply pagination to the filtered data
    this.tableData = data.slice(
      (this.paginationStatus.page - 1) * this.paginationStatus.pageSize,
      (this.paginationStatus.page - 1) * this.paginationStatus.pageSize +
        this.paginationStatus.pageSize
    );

    // Check if tableData is empty to handle no results found case
    if (this.tableData.length === 0 && this.searchTerm !== '') {
      this.tableData = [];
    }
  }

  matches(data: ICustomer): boolean {
    const amount = this.customerTransactionAmount[data.id] || 0;

    return (
      data.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      amount.toString().includes(this.searchTerm)
    );
  }
  changePage(page: number) {
    this.paginationStatus = {
      ...this.paginationStatus,
      page: page,
    };
    this.refreshTable();
  }
}
