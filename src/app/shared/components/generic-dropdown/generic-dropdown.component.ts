import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-generic-dropdown',
  templateUrl: './generic-dropdown.component.html',
  styleUrls: ['./generic-dropdown.component.scss'],
  animations: [
    trigger('dropdownOptions', [
      state(
        'evenOption',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      state(
        'oddOption',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => evenOption', [
        style({
          opacity: 0,
          transform: 'translateX(25px)',
        }),
        animate(500),
      ]),
      transition('void => oddOption', [
        style({
          opacity: 0,
          transform: 'translateX(-25px)',
        }),
        animate(500),
      ]),
      transition('evenOption => void', [
        animate(
          500,
          style({
            opacity: 0,
            transform: 'translateX(25px)',
          })
        ),
      ]),
      transition('oddOption => void', [
        animate(
          500,
          style({
            opacity: 0,
            transform: 'translateX(-25px)',
          })
        ),
      ]),
    ]),
  ],
})
export class GenericDropdownComponent implements OnInit {
  @Input() public username = 'TestUser';
  @Input() public dropdownOptions: string[] = ['Option1', 'Option2', 'Option3'];
  @Output() public optionSelected = new EventEmitter<string>();
  public isDropdownOpen = false;

  constructor() {}

  ngOnInit(): void {}

  public onDropdownClick(): void {
    this.isDropdownOpen = true;
  }

  public onClickOutside(): void {
    this.isDropdownOpen = false;
  }

  public onOptionClick(option: string): void {
    this.optionSelected.emit(option);
  }
}
