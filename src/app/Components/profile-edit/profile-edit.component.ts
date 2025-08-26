import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface, UserTokenInterface } from 'src/app/interfaces/user.interface';
import { ValidadePassword } from 'src/app/interfaces/validatePassword.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @Output() closeMenu = new EventEmitter<void>();
  @Output() updatedUser = new EventEmitter<void>();

  userForm!: FormGroup;
  user!: UserInterface;
  userId: number = Number(localStorage.getItem('userId'));
  passwordClassEye = 'fa-eye-slash';
  passwordType = 'password'
  confirmEditMenuVisible = false;
  hiddenClass = ''
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['', Validators.required],
      urlPhoto: [''],
      urlLinkedin: [''],
      urlInstagram: ['']
    });

    this.authService.user$.subscribe((data: UserTokenInterface | null) => {
      if (data) {
        this.userService.getUserById(this.userId).subscribe((user: UserInterface) => {
          if (user) {
            this.user = user;

            this.userForm.patchValue({
              name: user.name,
              email: user.email,
              role: user.role,
              urlPhoto: user.urlPhoto,
              urlLinkedin: user.urlLinkedin,
              urlInstagram: user.urlInstagram
            });
          }
        });
      }
    });
  }


  onSubmit(): void {
    if (this.userForm.valid && this.password !== '') {
      const data: ValidadePassword = {
        userId: this.user.id,
        password: this.password
      }

      this.userService.validatePassword(data).subscribe({
        next: () => {
          const updatedUser: UserInterface = {
            ...this.user,
            ...this.userForm.value
          };

          this.userService.updateUser(updatedUser).subscribe({
            next: () => {
              this.closeMenu.emit();
              this.updatedUser.emit();
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Usuário atualizado com sucesso!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
            },
            error: () =>
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Erro ao atualizar usuário!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              })
          });
        },
        error: () =>
          Swal.fire({
            toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Senha incorreta!',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
          })
      });
    }
  }


  closeMenuEdit() {
    this.closeMenu.emit();
  }

  showPassword() {
    if (this.passwordClassEye === 'fa-eye-slash') {
      this.passwordClassEye = 'fa-eye';
      this.passwordType = 'text';
    } else {
      this.passwordClassEye = 'fa-eye-slash';
      this.passwordType = 'password';
    }
  }

  setMenuConfirmVisible() {
    this.confirmEditMenuVisible = !this.confirmEditMenuVisible;

    if (this.hiddenClass === 'hidden') {
      this.hiddenClass = '';
    } else {
      this.hiddenClass = 'hidden';
    }
  }
}
