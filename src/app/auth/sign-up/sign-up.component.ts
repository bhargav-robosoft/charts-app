import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPin } from '../match-pin';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  showPin = false;
  showConformPin = false;
  apiHit = false;

  constructor(private matchPin: MatchPin) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        mobileNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
        pin: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
        confirmPin: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
      },
      { validators: [this.matchPin.validate] }
    );
  }

  getErrorForControl(fieldName: string) {
    return (
      this.signUpForm.get(fieldName)?.dirty &&
      this.signUpForm.get(fieldName)?.invalid &&
      this.signUpForm.get(fieldName)?.touched
    );
  }

  getErrorForPinMisMatch() {
    return (
      this.signUpForm.get('pin')?.valid &&
      this.signUpForm.get('confirmPin')?.valid &&
      this.signUpForm.errors?.['pinsDontMatch']
    );
  }

  onSubmit() {}
}
