import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginCredentialsInterface } from '../_models/login/login-credentials.interface';
import { UserInterface } from '../_models/user.interface';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  @Input() public currentUser: UserInterface = null;

  @Output() public login = new EventEmitter<LoginCredentialsInterface>();
  @Output() public logout = new EventEmitter<void>();

  @ViewChild('passwordInput') public passWordInput: ElementRef<
    HTMLInputElement
  >;
  public isPasswordVisible = false;
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    // passwordValidator
  }

  public onLogoutClick(): void {
    this.logout.emit();
  }

  public onSubmitClick(): void {
    if (this.formGroup.valid) {
      const credentials: LoginCredentialsInterface = {
        username: this.formGroup.get('username').value,
        password: this.formGroup.get('password').value,
      };
      this.login.emit(credentials);
    }
  }

  public toggleVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    if (this.isPasswordVisible) {
      this.passWordInput.nativeElement.type = 'text';
    } else {
      this.passWordInput.nativeElement.type = 'password';
    }
  }
}
