import {Directive, EventEmitter, HostListener, OnDestroy, Output} from '@angular/core';
import {debounceTime, distinct, Subject, takeUntil, throttle, throttleTime, timeout} from "rxjs";

@Directive({
  selector: '[appScrollStart]'
})
export class ScrollStartDirective implements OnDestroy {
  private source = new Subject<any>();
  private ngDestroy$ = new Subject<void>();

  @Output()
  scrollCallback = new EventEmitter();

  constructor() {
    this.source
      .pipe(
        debounceTime(200),
        takeUntil(this.ngDestroy$)
      )
      .subscribe(this.scrollCallback)
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  @HostListener('scroll', ['$event'])
  private onScroll = (event: any) => {
    this.source.next(event);
  }
}
