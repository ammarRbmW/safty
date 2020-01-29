import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FullComponent} from './views/layouts/full/full.component';
import {AppBlankComponent} from './views/layouts/blank/blank.component';
import {AfterLoginService} from './core/_guards/after-login.service';
import {BeforeLoginService} from './core/_guards/before-login.service';

// @ts-ignore
const routes: Routes = [
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  {
    path: '',
    component: AppBlankComponent,
    canActivate: [BeforeLoginService],
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./views/authentication/authentication.module').then(mod => mod.AuthenticationModule)
      }
    ]
  }, {
    path: '',
    component: FullComponent,
    canActivate: [AfterLoginService],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/pages/home/home.module').then(mod => mod.HomeModule)
      }, {
        path: 'categories',
        loadChildren: () => import('./views/pages/categories/categories.module').then(mod => mod.CategoriesModule)
      }, {
        path: 'products',
        loadChildren: () => import('./views/pages/products/products.module').then(mod => mod.ProductsModule)
      }, {
        path: 'attributes',
        loadChildren: () => import('./views/pages/attributes/attributes.module').then(mod => mod.AttributesModule)
      }, {
        path: 'colors',
        loadChildren: () => import('./views/pages/colors/colors.module').then(mod => mod.ColorsModule)
      }, {
        path: 'sizes',
        loadChildren: () => import('./views/pages/sizes/sizes.module').then(mod => mod.SizesModule)
      }, {
        path: 'brands',
        loadChildren: () => import('./views/pages/brands/brands.module').then(mod => mod.BrandsModule)
      }, {
        path: 'questions',
        loadChildren: () => import('./views/pages/questions/questions.module').then(mod => mod.QuestionsModule)
      }, {
        path: 'reviews',
        loadChildren: () => import('./views/pages/reviews/reviews.module').then(mod => mod.ReviewsModule)
      },
      {
        path: 'catalogs',
        loadChildren: () => import('./views/pages/catalogs/catalogs.module').then(mod => mod.CatalogsModule)
      }, {
        path: 'users',
        loadChildren: () => import('./views/pages/users/users.module').then(mod => mod.UsersModule)
      }, {
        path: 'pages',
        loadChildren: () => import('./views/pages/pages/pages.module').then(mod => mod.PagesModule)
      }, {
        path: 'sliders',
        loadChildren: () => import('./views/pages/sliders/sliders.module').then(mod => mod.SlidersModule)
      }, {
        path: 'shipping-zones',
        loadChildren: () => import('./views/pages/shipping-zones/shipping-zones.module').then(mod => mod.ShippingZonesModule)
      }, {
        path: 'coupons',
        loadChildren: () => import('./views/pages/coupons/coupons.module').then(mod => mod.CouponsModule)
      },
      {
        path: 'ads',
        loadChildren: () => import('./views/pages/ads/ads.module').then(mod => mod.AdsModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/pages/orders/orders.module').then(mod => mod.OrdersModule)
      },
      {
        path: 'currencies',
        loadChildren: () => import('./views/pages/currencies/currencies.module').then(mod => mod.CurrenciesModule)
      },


    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
