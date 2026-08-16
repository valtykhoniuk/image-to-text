import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcrItem } from './ocr.model';
import { apiUrl } from '../constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OcrService {
  private readonly http = inject(HttpClient);

  extractText(file: File): Observable<OcrItem[]> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<OcrItem[]>(apiUrl, formData, {
      headers: {
        'X-Api-Key': environment.apiNinjasKey,
      },
    });
  }
}
