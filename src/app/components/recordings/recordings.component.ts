import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Recording, Representative } from '../../models/recordModel';
import { RecordService } from '../../services';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-recordings',
  templateUrl: './recordings.component.html',
  styleUrls: ['./recordings.component.scss']
})
export class RecordingsComponent implements OnInit {
  @ViewChild('firstVideoPlayer') firstVideoPlayer: ElementRef;
  @ViewChild('secondVideoPlayer') secondVideoPlayer: ElementRef;

  customers: Recording[];
  recordings: Recording[];
  baseUrl = environment.URL
  selectedVideos = new Array<Recording>();

  selectedCustomers: Recording[];

  representatives: Representative[];

  statuses: any[];

  monthNames: any[];

  loading: boolean = true;

  playerDialog: boolean;

  isPlaying: boolean;

  videoCurrentTime: any;

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
    this.recordService.getAll().then((recordings : any) => {
      let mergedRecordings = [];
      let length = recordings.length;
      for(let i=0; i<=length;i+=2){ 
        if(recordings[i] == undefined){
          return;
        }
        if(recordings[i+1] == undefined) {
          mergedRecordings.push({
            id : recordings[i].id, 
            company_name : recordings[i].company_name,
            created_at : recordings[i].created_at,
            path : recordings[i].path,
            duration : recordings[i].duration,
            end_time : recordings[i].end_time,
            start_time : recordings[i].start_time,
            type : recordings[i].type,
          });
        } else {
          mergedRecordings.push({
            id : recordings[i].id, 
            idCamera : recordings[i+1].id,
            company_name : recordings[i].company_name,
            company_name_camera : recordings[i+1].company_name,
            created_at : recordings[i].created_at,
            created_at_camera : recordings[i+1].created_at,
            path : recordings[i].path,
            path_camera : recordings[i+1].path,
            duration : recordings[i].duration,
            duration_camera : recordings[i+1].duration,
            end_time : recordings[i].end_time,
            end_time_camera: recordings[i+1].end_time,
            start_time : recordings[i].start_time,
            start_time_camera : recordings[i+1].start_time,
            type : recordings[i].type,
            type_camera : recordings[i+1].type
          });
        }
        this.recordings= mergedRecordings;
      }
      this.loading = false;
      console.log(this.recordings)
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
    if(this.selectedVideos.length == 1){
      console.log(this.firstVideoPlayer.nativeElement.src);
      console.log(this.secondVideoPlayer.nativeElement.src);

      // this.firstVideoPlayer.nativeElement.src = recording.path;
      // this.secondVideoPlayer.nativeElement.src = recording.path_camera;
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
  play(){
    this.isPlaying = true
    this.firstVideoPlayer.nativeElement.play();
    this.secondVideoPlayer.nativeElement.play();
  }
  pause(){
    this.isPlaying = false
    this.firstVideoPlayer.nativeElement.pause();
    this.secondVideoPlayer.nativeElement.pause();
  }
  forward(){
    this.firstVideoPlayer.nativeElement.currentTime = this.firstVideoPlayer.nativeElement.currentTime + 10
    this.secondVideoPlayer.nativeElement.currentTime = this.secondVideoPlayer.nativeElement.currentTime + 10
  }
  backward(){
    this.firstVideoPlayer.nativeElement.currentTime = this.firstVideoPlayer.nativeElement.currentTime - 10
    this.secondVideoPlayer.nativeElement.currentTime = this.secondVideoPlayer.nativeElement.currentTime - 10
  }
  onFirstTimeUpdate(event){
    this.videoCurrentTime = this.firstVideoPlayer.nativeElement.currentTime
  }
  onSecondTimeUpdate(event){
    // this.videoCurrentTime = this.secondVideoPlayer.nativeElement.currentTime
  }
  setCurrentTime(event) {
    this.firstVideoPlayer.nativeElement.currentTime = event.value
    this.secondVideoPlayer.nativeElement.currentTime = event.value
  }
  selectVideo(recording,action) {
    console.log(recording)
    if (action.checked)
    this.selectedVideos.push(recording);
    else{
      const index = this.selectedVideos.indexOf(recording);
      this.selectedVideos.splice(index,1);
      console.log(this.selectVideo)
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
    month =this.monthNames[month]
    var sdf = day + ' ' + month + ' ' + date.getFullYear();
    // return date.getFullYear() + '-' + month + '-' + day;
    return day + ' ' + month + ' ' + date.getFullYear() ;
  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'representative', 'in')
  }
}
