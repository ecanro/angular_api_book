import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { map } from 'rxjs/operators';

import { BooksDictionary, Book, DocsServer, Resume, ResumeDictionary } from './types';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  //cacheamos los Books
  booksCache: BooksDictionary={};
  resumeCache: ResumeDictionary = {};
  
  constructor( private http: HttpClient) { }

  private _adaptBookFromServe( data:any ): Book {
    return {
      id: data.id ,
      title: data.title,
      author: data.author_name,
    }
  }

  private _adaptResumeFromServe(data: any): Resume {
      return {
        info: data.info_url,
    //some books not have cover, maybe a conditional?
        cover: data.details['cover'],
        title: data.details['title'],
    // if description is type string catch else catch value objet, else  show text
        resume:
          typeof(data.details.description) == 'string' ? data.details.description :
          typeof(data.details.description) == 'object' ? data.details.description.value :
            'Resume unavailable'
    }
  }

  private _adaptBooksFromServe(data: DocsServer): Book[] {
    return data.docs.map<Book>(serverBook => this._adaptBookFromServe(serverBook));
  }

  getBooks(): Observable<BooksDictionary> {
    if ((this.booksCache === {})) {
      return of(this.booksCache);
    }

    return this.http.get('https://the-books.goncalomatos2.repl.co/search?author=tolkien').pipe(
      map<any, BooksDictionary>(data => {
        const booksList = this._adaptBooksFromServe(data);
        this.booksCache = Object.fromEntries(
          booksList.map(book => [book.id, book])
        );
        return this.booksCache;
      })
    );
  }

  getBook(id: any): Observable<Book> {
    if (this.booksCache[id]) {
      
      return of(this.booksCache[id]);
    }
    
      return this.http.get(`https://the-books.goncalomatos2.repl.co/books?id=${id}`).pipe(
      map<any, Book>(book => this._adaptBookFromServe(book)),
      );
   
  }

  getResume(id: any): Observable<Resume>{
    if (this.resumeCache[id]) {
      
      return of(this.resumeCache[id]);
    }
    
    return this.http.get(`https://the-books.goncalomatos2.repl.co/books?id=${id}`).pipe(
      
      map<any, Resume>(resume => this._adaptResumeFromServe(resume)),    
      
    );
  }
}
      
      
        



