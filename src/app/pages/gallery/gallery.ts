import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-gallery',
  imports: [MatCardModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {}
