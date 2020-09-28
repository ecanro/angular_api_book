//componentes de angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importando mis componentes
import { BookSelectComponent } from './book-select/book-select.component';
import { BookListComponent } from './book-list/book-list.component';
import { BooksComponent } from './books/books.component';

//mis rutas
const routes: Routes = [
  { path: 'books/:id', component: BooksComponent},
  { path: 'home', component: BooksComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
