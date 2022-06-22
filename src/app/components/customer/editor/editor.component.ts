import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ICustomer} from "../../../models/customer.class";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {CustomerService} from "../../../services/customer.service";
import {finalize} from "rxjs";
import {Location} from "@angular/common";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
  defaultCustomer: ICustomer = {} as ICustomer;
  customer: ICustomer = this.defaultCustomer;

  customerForm: FormGroup;

  isEdit: boolean = false;
  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location,
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
      .subscribe(params => {
        const id = params["id"];
        if (id !== null && !Number.isNaN(Number(id))) {
          this.isEdit = true;
          // Call api to fetch the newest customer first.
          this.fetchCustomer(id)
          console.log(id);
        }
      });
  }

  fetchCustomer = (id: number) => {
    this.isLoading = true;
    this.customerService
      .get(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (value) => {
          this.customerForm.patchValue(value);
          this.update(value);
        },
        error: (e) => console.error(e),
      })
  }

  update = (value: Object) => Object.assign(this.customer, value)

  submit = () => {
    this.isSubmitted = true;
    this.update({
      ...this.customer,
      ...this.customerForm.value
    });

    console.log(this.customer);

    this.customerService
      .save(this.customer)
      .subscribe({
        next: (value) => console.log(`create customer success.`),
        error: (e) => console.error(e)
      });

  }

  cancel = () => this.location.back();
}
