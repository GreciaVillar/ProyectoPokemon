import { CommonModule, NgForOf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() buttonClick = new EventEmitter<string>();
  menu = [
 { name: 'Ver todos', id: 'ver-todos' },
    { name: 'Black', id: 'black' },
    { name: 'Blue', id: 'blue' },
    { name: 'Brown', id: 'brown' },
    { name: 'Gray', id: 'gray' },
    { name: 'Green', id: 'green' },
    { name: 'Pink', id: 'pink' },
    { name: 'Purple', id: 'purple' },
    { name: 'Red', id: 'red' },
    { name: 'White', id: 'white' },
    { name: 'Yellow', id: 'yellow' },
  ]

  onButtonClick(id: string): void {
    this.buttonClick.emit(id);
  }

}
