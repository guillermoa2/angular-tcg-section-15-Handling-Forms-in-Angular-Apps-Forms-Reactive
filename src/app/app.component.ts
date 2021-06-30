import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({ // Nested Form Group
        // Wrapping the key as a string, just incase. To not interfere with the HTML code,
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        // Async functions are a third argument outside the Validators[], 
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('female'),
       // CAN pass null for gender radio, BUT a default value is set instead,
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

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    // -1 is interpretted as true, meaning DOES NOT exist in array. But we are checking if it DOES exist in the array, meaning it is invalid. So DO run the if statement
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    } 
    return null;  // return {'nameIsForbidden': false} will NOT work! OR just omit the return statement
  }

  forbiddenEmails(control: FormControl):  Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
