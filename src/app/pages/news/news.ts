import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-news',
  imports: [MatCardModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {}
