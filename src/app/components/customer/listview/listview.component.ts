import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {LoadingService} from "../../../services/loading.service";
import {finalize, Subject, takeUntil} from "rxjs";
import {ICustomer} from "../../../models/customer.class";
import {PaginationService} from "../../../services/pagination.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListviewComponent implements OnInit, OnDestroy {
  ngDestroy$: Subject<any>;
  customers: MatTableDataSource<ICustomer>;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
  paginationThreshold: number = 50;

  constructor(
    private customerService: CustomerService,
    public loading: LoadingService,
    public paginationService: PaginationService,
  ) {
    this.ngDestroy$ = new Subject<any>();
    this.customers = new MatTableDataSource<ICustomer>([]);
  }

  ngOnInit(): void {
    this.paginationService
      .page$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe({
        next: (v) => {
          this.fetchCustomers();
        },
      })
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true)
    this.ngDestroy$.complete();
  }

  fetchCustomers = () => {
    this.loading.show();
    this.customerService
      .getAllCustomers(null, this.paginationService.getPage(), this.paginationService.page_size)
      .pipe(
        takeUntil(this.ngDestroy$),
        finalize(this.loading.hide)
      )
      .subscribe({
        next: (data) => {
          this.customers.data = [...this.customers.data, ...data];
        },
        error: (e) => {
          console.error(e);
        }
      })
  }

  onTableScroll = (e: any) => {
    const containerHeight = e.target.offsetHeight;
    const tableScrollHeight = e.target.scrollHeight;
    const scrollOffset = e.target.scrollTop;

    const limit = tableScrollHeight - containerHeight - this.paginationThreshold;

    if (scrollOffset > limit) {
      console.log(`load more data`);
      this.paginationService.next();
    }
  }
}
