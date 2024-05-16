import { Component } from '@angular/core';
import { Breadcrumb } from './breadcrumb.object';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  public breadcrumbs: Breadcrumb[] = [];

  constructor(
    readonly router: Router,
    readonly route: ActivatedRoute,
    readonly translate: TranslateService
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.breadcrumbs = [];

        const root: ActivatedRoute = this.route.root;
        this.getBreadcrumbs(root);
      });
  }

  private pushBreadcrumb(item?: Breadcrumb) {
    this.translate
      .get(item?.label?.startsWith('Menu') ? item.label : `${item?.label}.Breadcrumb`)
      .subscribe((res: string) => {
        this.breadcrumbs.push({
          label: res,
          url: item?.url,
        });
      });
  }

  private getBreadcrumbs(route: ActivatedRoute, url = '') {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length === 0) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        this.getBreadcrumbs(child);
      }

      const routeURL = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      url += `/${routeURL}`;
      let breadcrumb: Breadcrumb;

      if (!child.snapshot.paramMap.get('id')) {
        breadcrumb = {
          label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
          url
        };
      } else {
        breadcrumb = {
          label: child.snapshot.paramMap.get('id'),
          url
        };
      }

      this.pushBreadcrumb(breadcrumb);

      this.getBreadcrumbs(child, url);
    }
  }
  redirect(url: string) {
    this.router.navigate([url]);
  }
}
