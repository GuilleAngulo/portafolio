import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { Global } from '../../services/global';
import { ContactService } from '../../services/contact.service';

import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
    
  public contact: Contact;
  loading = true;
    
  constructor(
    private _contactService: ContactService,
    private toastr: ToastrService
  ) { 
    this.contact = new Contact('','','','');
  }

  ngOnInit() {
      this.loading = false;
  }
    
    
   onSubmit(form){
        this.loading = true;   
       console.log(this.contact);
        this._contactService.sendMail(this.contact).subscribe(
            response => {
				this.contact = new Contact('','','','');
				this.loading = false;
				this.toastr.success('Mensaje enviado.');
            },
            error => {
				this.loading = false;                
				this.toastr.error('Oops, algo fue mal.');
                
            });
   }
}