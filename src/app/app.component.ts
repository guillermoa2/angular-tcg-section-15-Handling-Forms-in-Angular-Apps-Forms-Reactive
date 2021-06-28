import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null), //wrapping the key as a string, just incase. To not interfere with the HTML code,
      'email': new FormControl(null),
      'gender': new FormControl('female'), // CAN pass null for radio, BUT a default value is set instead
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
