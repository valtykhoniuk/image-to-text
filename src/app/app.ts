import { Component } from '@angular/core';
import { OcrComponent } from './ocr/ocr.component';

@Component({
  selector: 'app-root',
  imports: [OcrComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
