import { NavigationExtras } from '@angular/router';

export interface RouterUri {
  path: any[];
  queryParams?: object;
  extras?: NavigationExtras;
}
