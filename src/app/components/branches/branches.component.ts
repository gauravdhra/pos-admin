import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../../services';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, AlertService } from '../../services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  selectedBranch
  showConfirmation :boolean
  edit :boolean
  branches: any[];
  editForm: FormGroup;
  filteredBranches: any[];
  loading = false;
  selectedBranchIndex :number
  totalRecords :number
  rows :number;
  start:number;
  end:number;
  baseUrl = environment.URL

  submitted = false;
  fileInputLabel: string;
  imageUrl

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private branchService: BranchesService
    ) { 
    this.branchService.loadBranches.subscribe((load: boolean) => {
      if (load)
        this.loadBranches();
    })
    }

  ngOnInit(): void {
    this.rows = 9;
    this.start = 0
    this.end = this.rows
    this.loadBranches();
    this.createEditForm()
  }
  createEditForm(){
    this.editForm = this.formBuilder.group({
      uploadedImage: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.editForm.controls; }

  editUser(index) {
    this.editForm.reset();
    this.submitted = false
    this.edit = true;
    this.selectedBranch = this.branches[index]
    if (this.selectedBranch.user_photo){

      this.imageUrl = this.baseUrl+this.selectedBranch.user_photo
    }
    this.editForm.get('uploadedImage').setValue(this.selectedBranch.user_photo);
    this.editForm.get('firstName').setValue(this.selectedBranch.user_fname);
    this.editForm.get('email').setValue(this.selectedBranch.user_email);
    this.editForm.get('password').setValue(this.selectedBranch.user_pass);
    
    this.selectedBranchIndex = index
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
    this.editForm.get('uploadedImage').setValue(file);
  }
  onSubmit() {

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('uploadedImage', this.editForm.get('uploadedImage').value);
    formData.append('firstName', this.editForm.get('firstName').value);
    formData.append('email', this.editForm.get('email').value);
    formData.append('password', this.editForm.get('password').value);



    this.loading = true;
    this.branchService.update(this.selectedBranch.user_id,formData).then(report => {
      this.loadBranches();
      this.edit = false
      this.submitted = false
      this.loading = false;
      // this.branches.splice(this.selectedBranchIndex, 1);
    });
      // .pipe(first())
      // .subscribe({
      //   next: () => {
      //     this.submitted = false
      //     this.alertService.success('Registration successful', { keepAfterRouteChange: true });
      //     this.edit = false
      //   },
      //   error: error => {
      //     this.alertService.error(error);
      //     this.loading = false;
      //   }
      // });
  }
  deleteBranch(index){
    this.selectedBranchIndex = index
    this.selectedBranch = this.branches[index]
    this.showConfirmation = true
  }
  confirmDelete(){
    
    this.showConfirmation = false
    this.branchService.delete(this.selectedBranch['user_id']).then(report => {
      this.branches.splice(this.selectedBranchIndex, 1);
      this.loading = false;
    });
  }
  loadBranches(){
    this.branchService.getAll().then(branches => {
      console.log(branches)
      this.branches = branches;
      this.totalRecords = branches.length;
      this.loading = false;
    });
  }
  paginate(event){
    this.start = event.first
    this.end = this.start + event.rows
    this.filteredBranches = this.branches
    console.log(event)
  }
}
