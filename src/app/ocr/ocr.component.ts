import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { allowedTypes, maxSizeBytes } from '../constants';
import { OcrService } from './ocr';

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
  extractedText: string | null = null;
  isLoading = false;
  copyLabel = 'Copy';

  private readonly ocrService = inject(OcrService);
  private readonly cdr = inject(ChangeDetectorRef);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.selectedFile = null;
    this.previewUrl = null;
    this.errorMessage = null;
    this.extractedText = null;

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
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }

  extractText() {
    if (!this.selectedFile) {
      return;
    }

    this.isLoading = true;
    this.extractedText = null;
    this.errorMessage = null;

    this.ocrService.extractText(this.selectedFile).subscribe({
      next: (items) => {
        if (!Array.isArray(items)) {
          this.errorMessage = 'Could not extract text. Please try again.';
          this.isLoading = false;
          this.cdr.markForCheck();
          return;
        }

        const text = items
          .map((item) => item.text)
          .join(' ')
          .trim();
        this.extractedText = text || 'No text found in this image.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err: HttpErrorResponse) => {
        const apiError = err.error?.error;
        this.errorMessage =
          typeof apiError === 'string'
            ? apiError
            : 'Could not extract text. Please try again.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  copyText(): void {
    if (!this.extractedText) {
      return;
    }

    navigator.clipboard.writeText(this.extractedText).then(() => {
      this.copyLabel = 'Copied';
      this.cdr.markForCheck();

      setTimeout(() => {
        this.copyLabel = 'Copy';
        this.cdr.markForCheck();
      }, 2000);
    });
  }
}
