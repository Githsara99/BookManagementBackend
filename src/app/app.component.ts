import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookcrudComponent } from './bookcrud/bookcrud.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookcrudComponent, HttpClientModule], // Ensure HttpClientModule is included
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-Front-End';
}
