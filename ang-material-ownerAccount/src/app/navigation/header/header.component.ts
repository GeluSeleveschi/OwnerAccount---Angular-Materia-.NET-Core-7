import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToogle = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onToogleSidenav = () => {
    this.sidenavToogle.emit();
  }

  
}
