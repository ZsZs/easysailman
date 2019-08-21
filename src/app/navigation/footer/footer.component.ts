import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'srm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  copyrightText = 'All rights reserved 2019';

  constructor() { }

  ngOnInit() {
  }

}
