import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Moment } from '../../Moment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-moment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css'],
})

export class MomentFormComponent {
  @Output() onSubmit = new EventEmitter<Moment>()
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;

  momentForm!: FormGroup;
  
  submitted = false;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
      image: new FormControl(''),

    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]

    this.momentForm.patchValue({ image: file });
  }

  submit() {
    this.submitted = true;
    if(this.momentForm.invalid) {
      return;
    }
    console.log(this.momentForm.value)

    this.onSubmit.emit(this.momentForm.value);
  }
}
