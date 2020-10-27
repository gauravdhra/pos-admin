import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'home-root',
    template: `<div class="right_full_bar">
                    <div class="full_table">
                        <router-outlet></router-outlet>
                    </div>
                </div>`
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
}
