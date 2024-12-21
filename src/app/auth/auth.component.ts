import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '@/app/user/user.service';

interface AuthForm {
    name?: FormControl<string>;
    cpf: FormControl<string>;
    phone: FormControl<string>;
}

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent {
    authType = "";
    title = "";
    authForm: FormGroup<AuthForm>;
    errors: { errors: { [key: string]: string } } = { errors: {} }
    isSubmitting = false;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly userService: UserService,
    ) {
        this.authForm = new FormGroup<AuthForm>({
            name: new FormControl('', {
                validators: [Validators.required],
                nonNullable: true
            }),
            cpf: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.minLength(11), Validators.maxLength(11),
                    Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
                ],
                nonNullable: true
            }),
            phone: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.minLength(11), Validators.maxLength(11),
                    Validators.pattern(/^\d{2}\d{4,5}\d{4}$/)
                ],
                nonNullable: true
            }),
        })
    }
}
