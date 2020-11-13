import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Recording, Representative } from '../../models/recordModel';
import { RecordService } from '../../services';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-branch-videos',
  templateUrl: './branch-videos.component.html',
  styleUrls: ['./branch-videos.component.scss']
})
export class BranchVideosComponent implements OnInit {
  @ViewChild('firstVideoPlayer') firstVideoPlayer: ElementRef;
  @ViewChild('secondVideoPlayer') secondVideoPlayer: ElementRef;

  customers: Recording[];
  recordings: Recording[];
  baseUrl = environment.URL
  selectedVideos = new Array<Recording>();
  branchID:number
  selectedCustomers: Recording[];

  representatives: Representative[];

  statuses: any[];

  monthNames: any[];

  loading: boolean = true;

  playerDialog: boolean;

  isPlaying: boolean;

  videoCurrentTime: any;

  @ViewChild('dt') table: Table;

  constructor(private actRoute: ActivatedRoute,private recordService: RecordService, private primengConfig: PrimeNGConfig) {
    this.branchID = this.actRoute.snapshot.params.id
   }

  ngOnInit(): void {
    this.loadRecordings(this.branchID);
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
  loadRecordings(branch_id) {

    this.recordService.getAllByID(branch_id).then(recordings => {
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
    if(this.selectedVideos.length == 2){
      this.resetVideoDialog()
      this.playerDialog = true;   
    }
  }
  resetVideoDialog(){
    this.isPlaying = false
    this.videoCurrentTime = 0
    this.firstVideoPlayer.nativeElement.currentTime = 0
    this.secondVideoPlayer.nativeElement.currentTime  = 0
  }
  play() {
    this.isPlaying = true
    this.firstVideoPlayer.nativeElement.play();
    this.secondVideoPlayer.nativeElement.play();
  }
  pause() {
    this.isPlaying = false
    this.firstVideoPlayer.nativeElement.pause();
    this.secondVideoPlayer.nativeElement.pause();
  }
  forward() {
    this.firstVideoPlayer.nativeElement.currentTime = this.firstVideoPlayer.nativeElement.currentTime + 10
    this.secondVideoPlayer.nativeElement.currentTime = this.secondVideoPlayer.nativeElement.currentTime + 10
  }
  backward() {
    this.firstVideoPlayer.nativeElement.currentTime = this.firstVideoPlayer.nativeElement.currentTime - 10
    this.secondVideoPlayer.nativeElement.currentTime = this.secondVideoPlayer.nativeElement.currentTime - 10
  }
  onFirstTimeUpdate(event){
    this.videoCurrentTime = this.firstVideoPlayer.nativeElement.currentTime
  }
  onSecondTimeUpdate(event){
    // this.videoCurrentTime = this.secondVideoPlayer.nativeElement.currentTime
  }
  setCurrentTime(event){
    this.firstVideoPlayer.nativeElement.currentTime = event.value
    this.secondVideoPlayer.nativeElement.currentTime = event.value
  }
  selectVideo(recording, action) {
    if (action.checked)
      this.selectedVideos.push(recording);
    else {
      const index = this.selectedVideos.indexOf(recording);

      this.selectedVideos.splice(index, 1);
    }

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
    month = this.monthNames[month]
    var sdf = day + ' ' + month + ' ' + date.getFullYear();
    // return date.getFullYear() + '-' + month + '-' + day;
    return day + ' ' + month + ' ' + date.getFullYear();
  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'representative', 'in')
  }
}
