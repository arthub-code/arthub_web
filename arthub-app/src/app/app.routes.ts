import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageListingComponent } from './pages/page-listing/page-listing.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'listagens', component: PageListingComponent }
];
