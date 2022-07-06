import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from "../../../models/product.class";
import {finalize, first, Subject, takeUntil, tap} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {LoadingService} from "../../../services/loading.service";
import {ProductService} from "../../../services/product.service";
import {environment} from "../../../../environments/environment";
import {currencies} from "../../../constants/currency";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  defaultProduct: IProduct = {} as IProduct;
  product: IProduct = this.defaultProduct;

  ngDestroy$: Subject<any> = new Subject<any>();

  productForm: FormGroup;

  isEdit: boolean = false;
  isSubmitted: boolean = false;

  errorMessage: string | null = null;
  currencies = currencies;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    public loading: LoadingService,
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      currency: ['', [Validators.required, this.currencyValidator()]],
      price: ['', [Validators.required, Validators.pattern(environment.pricePattern)]]
    })
  }

  ngOnInit(): void {
    this.activatedRoute
      .queryParams
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(params => {
        const id = params["id"]
        if (id !== null && !Number.isNaN(Number(id))) {
          this.isEdit = true;
          // Call api to fetch the newest product first.
          this.fetchProduct(id);
          console.log(id);
        }
      });
    console.log(`${JSON.stringify(this.loading.loading$)}`);
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }

  fetchProduct = (id: number) => {
    this.loading
      .defer(this.productService
        .get(id)
        .pipe(
          takeUntil(this.ngDestroy$),
          finalize(this.loading.hide)
        )
      ).subscribe({
      next: (value) => {
        this.productForm.patchValue(value);
        this.update(value);
      },
      error: (e) => {
        this.errorMessage = `Can't fetch product, and the reason is: ${e.toString()}`;
        console.error(e)
      }
    })
  }

  update = (value: Object) => Object.assign(this.product, value);

  submit = () => {
    this.errorMessage = null;
    this.isSubmitted = true;

    this.update({
      ...this.product,
      ...this.productForm.value,
    });

    this.loading
      .defer(this.productService
        .save(this.product)
        .pipe(
          takeUntil(this.ngDestroy$),
          finalize(this.loading.hide),
        )
      )
      .subscribe({
        next: (value) => {
          console.log(`create a product success.`)
        },
        error: (e) => {
          this.errorMessage = `Can't create/update product, and the reason is: ${e.message}`;
          console.error(e)
        }
      });

  }
  cancel = () => this.location.back();

  currencyValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const currencies = new Set(this.currencies.map(e => e.id));
      return currencies.has(value) ? null : {invalidCurrency: true}
    }
  }
}
