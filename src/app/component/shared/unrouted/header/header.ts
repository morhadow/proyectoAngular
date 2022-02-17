import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
})
export class HeaderComponent implements OnInit {
  
  @Input() title: string = "Paquexprés";  
  @Input() subtitle: string = "Paquexprés";  
  @Input() filter: string = "";
  @Input() icon: string = "";
  @Input() iconEntity: string = "";
  
  constructor() { }

  ngOnInit() {
  }

}