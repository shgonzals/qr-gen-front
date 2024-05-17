import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QrGenModel } from '../models/qrgen-model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateQRService {
  constructor(private http: HttpClient, private loggerService: LoggerService) {}

  GEN_API :string = "https://qrgen.shgonzals.es/api/generateQR";

  generarQR(data: QrGenModel) {
    this.loggerService.emit('Generate QR');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(this.GEN_API, data, { headers,  responseType: 'arraybuffer' });
  }
}
