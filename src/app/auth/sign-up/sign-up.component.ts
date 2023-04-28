import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatchPin } from "../validators/match-pin";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css", "../auth.css"],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  showPin = false;
  showConformPin = false;
  apiHit = false;

  constructor(
    private matchPin: MatchPin,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        mobileNumber: new FormControl("", [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
        pin: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
        confirmPin: new FormControl("", [
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
      this.signUpForm.get("pin")?.valid &&
      this.signUpForm.get("confirmPin")?.valid &&
      this.signUpForm.errors?.["pinsDontMatch"]
    );
  }

  onSubmit() {
    this.apiHit = true;
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: (data) => {
        this.apiHit = false;
        this.router.navigateByUrl("/dashboard");
      },
      error: (error) => {
        this.apiHit = false;
        this.signUpForm.setErrors({ accountExists: true });
      },
    });
  }
}
