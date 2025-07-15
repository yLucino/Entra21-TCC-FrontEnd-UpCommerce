import { Component } from '@angular/core';

@Component({
  selector: 'app-tools-workshop',
  templateUrl: './tools-workshop.component.html',
  styleUrls: ['./tools-workshop.component.css']
})
export class ToolsWorkshopComponent {
  selectedIndex: number = 1;

  btnsItems = [
    { text: 'Telas', icon: 'fa-solid fa-expand' },
    { text: 'Componentes', icon: 'fa-solid fa-diamond' }
  ];

  components = [
    { text: 'Mapa', icon: 'fa-solid fa-map' },
    { text: 'Galeria', icon: 'fa-solid fa-images' },
    { text: 'Audio Player', icon: 'fa-solid fa-music' },
    { text: 'Vídeo Player', icon: 'fa-solid fa-video' },
    { text: 'Lista Checkbox', icon: 'fa-solid fa-list-check' },
    { text: 'Webview', icon: 'fa-solid fa-globe' },
    { text: 'Gráfico', icon: 'fa-solid fa-chart-pie' },
    { text: 'Inputs', icon: 'fa-solid fa-sliders' },
    { text: 'Botões', icon: 'fa-solid fa-toggle-on' },
    { text: 'Ícones', icon: 'fa-solid fa-icons' },
    { text: 'Notificações', icon: 'fa-solid fa-bell' },
    { text: 'Formulário', icon: 'fa-solid fa-file-lines' },
    { text: 'Lista de Tarefas', icon: 'fa-solid fa-clipboard-list' },
    { text: 'QRCode Scanner', icon: 'fa-solid fa-qrcode' },
    { text: 'Código de Barras', icon: 'fa-solid fa-barcode' },
    { text: 'Câmera', icon: 'fa-solid fa-camera' },
    { text: 'Calendário', icon: 'fa-solid fa-calendar-days' },
    { text: 'Localização', icon: 'fa-solid fa-location-dot' },
    { text: 'Perfil', icon: 'fa-solid fa-user' },
    { text: 'Chat', icon: 'fa-solid fa-comments' },
    { text: 'Login', icon: 'fa-solid fa-right-to-bracket' },
    { text: 'Logout', icon: 'fa-solid fa-right-from-bracket' },
    { text: 'Dashboard', icon: 'fa-solid fa-chart-line' },
    { text: 'Relatórios', icon: 'fa-solid fa-file-invoice' },
    { text: 'Ajuda', icon: 'fa-solid fa-circle-question' },
    { text: 'Favoritos', icon: 'fa-solid fa-heart' },
    { text: 'Compartilhar', icon: 'fa-solid fa-share-nodes' },
    { text: 'Download', icon: 'fa-solid fa-download' },
    { text: 'Upload', icon: 'fa-solid fa-upload' },
    { text: 'Segurança', icon: 'fa-solid fa-shield-halved' },
    { text: 'Scanner', icon: 'fa-solid fa-print' },
    { text: 'Impressora', icon: 'fa-solid fa-print' },
    { text: 'Tempo', icon: 'fa-solid fa-cloud-sun' },
    { text: 'Pesquisa', icon: 'fa-solid fa-magnifying-glass' },
    { text: 'Histórico', icon: 'fa-solid fa-clock-rotate-left' },
    { text: 'Mensagens', icon: 'fa-solid fa-envelope' },
    { text: 'Carregamento', icon: 'fa-solid fa-spinner' },
    { text: 'Tema Escuro', icon: 'fa-solid fa-moon' }
  ];

  screens = [
    { text: 'Home', icon: 'fa-solid fa-house' },
    { text: 'Pagamento', icon: 'fa-solid fa-credit-card' },
    { text: 'Perfil', icon: 'fa-solid fa-user' },
    { text: 'Configurações', icon: 'fa-solid fa-gear' },
    { text: 'Notificações', icon: 'fa-solid fa-bell' },
    { text: 'Mensagens', icon: 'fa-solid fa-envelope' },
    { text: 'Ajuda', icon: 'fa-solid fa-circle-question' },
    { text: 'Favoritos', icon: 'fa-solid fa-heart' },
    { text: 'Carrinho', icon: 'fa-solid fa-cart-shopping' },
    { text: 'Histórico', icon: 'fa-solid fa-clock-rotate-left' },
    { text: 'Relatórios', icon: 'fa-solid fa-file-invoice' },
    { text: 'Login', icon: 'fa-solid fa-right-to-bracket' },
    { text: 'Logout', icon: 'fa-solid fa-right-from-bracket' },
  ];
  
  selectItem(index: number) {
    this.selectedIndex = index;
  }
}
