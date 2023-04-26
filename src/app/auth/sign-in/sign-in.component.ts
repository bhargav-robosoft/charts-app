import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css", "../auth.css"],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  showPin = false;
  apiHit = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
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
    });
  }

  getErrorForControl(fieldName: string) {
    return (
      this.signInForm.get(fieldName)?.dirty &&
      this.signInForm.get(fieldName)?.invalid &&
      this.signInForm.get(fieldName)?.touched
    );
  }

  onSubmit() {
    this.apiHit = true;
    this.authService.signIn(this.signInForm.value).subscribe({
      next: (data) => {
        this.apiHit = false;
        this.router.navigateByUrl("/dashboard");
      },
      error: (error) => {
        this.apiHit = false;
        this.signInForm.setErrors({ invalidData: true });
      },
    });
  }
}
