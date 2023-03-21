import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { SettingsService } from '../../services/settings.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements AfterViewChecked {

  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService
  ) {

    this.sidebarService.loadMenu();
  }

  ngAfterViewChecked(): void {
    customInitFunctions();
  }

}
