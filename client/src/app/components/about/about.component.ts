import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public title: String;
  public subtitle: String;
  public email: String;
    
  constructor() { }

  ngOnInit() {
      this.title = "Guillermo Angulo";
      this.subtitle = "Portafolio Angular JS";
      this.email = "anyermo@gmail.com";
  }

}
