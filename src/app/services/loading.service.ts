import {Injectable} from '@angular/core';
import {BehaviorSubject, defer, Observable, ObservableInput} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  constructor() {
  }

  show = () => this._loading.next(true);

  hide = () => this._loading.next(false);

  defer = (next: Observable<any>): Observable<any> => {
    return defer((): ObservableInput<any> => {
      this.show();
      return next;
    });
  }
}
