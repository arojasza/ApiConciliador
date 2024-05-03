import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomBreadcrumbService {
  private _items: MenuItem[] = [
    { label: ' Home', routerLink: '/home', icon: '' },
  ];
  private _breadcrumbBehaviorSubject!: BehaviorSubject<MenuItem[]>;

  constructor() {
    this._breadcrumbBehaviorSubject = new BehaviorSubject(this._items);
  }

  public GetBreadcrumb(): Observable<MenuItem[]> {
    return this._breadcrumbBehaviorSubject.asObservable().pipe(share());
  }

  public AddBreadcrumb(item: MenuItem) {
    let index = this._items.findIndex((i) => i.label == item.label);    
    if (index == -1) {
      this._items.push(item);
      this._breadcrumbBehaviorSubject.next(this._items || []);
    }
  }

  public RemoveLastBreadcrumb() {
    this._items.pop();
    this._breadcrumbBehaviorSubject.next(this._items || []);
  }

  public Reset() {    
    this._items = [this._items[0]];
    this._breadcrumbBehaviorSubject.next(this._items || []);

  }
}
