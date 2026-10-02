import { Routes } from '@angular/router';
import { Heroes } from './core/heroes/heroes';
import { Dashboard } from './core/heroes/dashboard';
import { HeroDetail } from './core/heroes/hero-detail';

export const routes: Routes = [
    { path: 'heroes', component: Heroes },
    { path: 'dashboard', component: Dashboard },
    { path: 'detail/:id', component: HeroDetail },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];