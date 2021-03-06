import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ICustomer} from "../../../models/customer.class";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {CustomerService} from "../../../services/customer.service";
import {defer, finalize, ObservableInput, Subject, takeUntil, tap} from "rxjs";
import {Location} from "@angular/common";
import {LoadingService} from "../../../services/loading.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy {
  defaultCustomer: ICustomer = {} as ICustomer;
  customer: ICustomer = this.defaultCustomer;

  ngDestroy$: Subject<any> = new Subject<any>();

  customerForm: FormGroup;

  isEdit: boolean = false;
  isSubmitted: boolean = false;

  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location,
    public loading: LoadingService,
  ) {
    // use FormBuilder to build the form.
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
      phone: [''],
    });

    this.customerForm.get('email')?.valueChanges?.subscribe(val => {
      let controller = this.customerForm.get('email');
      let email = val.trim();
      if (email === '') {
        controller?.clearValidators();
        controller?.updateValueAndValidity({emitEvent: false});
      } else {
        controller?.setValidators([
          Validators.required,
          Validators.pattern(environment.emailPattern)
        ])
      }
    });

    this.customerForm.get('phone')?.valueChanges.subscribe(val => {
      let controller = this.customerForm.get('phone');
      let phone = val.trim();
      if (phone === '') {
        controller?.clearValidators();
        controller?.updateValueAndValidity({emitEvent: false});
      } else {
        controller?.setValidators([
          Validators.required,
          Validators.pattern(environment.phonePattern)
        ])
      }
    })
  }

  ngOnInit(): void {
    this.route
      .queryParams
      .pipe(
        takeUntil(this.ngDestroy$),
      )
      .subscribe(params => {
        const id = params["id"];
        if (id !== null && !Number.isNaN(Number(id))) {
          this.isEdit = true;
          // Call api to fetch the newest customer first.
          this.fetchCustomer(id)
          console.log(id);
        }
      });
    console.log(`${JSON.stringify(this.loading.loading$)}`);
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }

  fetchCustomer = (id: number) => {
    this.loading
      .defer(this.customerService
        .get(id)
        .pipe(
          takeUntil(this.ngDestroy$),
          finalize(this.loading.hide)
        )
      )
      .subscribe({
        next: (value) => {
          this.customerForm.patchValue(value);
          this.update(value);
        },
        error: (e) => {
          this.errorMessage = `Can't fetch customer, and the reason is: ${e.toString()}`;
          console.error(e)
        },
      })
  }

  update = (value: Object) => Object.assign(this.customer, value)

  submit = () => {
    this.errorMessage = null;
    this.isSubmitted = true;

    this.update({
      ...this.customer,
      ...this.customerForm.value
    });

    this.loading.defer(
      this.customerService
        .save(this.customer)
        .pipe(
          takeUntil(this.ngDestroy$),
          finalize(this.loading.hide)
        )
    )
      .subscribe({
        next: (value) => console.info(`create customer success.`),
        error: (e) => {
          this.errorMessage = `Can't create/update customer, and the reason is: ${e.message}`;
          console.error(e)
        }
      })
  }

  cancel = () => this.location.back();
}
