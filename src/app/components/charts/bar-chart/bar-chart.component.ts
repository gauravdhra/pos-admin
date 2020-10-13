import { Component, OnInit , Input} from '@angular/core';
interface Book {
  name: string;
  author: string;
}
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() chartType: string;
  employeeOrgData; orgCount1;
  orgCount2; orgCount3; orgCount4; orgCount5; employeeLabel: any;
  employeeJIRAHoursData;
  
  options = {
    responsive: false,
    maintainAspectRatio: false
  };

  employeeOrganizationData = [
    { name: 'employee1', designation: 'manager', employer: 'E - 400 GB' },
    { name: 'employee2', designation: 'manager', employer: 'E - 400 GB' },
    { name: 'employee3', designation: 'manager', employer: 'E - 400 GB' },
    { name: 'employee4', designation: 'manager', employer: 'E - 400 GB' },
    { name: 'employee5', designation: 'manager', employer: 'E - 500 GB' },
    { name: 'employee6', designation: 'manager', employer: 'E - 500 GB' },
    { name: 'employee7', designation: 'manager', employer: 'E - 500 GB' },
    { name: 'employee8', designation: 'manager', employer: 'E - 600 GB' },
    { name: 'employee9', designation: 'manager', employer: 'E - 600 GB' },
    { name: 'employee10', designation: 'manager', employer: 'E - 600 GB' },
    { name: 'employee11', designation: 'manager', employer: 'E - 600 GB' },
    { name: 'employee12', designation: 'manager', employer: 'E - 600 GB' },
    { name: 'employee13', designation: 'manager', employer: 'E - 600 GB' },
    { name: 'employee14', designation: 'manager', employer: 'E - 600 GB' },
    { name: 'employee15', designation: 'manager', employer: 'E - 700 GB' },
    { name: 'employee16', designation: 'manager', employer: 'E - 700 GB' },
    { name: 'employee17', designation: 'manager', employer: 'E - 800 GB' },
    { name: 'employee18', designation: 'manager', employer: 'E - 800 GB' },
    { name: 'employee19', designation: 'manager', employer: 'E - 800 GB' },
    { name: 'employee20', designation: 'manager', employer: 'E - 800 GB' },
    { name: 'employee21', designation: 'manager', employer: 'E - 800 GB' }
  ]

  constructor() { }

  ngOnInit(): void {

    this.orgCount1 = this.employeeOrganizationData.filter(emp => emp.employer === 'E - 400 GB').length;
    this.orgCount2 = this.employeeOrganizationData.filter(emp => emp.employer === 'E - 500 GB').length;
    this.orgCount3 = this.employeeOrganizationData.filter(emp => emp.employer === 'E - 600 GB').length;
    this.orgCount4 = this.employeeOrganizationData.filter(emp => emp.employer === 'E - 700 GB').length;
    this.orgCount5 = this.employeeOrganizationData.filter(emp => emp.employer === 'E - 800 GB').length;

    this.employeeLabel =

      this.employeeOrganizationData.map(emp => emp.employer)
        .filter((value, index, self) => self.indexOf(value) === index);

    this.employeeOrgData = {
      labels: this.employeeLabel,
      datasets: [
        {
          data: [this.orgCount1, this.orgCount2, this.orgCount3, this.orgCount4, this.orgCount5],
          backgroundColor: ['#ff0000', '#0000FF', '#FFFF00', '#FFC0CB', '#7f00ff ']
        }
      ]
    }

    this.employeeJIRAHoursData = {
      labels: ['Jan', 'Feb', 'March', 'April'],
      datasets: [
        {
          label: 'E - 400 GB',
          backgroundColor: '#FFFF00',
          data: [44, 65, 23, 77]
        },
        {
          label: 'Organization2',
          backgroundColor: '#ff0000',
          data: [14, 65, 16, 100]
        }
      ]

    }
  }

}
