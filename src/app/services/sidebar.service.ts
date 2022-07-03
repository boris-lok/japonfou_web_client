import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _show = new BehaviorSubject<boolean>(true);
  public readonly show$ = this._show.asObservable();

  constructor() { }

  showSidebar = () => this._show.next(true);

  hideSidebar = () => this._show.next(false);
}
