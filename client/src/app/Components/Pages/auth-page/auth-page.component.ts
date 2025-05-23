import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../../Core/Services/Auth/auth-service.service';
import { AuthError, AuthRes } from '../../../Core/Models/AuthModel';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent implements OnInit {
  isSignUp: boolean = true;
  Form!: FormGroup;
  Loading: boolean = false;
  Error: string = '';
  returnUrl: string = '/Tools';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.isSignUp = url[0].path === 'SignUp';
    });

    this.FormInitialization();

    const returnParam = this.route.snapshot.queryParamMap.get('returnUrl');
    this.returnUrl = returnParam ? decodeURIComponent(returnParam) : '/Tools';
  }

  FormInitialization(): void {
    const baseControls = {
      Email: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
        ],
      ],
    };

    if (this.isSignUp) {
      this.Form = this.fb.group({
        FirstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
        ...baseControls,
      });
    } else {
      this.Form = this.fb.group(baseControls);
    }
  }

  onSubmit(): void {
    this.Loading = true;
    this.Error = '';

    this.isSignUp
      ? this.auth.SignUp(this.Form.value).subscribe({
          next: (value: AuthRes) => {
            this.Loading = false;
            this.auth.setData({
              userId: value.userId?.toString() ?? null,
              isAuthenticated: true,
              planId: value.planId,
              status: value.status,
              end_date: value.end_date,
            });
            this.Error = '';
            this.Form.reset();
            this.router.navigate(['/ChoosePlan']);
          },
          error: (err: AuthError) => {
            this.Loading = false;
            this.Error = err.error.message;
          },
        })
      : this.auth.LogIn(this.Form.value).subscribe({
          next: (value: AuthRes) => {
            this.Loading = false;

            this.auth.setData({
              userId: value.userId?.toString() ?? null,
              isAuthenticated: true,
              planId: value.planId,
              status: value.status,
              end_date: value.end_date,
            });

            this.Form.reset();
            this.router.navigateByUrl(this.returnUrl);
          },

          error: (err: AuthError) => {
            this.Loading = false;
            this.Error = err.error.message;
          },
        });
  }
}
