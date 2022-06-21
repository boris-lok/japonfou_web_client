import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, ReplaySubject} from "rxjs";
import {IUser} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private defaultUser: IUser = {} as IUser;

  private currentUserSubject = new BehaviorSubject<IUser>(this.defaultUser);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged())

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor() {
  }

  setAuth = (user: IUser) => {
    this.currentUserSubject.next(user)
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth = () => {
    this.currentUserSubject.next(this.defaultUser);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser = () => this.currentUserSubject.value;
}
