import { Component, Input, OnInit } from '@angular/core';
import { CdkService, ProjectHeader } from 'src/app/services/cdk.service';

@Component({
  selector: 'app-header-workshop',
  templateUrl: './header-workshop.component.html',
  styleUrls: ['./header-workshop.component.css']
})
export class HeaderWorkshopComponent implements OnInit {
  @Input() currentMenu: number = 0;
  hidden = false;
  menuConfig = false;
  icon = 'fa-arrow-right';

  title = '';
  subTitle = '';
  description = 'Descrição do projeto.';
  urlLogo = '';

  constructor(private cdkService: CdkService) {}

  ngOnInit(): void {
    const header = this.cdkService.getProjectHeader();
    this.title = header.title;
    this.subTitle = header.subTitle;
    this.description = header.description;
    this.urlLogo = header.urlLogo;
  }

  toggleHeaderHidden() {
    this.hidden = !this.hidden;
    this.icon = this.hidden ? 'fa-arrow-left' : 'fa-arrow-right';
  }

  toggleMenuConfig() {
    this.menuConfig = !this.menuConfig;
  }

  sendForm() {
    const header: ProjectHeader = {
      title: this.title,
      subTitle: this.subTitle,
      description: this.description,
      urlLogo: this.urlLogo
    };

    this.cdkService.updateProjectHeader(header);
  }
}
