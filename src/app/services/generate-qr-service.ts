import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QrGenModel } from '../models/qrgen-model';

@Injectable({
  providedIn: 'root'
})
export class GenerateQRService {
  constructor(private http: HttpClient) {}

  GEN_API :string = "https://api-qrgen.shgonzals.es/generateQR";

  generarQR(data: QrGenModel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(this.GEN_API, data, { headers,  responseType: 'arraybuffer' });
  }
}
