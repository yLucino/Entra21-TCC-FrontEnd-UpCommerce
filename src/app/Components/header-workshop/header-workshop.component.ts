import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProjectHeader } from 'src/app/interfaces/projectHeader.interface';
import { CdkService } from 'src/app/services/cdk.service';

@Component({
  selector: 'app-header-workshop',
  templateUrl: './header-workshop.component.html',
  styleUrls: ['./header-workshop.component.css']
})
export class HeaderWorkshopComponent implements OnChanges {
  @Input() currentMenu: number = 0;
  @Input() getHeader: ProjectHeader | null = null;

  hidden = false;
  menuConfig = false;
  icon = 'fa-arrow-right';

  title = '';
  subTitle = '';
  description = 'Descrição do projeto.';
  urlLogo = '';

  constructor(private cdkService: CdkService) {}

ngOnChanges(changes: SimpleChanges): void {
    if (changes['getHeader']) {
      const h = changes['getHeader'].currentValue as ProjectHeader | null;
      if (h) {
        this.title = h.title ?? '';
        this.subTitle = h.subTitle ?? '';
        this.description = h.description ?? 'Descrição do projeto.';
        this.urlLogo = h.urlLogo ?? '';
      }
    }
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
