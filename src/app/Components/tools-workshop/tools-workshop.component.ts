import { Component, Input } from '@angular/core';
import { AreaComponent } from 'src/app/dragAndDrop/area/area.component';

import { ButtonDragComponent } from 'src/app/dragAndDrop/button-drag/button-drag.component';
import { ComponentDragDrop } from 'src/app/interfaces/component.dragdrop.interface';

@Component({
  selector: 'app-tools-workshop',
  templateUrl: './tools-workshop.component.html',
  styleUrls: ['./tools-workshop.component.css']
})
export class ToolsWorkshopComponent {
  @Input() connectedDropListId: string[] = ['', ''];
  selectedIndex: number = 1;

  btnsItems = [
    { text: 'Telas', icon: 'fa-solid fa-expand' },
    { text: 'Componentes', icon: 'fa-solid fa-diamond' }
  ];

  components: ComponentDragDrop[] = [
    { text: 'Mapa', icon: 'fa-solid fa-map', component: null },
    { text: 'Galeria', icon: 'fa-solid fa-images', component: null },
    { text: 'Audio Player', icon: 'fa-solid fa-music', component: null },
    { text: 'Vídeo Player', icon: 'fa-solid fa-video', component: null },
    { text: 'Lista Checkbox', icon: 'fa-solid fa-list-check', component: null },
    { text: 'Webview', icon: 'fa-solid fa-globe', component: null },
    { text: 'Gráfico', icon: 'fa-solid fa-chart-pie', component: null },
    { text: 'Inputs', icon: 'fa-solid fa-sliders', component: null },
    { text: 'Botões', icon: 'fa-solid fa-toggle-on', component: ButtonDragComponent },
    { text: 'Ícones', icon: 'fa-solid fa-icons', component: null },
    { text: 'Notificações', icon: 'fa-solid fa-bell', component: null },
    { text: 'Formulário', icon: 'fa-solid fa-file-lines', component: null },
    { text: 'Lista de Tarefas', icon: 'fa-solid fa-clipboard-list', component: null },
    { text: 'QRCode Scanner', icon: 'fa-solid fa-qrcode', component: null },
    { text: 'Código de Barras', icon: 'fa-solid fa-barcode', component: null },
    { text: 'Câmera', icon: 'fa-solid fa-camera', component: null },
    { text: 'Calendário', icon: 'fa-solid fa-calendar-days', component: null },
    { text: 'Localização', icon: 'fa-solid fa-location-dot', component: null },
    { text: 'Perfil', icon: 'fa-solid fa-user', component: null },
    { text: 'Chat', icon: 'fa-solid fa-comments', component: null },
    { text: 'Login', icon: 'fa-solid fa-right-to-bracket', component: null },
    { text: 'Logout', icon: 'fa-solid fa-right-from-bracket', component: null },
    { text: 'Dashboard', icon: 'fa-solid fa-chart-line', component: null },
    { text: 'Relatórios', icon: 'fa-solid fa-file-invoice', component: null },
    { text: 'Ajuda', icon: 'fa-solid fa-circle-question', component: null },
    { text: 'Favoritos', icon: 'fa-solid fa-heart', component: null },
    { text: 'Compartilhar', icon: 'fa-solid fa-share-nodes', component: null },
    { text: 'Download', icon: 'fa-solid fa-download', component: null },
    { text: 'Upload', icon: 'fa-solid fa-upload', component: null },
    { text: 'Segurança', icon: 'fa-solid fa-shield-halved', component: null },
    { text: 'Scanner', icon: 'fa-solid fa-print', component: null },
    { text: 'Impressora', icon: 'fa-solid fa-print', component: null },
    { text: 'Tempo', icon: 'fa-solid fa-cloud-sun', component: null },
    { text: 'Pesquisa', icon: 'fa-solid fa-magnifying-glass', component: null },
    { text: 'Histórico', icon: 'fa-solid fa-clock-rotate-left', component: null },
    { text: 'Mensagens', icon: 'fa-solid fa-envelope', component: null },
    { text: 'Carregamento', icon: 'fa-solid fa-spinner', component: null },
    { text: 'Tema Escuro', icon: 'fa-solid fa-moon', component: null }
  ];

  screens: ComponentDragDrop[] = [
    { text: 'Home', icon: 'fa-solid fa-house', component: null },
    { text: 'Área', icon: 'fa-regular fa-object-group', component: AreaComponent },
    { text: 'Pagamento', icon: 'fa-solid fa-credit-card', component: null },
    { text: 'Perfil', icon: 'fa-solid fa-user', component: null },
    { text: 'Configurações', icon: 'fa-solid fa-gear', component: null },
    { text: 'Notificações', icon: 'fa-solid fa-bell', component: null },
    { text: 'Mensagens', icon: 'fa-solid fa-envelope', component: null },
    { text: 'Ajuda', icon: 'fa-solid fa-circle-question', component: null },
    { text: 'Favoritos', icon: 'fa-solid fa-heart', component: null },
    { text: 'Carrinho', icon: 'fa-solid fa-cart-shopping', component: null },
    { text: 'Histórico', icon: 'fa-solid fa-clock-rotate-left', component: null },
    { text: 'Relatórios', icon: 'fa-solid fa-file-invoice', component: null },
    { text: 'Login', icon: 'fa-solid fa-right-to-bracket', component: null },
    { text: 'Logout', icon: 'fa-solid fa-right-from-bracket', component: null },
  ];
  
  selectItem(index: number) {
    this.selectedIndex = index;
  }

  searchTerm: string = '';

  get filteredComponents() {
    return this.components.filter(component =>
      this.normalize(component.text).includes(this.normalize(this.searchTerm))
    );
  }

  get filteredScreens() {
    return this.screens.filter(screen =>
      this.normalize(screen.text).includes(this.normalize(this.searchTerm))
    );
  }

  normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
