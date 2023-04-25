import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpInterceptorService } from './auth/http-interceptor.service';
import { AdminAuthGuard } from './auth/admin-auth.guard';

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
        canActivate: [AdminAuthGuard]
    },
    {
        path: '',
        loadChildren: () => import('../public/public.module').then(m => m.PublicModule)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        HttpInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ]
})
export class CoreRoutingModule { }