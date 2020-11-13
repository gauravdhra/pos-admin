import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, AlertService } from '../services';
import { BranchesService } from '../services';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @ViewChild('UploadImage')
  imageInput: ElementRef;
  registerForm: boolean;

  form: FormGroup;
  loading = false;
  submitted = false;
  fileInputLabel: string;
  imageUrl
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService,
    private branchService: BranchesService
  ) { }

  ngOnInit(): void {
    this.createForm()
  }
  resetImageInput() {
    this.imageInput.nativeElement.value = "";
  }
  createForm(){
    this.form = this.formBuilder.group({
      uploadedImage: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onFileSelect(event) {
    const file = event.target.files[0];

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(file);

    this.fileInputLabel = file.name;
    this.form.get('uploadedImage').setValue(file);
  }

  get f() { return this.form.controls; }

  onSubmit() {
    
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }



    const formData = new FormData();
    formData.append('uploadedImage', this.form.get('uploadedImage').value);
    formData.append('firstName', this.form.get('firstName').value);
    formData.append('email', this.form.get('email').value);
    formData.append('password', this.form.get('password').value);



    this.loading = true;
    this.authService.register(formData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.submitted =  false
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.branchService.loadBranches.emit(true);
          this.registerForm = false
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  logout(){
    localStorage.removeItem('user')
    this.router.navigate(['/login']);
  }
  createUser() {
    this.resetImageInput();
    this.form.reset();
    this.submitted = false
     this.imageUrl = ''
      this.registerForm = true;
  }
}
