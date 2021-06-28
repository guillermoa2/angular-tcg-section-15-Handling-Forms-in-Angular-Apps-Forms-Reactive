import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

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
      'userData': new FormGroup({ // Nested Form Group
        'username': new FormControl(null, Validators.required), //wrapping the key as a string, just incase. To not interfere with the HTML code,
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('female'), // CAN pass null for radio, BUT a default value is set instead,
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);

  }


  // Alternative, Outsource the "get the controls" logic into a method

  // getControls() {
  //     return (<FormArray>this.signupForm.get('hobbies')).controls;
  // }

  // Alternatively, you can set up a getter and use an alternative type casting syntax:
  
  // get controls() {
  //    return (this.signupForm.get('hobbies') as FormArray).controls;
  // }



}
