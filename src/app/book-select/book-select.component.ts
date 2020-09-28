import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';
import { Book } from '../types';


@Component({
  selector: 'app-book-select',
  templateUrl: './book-select.component.html',
  styleUrls: ['./book-select.component.css']
})
export class BookSelectComponent implements OnInit {
  @Input() selected: Book;
  title: string;
  author: string[];
  info: string;
  description: string;
  cover: string;
  resume:string;

  constructor(
    private api:  ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    console.log('books select!');
    this.route.paramMap.subscribe(params => {
      const id= params.get('id');
      this.api.getBook(id).subscribe(book => {
      this.author = book.author;
      this.api.getResume(id). subscribe(resume =>{
        this.title = resume.title;
        this.cover = resume.cover;
        this.resume = resume.resume;

       console.log(this.resume)

        });
      });
    });


   
      
      
      


  }

}
