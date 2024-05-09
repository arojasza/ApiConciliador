/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";

import { PageErrorComponent } from "./page-error.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("PageErrorComponent", () => {
  let component: PageErrorComponent;
  let fixture: ComponentFixture<PageErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageErrorComponent],
       imports: [ RouterTestingModule.withRoutes([]),
      TranslateModule.forRoot(),
      HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
