import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';

@Component({
  selector: 'app-users-show',
  templateUrl: './users-show.component.html',
  styleUrls: ['./users-show.component.css']
})
export class UsersShowComponent implements OnInit {

  id: number
  user: any
  hide: boolean = true
  editUserForm = new FormGroup({
    name: new FormControl(
      '',
      [
        Validators.required,
        Validators.maxLength(255)
      ]),
    email: new FormControl(
      '',
      [
        Validators.email,
        Validators.required
      ]),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24)
      ])
  })

  constructor(
    private _auth: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    public dialogRef: MatDialogRef<any>,
    private _snackBar: MatSnackBar,
    private _confirmationSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.user = this._auth.getUser()
    this.editUserForm.get(['name']).setValue(this.user.name)
    this.editUserForm.get(['email']).setValue(this.user.email)
    this.editUserForm.get(['password']).setValue(this.user.password)
  }

  updateUser() {
    if (this.editUserForm.valid) {
      this._auth
        .updateUser(this.editUserForm.value, this.user.sub)
        .subscribe(res => {
          this._auth.logout();
          this._auth.login(this.editUserForm.value).then(() => {
            this.dialogRef.close()
            location.reload()
          })
        })
    } else {
      this._snackBar.open(`All fields need to be filled!`, 'OK', {
        duration: 15000
      })
    }
  }

  deleteUser() {
    this._confirmationSheet.open(ConfirmationComponent, {
      data: {
        message: "Are you sure do you want delete this perfil? All your datas will be lost",
        confirmButton: true,
        answer: () => {
          this._auth.delete(this.user.sub).subscribe(res => {
            this.dialogRef.close()
            this._router.navigate([''])
          })
        }
      }
    })
  }
}
