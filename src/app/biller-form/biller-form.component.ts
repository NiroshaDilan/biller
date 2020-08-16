import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../_helpers/must-match.validator';
import {BillerService} from '../services/biller.service';
import {Biller} from '../model/biller.model';

@Component({
  selector: 'app-biller-form',
  templateUrl: './biller-form.component.html',
  styleUrls: ['./biller-form.component.scss']
})
export class BillerFormComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  billerArray = [];

  constructor(private formBuilder: FormBuilder,
              private billerService: BillerService) {

  }

  ngOnInit(): void {

    this.fillBillerArray();
    this.createForm();


    // this.getBillers();
  }

  // tslint:disable-next-line:typedef
  fillBillerArray() {
    this.billerArray = [
      {
        id: '1',
        billerCode: 'Dialog',
        billerDesc: 'Dialog'
      },
      {
        id: '2',
        billerCode: 'Mobitel',
        billerDesc: 'Mobitel'
      },
      {
        id: '3',
        billerCode: 'Water_Board',
        billerDesc: 'Water Board'
      }
    ];
  }

  // tslint:disable-next-line:typedef
  createForm() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // validates date format yyyy-mm-dd
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      billers: this.formBuilder.array([])
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.getBillers();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  get billers(): FormArray {
    return this.registerForm.get('billers') as FormArray;
  }

  newBiller(biller): FormGroup {
    return this.formBuilder.group({
      biller
    });
  }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success;

  }

  // addBiller() {
  //   // this.billers.push(this.newBiller());
  // }

  // tslint:disable-next-line:typedef
  getBillers() {

    // this.billerArray.forEach((biller: Biller) => {
    //   this.billers.push(this.newBiller(biller.billerCode));
    // });

    this.billerService.getBillers()
      .subscribe((billers: Biller[]) => {
        billers.forEach(biller => {
          this.billers.push(this.newBiller(biller.billerCode));
        });
      });
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

}
