import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OcrComponent } from './ocr/ocr.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OcrComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
