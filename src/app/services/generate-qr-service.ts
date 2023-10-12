import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QrGenModel } from '../models/qrgen-model';

@Injectable({
  providedIn: 'root'
})
export class GenerateQRService {
  constructor(private http: HttpClient) {}

  GEN_API :string = "https://api-qrgen.shgonzals.es/generateQR";

//  GEN_API :string = "http:10.20.10.10:4000/generateQR";


  generarQR(data: QrGenModel) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
debugger;
    return this.http.post(this.GEN_API, JSON.stringify(data)    ,
    { headers, responseType: 'arraybuffer'});
  }
}
