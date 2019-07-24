import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { Global } from './global';

@Injectable()

export class ContactService {
    
    public url: string;
    
	constructor(
        private http: HttpClient
    ) { 
        this.url = Global.url;
    }

	sendMail(contact: Contact): Observable<object> {
		
        let params = JSON.stringify(contact); 
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        
		return this.http.post(this.url + 'send-email', params, { headers: headers });
	}
}
