import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-calendar-notification',
  templateUrl: './calendar-notification.component.html',
  styleUrls: ['./calendar-notification.component.scss']
})
export class CalendarNotificationComponent implements OnInit {
  @ViewChild('cal') cal: ElementRef

  ngAfterViewInit() {
    this.cal.nativeElement.focus()
  }
  calendarOptions: CalendarOptions ;
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  constructor() { }

  ngOnInit(): void {
    this.calendarOptions = {
      height: 'auto',
      initialView: 'dayGridMonth',
      aspectRatio: 2,
      editable: true,
      selectable: true,
      dateClick: this.handleDateClick.bind(this), // bind is important!
      events: [
        { title: 'event 1', date: '2020-10-10' },
        { title: 'event 2', date: '2020-10-12' },
        { title: 'event 3', date: '2020-10-12' },
        { title: 'event 4', date: '2020-10-12' }
      ]
    };
  }


}
