import { Component, OnInit, ViewChild } from '@angular/core';
import { Recording, Representative } from '../../models/recordModel';
import { RecordService } from '../../services/recordings.service';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../../../environments/environment';

const baseUrl = environment.URL

@Component({
  selector: 'app-recordings',
  templateUrl: './recordings.component.html',
  styleUrls: ['./recordings.component.scss']
})
export class RecordingsComponent implements OnInit {

  customers: Recording[];
  recordings: Recording[];

  selectedVideos = new Array<Recording>();

  selectedCustomers: Recording[];

  representatives: Representative[];

  statuses: any[];

  monthNames: any[];

  loading: boolean = true;

  playerDialog: boolean;

  @ViewChild('dt') table: Table;

  constructor(private recordService: RecordService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.loadRecordings();
    this.monthNames = ["Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"];

    this.representatives = [
      { name: "Amy Elsner", image: 'amyelsner.png' },
      { name: "Anna Fali", image: 'annafali.png' },
      { name: "Asiya Javayant", image: 'asiyajavayant.png' },
      { name: "Bernardo Dominic", image: 'bernardodominic.png' },
      { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
      { name: "Ioni Bowcher", image: 'ionibowcher.png' },
      { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
      { name: "Onyama Limba", image: 'onyamalimba.png' },
      { name: "Stephen Shaw", image: 'stephenshaw.png' },
      { name: "XuXue Feng", image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ]
    this.primengConfig.ripple = true;
  }
  loadRecordings(){

    this.recordService.getAll().then(recordings => {
      this.recordings = recordings;
      this.loading = false;
    });

    // this.recordService.getAll()
    //   .subscribe(
    //     data => {
    //       // this.tutorials = data;
    //       console.log(data);
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }
  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
  }
  playVideo(recording) {
    if(this.selectedVideos.length == 2)
    this.playerDialog = true;
  }
  selectVideo(recording,action,index) {
    if (action.checked)
    this.selectedVideos.push(recording);
    else
      this.selectedVideos.splice(index,1);
    // if(recording.type="screen")
    //   this.selectedVideos[0] = recording;
    // else
    //   this.selectedVideos[1] = recording;
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // if (month < 10) {
    //   month = '0' + month;
    // }

    if (day < 10) {
      day = '0' + day;
    }
    month =this.monthNames[month]
    var sdf = day + ' ' + month + ' ' + date.getFullYear();
    debugger
    // return date.getFullYear() + '-' + month + '-' + day;
    return day + ' ' + month + ' ' + date.getFullYear() ;
  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'representative', 'in')
  }
}
