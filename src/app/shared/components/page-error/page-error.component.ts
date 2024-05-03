import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html'
})
export class PageErrorComponent {
  codeError: string;
  isAuth: boolean = false
  constructor(private location: Location, readonly route: ActivatedRoute, private router: Router) {
    this.codeError = this.route.snapshot.paramMap.get('codeError') || '401';
  }
  /**
   * Metodo encargado de Redireccionar a la pagnia principal 
   */
  navigateToInit() {
    this.router.navigate(['/']);
  }

  /**
   * Metodo encargado de Redireccionar a la pagnia anterior 
   */
  onRedirect() {
    this.location.back();
  }
}
