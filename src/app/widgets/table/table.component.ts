import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { allCustomer } from '../../models/Customer';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NotFoundComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() customers: allCustomer = [];
  @Input() theaders: TemplateRef<any> | null = null;
  @Input() tbody: TemplateRef<any> | null = null;
  @Input() customerTransactionAmounts: { [key: string]: number } = {};
  @Output() selectCustomer = new EventEmitter<string>();
}
