import { Emails } from  './emails.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';





@Injectable()
export class EmailService {

    private emails: Emails[] = [];

    constructor(private http: HttpClient ) {} 

    addEmails(name: string, address: string, email: string, messages: string, image: File) {
        const emailData = new FormData();
        emailData.append("name", name);
        emailData.append("address", address);
        emailData.append("email", email);
        emailData.append("messages", messages);
        emailData.append('image', image, name);

      
        this.http.post<{emails: Emails}>('http://localhost:3001/api/emails', emailData).subscribe();

    }


}