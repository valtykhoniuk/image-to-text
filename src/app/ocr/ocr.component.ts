import { Component } from '@angular/core';
import { allowedTypes, maxSizeBytes } from '../constants';

@Component({
  selector: 'app-ocr-component',
  imports: [],
  templateUrl: './ocr.component.html',
  styleUrl: './ocr.component.css',
})
export class OcrComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  errorMessage: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.selectedFile = null;
    this.previewUrl = null;
    this.errorMessage = null;

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Only JPEG and PNG images are allowed.';
      input.value = '';
      return;
    }

    if (file.size > maxSizeBytes) {
      this.errorMessage = 'File must be 2 MB or smaller.';
      input.value = '';
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
