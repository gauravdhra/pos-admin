import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../../services';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  selectedBranch
  showConfirmation :boolean
  branches: any[];
  filteredBranches: any[];
  loading = false;
  selectedBranchIndex :number
  totalRecords :number
  rows :number;
  start:number;
  end:number;
  constructor(private branchService: BranchesService) { }

  ngOnInit(): void {
    this.rows = 9;
    this.start = 0
    this.end = this.rows
    this.loadBranches();
  }
  deleteBranch(index){
    debugger
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
