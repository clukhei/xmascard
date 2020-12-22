import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }
  form: FormGroup

  ngOnInit(): void {
    this.form = this.fb.group({
      greetings: this.fb.control('', Validators.required)
    })
  }

  submit(){ 
   console.log(this.form.get('greetings').value)
   const message = this.form.get('greetings').value
   this.router.navigate(['/card'], {queryParams:{message}})
  }
}
