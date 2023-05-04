import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _currentRoute: string = "";
  public currentRoute: Subject<string> = new Subject<string>();

  constructor() { }

  public scrollTo(target: HTMLElement | string): void {
    let element: HTMLElement | null = typeof target === 'string' ?
      document.getElementById(target) : target;

    if (!element) return;
    else element.scrollIntoView({ behavior: 'smooth' });
  }

  public setCurrentRoute(string: string) {
    this._currentRoute = string;
    this.currentRoute.next(string);
  }

  public getCurrentRoute(): string {
    return this._currentRoute;
  }
}
