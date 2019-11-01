import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentsService } from '../comments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';

@Component({
  selector: 'app-comment-show',
  templateUrl: './comment-show.component.html',
  styleUrls: ['./comment-show.component.css']
})
export class CommentShowComponent implements OnInit {

  @Input() comment: any
  @Input() edit: boolean
  @Input() delete: boolean
  editavel: boolean
  commentForm = new FormGroup({
    description: new FormControl(
      '',
      [
        Validators.required
      ]
    )
  })

  constructor(
    private _commentsService: CommentsService,
    private _snackBar: MatSnackBar,
    private _confirmationSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  updateComment() {
    if (this.commentForm.valid) {
      this._commentsService
        .update(this.commentForm.value, this.comment.id)
        .subscribe(res => {
          location.reload()
        })
    } else {
      this._snackBar.open('The field must be filled', 'OK', {
        duration: 15000
      })
    }
  }

  deleteComment() {
    this._confirmationSheet.open(ConfirmationComponent, {
      data: {
        message: "Are you sure do you want delete this comment?",
        confirmButton: true,
        answer: () => {
          this._commentsService
            .delete(this.comment.id)
            .subscribe(res => {
              location.reload()
            })
        }
      }
    })
  }
}
