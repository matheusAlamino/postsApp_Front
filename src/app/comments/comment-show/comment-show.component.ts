import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentsService } from '../comments.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-show',
  templateUrl: './comment-show.component.html',
  styleUrls: ['./comment-show.component.css']
})
export class CommentShowComponent implements OnInit {

  @Input() comment: any
  @Input() mine: boolean
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
    private _router: Router,
    private _route: ActivatedRoute) { }

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
      alert('The field must be filled')
    }
  }

  deleteComment() {
    if (confirm('Are you sure do you want delete this comment?')) {
      this._commentsService
        .delete(this.comment.id)
        .subscribe(res => {
          location.reload()
        })
    }
  }
}
