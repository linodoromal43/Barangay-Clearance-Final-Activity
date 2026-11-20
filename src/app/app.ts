import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { philippineMobileValidator } from './custom-validators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  clearanceForm!: FormGroup;
  formStatus: string = 'INVALID';
  showOthersField = false;

  purposeOptions = [
    'Employment',
    'Business Permit',
    'School Requirement',
    'Travel',
    'Others'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clearanceForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      birthdate: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
      contactNumber: ['', [Validators.required, philippineMobileValidator()]],
      purpose: ['', Validators.required],
      othersPurpose: [{ value: '', disabled: true }]
    });

    // valueChanges – show/hide + require "Others" field
    this.clearanceForm.get('purpose')?.valueChanges.subscribe(value => {
      const othersControl = this.clearanceForm.get('othersPurpose');

      if (value === 'Others') {
        othersControl?.enable();
        othersControl?.setValidators([Validators.required, Validators.minLength(5)]);
        this.showOthersField = true;
      } else {
        othersControl?.disable();
        othersControl?.clearValidators();
        othersControl?.setValue('');
        this.showOthersField = false;
      }

      othersControl?.updateValueAndValidity();
    });

    // statusChanges – live status banner
    this.clearanceForm.statusChanges.subscribe(status => {
      this.formStatus = status;
    });
  }

  get f() {
    return this.clearanceForm.controls;
  }

  onSubmit() {
    if (this.clearanceForm.valid) {
      console.log('Form Submitted:', this.clearanceForm.getRawValue());
      alert('Barangay Clearance Request submitted successfully!');
    } else {
      this.clearanceForm.markAllAsTouched();
    }
  }
}