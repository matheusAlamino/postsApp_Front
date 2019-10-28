import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() posts: any[] = []
  @Output() closeDialog = new EventEmitter

  constructor() { }

  ngOnInit() {
  }

  disparaEvento() {
    this.closeDialog.emit('')
  }
}
