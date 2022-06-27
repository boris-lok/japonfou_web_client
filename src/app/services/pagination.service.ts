import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private _page = new BehaviorSubject<number>(0);
  public readonly page$ = this._page.asObservable();
  public readonly page_size: number = 20;

  constructor() {
  }

  next = () => {
    const new_value = this._page.value + 1;
    this._page.next(new_value);
  };

  previous = () => {
    const new_value = this._page.value - 1
    this._page.next(new_value >= 0 ? new_value : 0);
  }

  getPage = () => this._page.value;
}

