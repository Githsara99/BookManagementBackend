import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookcrud',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add CommonModule and FormsModule
  templateUrl: './bookcrud.component.html',
  styleUrls: ['./bookcrud.component.scss']
})
export class BookcrudComponent {
  BookArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  title: string = "";
  author: string = "";
  isbn: string = "";
  publicationDate: string = "";

  currentBookID = "";

  constructor(private http: HttpClient) {
    this.getAllBooks();
  }

  ngOnInit(): void {}

  getAllBooks() {
    this.http.get("https://localhost:7195/api/Book/GetBooks")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.BookArray = resultData;
      });
  }

  register() {
    let bodyData = {
      "title": this.title,
      "author": this.author,
      "isbn": this.isbn,
      "publicationDate": this.publicationDate
    };

    this.http.post("https://localhost:7195/api/Book/AddBook", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Book Registered Successfully");
      this.getAllBooks();
    });
  }

  setUpdate(data: any) {
    this.title = data.title;
    this.author = data.author;
    this.isbn = data.isbn;
    this.publicationDate = data.publicationDate;

    this.currentBookID = data.id;
  }

  UpdateRecords() {
    let bodyData = {
      "title": this.title,
      "author": this.author,
      "isbn": this.isbn,
      "publicationDate": this.publicationDate
    };

    this.http.patch("https://localhost:7195/api/Book/UpdateBook/" + this.currentBookID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Book Record Updated Successfully");
      this.getAllBooks();
    });
  }

  save() {
    if (this.currentBookID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    this.http.delete("https://localhost:7195/api/Book/DeleteBook/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Book Deleted Successfully");
      this.getAllBooks();
    });
  }
}
