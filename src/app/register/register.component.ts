import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../shared/validators/password-requirements.validator';
import { FormsErrorsService } from '../_services/forms-errors.service';
import { passwordsMatchValidator } from '../shared/validators/password-match.validator';
import {
  animate,
  animation,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { hideLoading, showLoading } from '../shared/state/actions';
import { RegisterService } from '../_services/register.service';
import { RegisterUserInterface } from '../_models/register/register-user.interface';
import { ToastNotificationService } from '../shared/components/toast-notification/services/toast-notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('errorState', [
      state(
        '1',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(50px)',
        }),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            opacity: 0,
            transform: 'translateY(50px)',
          })
        ),
      ]),
    ]),
  ],
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;
  public isErrorMessageVisible = false;
  public errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private formErrorService: FormsErrorsService,
    private store: Store,
    private registerService: RegisterService,
    private toastService: ToastNotificationService
  ) {}

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  public onFormSubmit(): void {
    if (!this.formGroup.valid) {
      this.errorMessage = this.formErrorService.getErrorMessage(this.formGroup);
      this.isErrorMessageVisible = true;
    } else {
      this.store.dispatch(showLoading());
      this.isErrorMessageVisible = false;
      this.errorMessage = null;
      const username = this.formGroup.get('username').value;
      const password = this.formGroup.get('password').value;
      const registerCredentials: RegisterUserInterface = {
        username,
        password,
      };
      this.registerService.registerUser(registerCredentials).subscribe(
        () => {
          this.store.dispatch(hideLoading());
          this.toastService.sendSuccessToast(
            'You have been successfully registered!'
          );
        },
        () => {
          this.store.dispatch(hideLoading());
          this.toastService.sendErrorToast('An error has occured!');
        }
      );
    }
  }

  private initializeFormGroup(): void {
    // passwordValidator
    // Validators.minLength(8)
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],

      confirmPassword: ['', [Validators.required]],
    });
    this.formGroup.setValidators(
      passwordsMatchValidator('password', 'confirmPassword')
    );
  }
}
