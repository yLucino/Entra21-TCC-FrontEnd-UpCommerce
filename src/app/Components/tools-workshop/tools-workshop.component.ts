import { Component, Input } from '@angular/core';
import { CdkService } from 'src/app/services/cdk.service';
import { AreaComponent } from 'src/app/dragAndDrop/component/area/area.component';

import { ButtonComponent } from 'src/app/dragAndDrop/component/button/button.component';
import { TextComponent } from 'src/app/dragAndDrop/component/text/text.component';
import { ComponentDragDrop } from 'src/app/interfaces/component.dragdrop.interface';
import { PropertyService } from 'src/app/services/property.service';
import { InputComponent } from 'src/app/dragAndDrop/component/input/input.component';
import { ImageComponent } from 'src/app/dragAndDrop/component/image/image.component';
import { IconComponent } from 'src/app/dragAndDrop/component/icon/icon.component';
import { LinkComponent } from 'src/app/dragAndDrop/component/link/link.component';
import { ButtonSetScreen } from 'src/app/interfaces/buttonSetScreen.interface';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-tools-workshop',
  templateUrl: './tools-workshop.component.html',
  styleUrls: ['./tools-workshop.component.css']
})
export class ToolsWorkshopComponent {
  @Input() baseDropListIds: string[] = ['homeList', 'paymentList', 'perfilList', 'configList', 'notifyList', 'messageList', 'helpList', 'favList', 'cartList', 'historyList', 'reportsList', 'loginList'];
  @Input() areaDropListIds: string[] = [];
  
  selectedScreen: ComponentDragDrop | null = null;
  screenNameTag: string = '';
  isOpen: boolean = false;
  selectedIndex: number = 1;

  constructor(private propertyService: PropertyService, private cdkService: CdkService) {}

  ngOnInit() {
    this.propertyService.setComponentData(this.components, this.screens);
  }

  get connectedDropListId(): string[] {
    return [...this.baseDropListIds, ...this.areaDropListIds];
  }

  btnsItems = [
    { text: 'Telas', icon: 'fa-solid fa-expand' },
    { text: 'Componentes', icon: 'fa-solid fa-diamond' }
  ];

  components: ComponentDragDrop[] = [
    { text: 'Área', icon: 'fa-regular fa-object-group', nameTag: 'areaComponent', description: 'Container ou seção personalizável para componentes.', component: AreaComponent },
    { text: 'Mapa', icon: 'fa-solid fa-map', nameTag: 'mapComponent', description: 'Exibe a localização geográfica com suporte a zoom e marcações.', component: null },
    { text: 'Imagem', icon: 'fa-solid fa-image', nameTag: 'imageComponent', description: 'Exibe uma  imagens de seu interesse.', component: ImageComponent },
    { text: 'Audio Player', icon: 'fa-solid fa-music', nameTag: 'audioplayComponent', description: 'Componente para tocar arquivos de áudio com controles de reprodução.', component: null },
    { text: 'Vídeo Player', icon: 'fa-solid fa-video', nameTag: 'videoplayComponent', description: 'Componente para exibir vídeos com controles de mídia.', component: null },
    { text: 'Lista Checkbox', icon: 'fa-solid fa-list-check', nameTag: 'checkboxlistComponent', description: 'Lista de itens com seleção múltipla por checkboxes.', component: null },
    { text: 'Webview', icon: 'fa-solid fa-globe', nameTag: 'graphicComponent', description: 'Permite incorporar páginas web externas no app.', component: null },
    { text: 'Gráfico', icon: 'fa-solid fa-chart-pie', nameTag: 'gra', description: 'Visualiza dados em formato gráfico (pizza, barra, linha, etc).', component: null },
    { text: 'Input', icon: 'fa-solid fa-sliders', nameTag: 'inputComponent', description: 'Conjunto de campos de entrada como texto, número, data, etc.', component: InputComponent },
    { text: 'Botão', icon: 'fa-solid fa-toggle-on', nameTag: 'buttonComponent', description: 'Componente de botão clicável com várias aparências.', component: ButtonComponent },
    { text: 'Ícone', icon: 'fa-solid fa-icons', nameTag: 'iconComponent', description: 'Permite adicionar e exibir ícones visuais no app (2.089 Icons).', component: IconComponent },
    { text: 'Notificações', icon: 'fa-solid fa-bell', nameTag: 'notifyComponent', description: 'Exibe mensagens ou alertas importantes para o usuário.', component: null },
    { text: 'Formulário', icon: 'fa-solid fa-file-lines', nameTag: 'formComponent', description: 'Agrupa inputs para envio de dados pelo usuário.', component: null },
    { text: 'Lista de Tarefas', icon: 'fa-solid fa-clipboard-list', nameTag: 'todolistComponent', description: 'Permite o gerenciamento de tarefas com marcação de status.', component: null },
    { text: 'QRCode Scanner', icon: 'fa-solid fa-qrcode', nameTag: 'qrcodeComponent', description: 'Escaneia códigos QR pela câmera do dispositivo.', component: null },
    { text: 'Código de Barras', icon: 'fa-solid fa-barcode', nameTag: 'barcodeComponent', description: 'Escaneia códigos de barras convencionais.', component: null },
    { text: 'Câmera', icon: 'fa-solid fa-camera', nameTag: 'cameraComponent', description: 'Permite capturar fotos diretamente do app.', component: null },
    { text: 'Calendário', icon: 'fa-solid fa-calendar-days', nameTag: 'calendarComponent', description: 'Exibe um calendário interativo com eventos ou datas.', component: null },
    { text: 'Localização', icon: 'fa-solid fa-location-dot', nameTag: 'locationComponent', description: 'Obtém e exibe a localização atual do dispositivo.', component: null },
    { text: 'Perfil', icon: 'fa-solid fa-user', nameTag: 'perfilComponent', description: 'Exibe ou edita as informações do perfil do usuário.', component: null },
    { text: 'Chat', icon: 'fa-solid fa-comments', nameTag: 'chatComponent', description: 'Sistema de mensagens em tempo real entre usuários.', component: null },
    { text: 'Login', icon: 'fa-solid fa-right-to-bracket', nameTag: 'loginComponent', description: 'Tela ou botão para autenticar o usuário.', component: null },
    { text: 'Logout', icon: 'fa-solid fa-right-from-bracket', nameTag: 'logoutComponent', description: 'Permite que o usuário encerre sua sessão.', component: null },
    { text: 'Dashboard', icon: 'fa-solid fa-chart-line', nameTag: 'dashboardComponent', description: 'Visão geral com indicadores e estatísticas.', component: null },
    { text: 'Relatórios', icon: 'fa-solid fa-file-invoice', nameTag: 'reportsComponent', description: 'Geração e visualização de relatórios.', component: null },
    { text: 'Ajuda', icon: 'fa-solid fa-circle-question', nameTag: 'helpComponent', description: 'Seção com informações e suporte ao usuário.', component: null },
    { text: 'Favoritos', icon: 'fa-solid fa-heart', nameTag: 'favComponent', description: 'Gerencia e exibe itens salvos como favoritos.', component: null },
    { text: 'Compartilhar', icon: 'fa-solid fa-share-nodes', nameTag: 'shareComponent', description: 'Componente para compartilhar conteúdo.', component: null },
    { text: 'Download', icon: 'fa-solid fa-download', nameTag: 'downloadComponent', description: 'Permite baixar arquivos ou informações.', component: null },
    { text: 'Upload', icon: 'fa-solid fa-upload', nameTag: 'uploadComponent', description: 'Permite enviar arquivos para o sistema.', component: null },
    { text: 'Segurança', icon: 'fa-solid fa-shield-halved', nameTag: 'securityComponent', description: 'Funcionalidades de autenticação ou proteção de dados.', component: null },
    { text: 'Scanner', icon: 'fa-solid fa-print', nameTag: 'scannerComponent', description: 'Permite escanear documentos ou imagens.', component: null },
    { text: 'Impressora', icon: 'fa-solid fa-print', nameTag: 'printComponent', description: 'Componente para envio de conteúdo à impressora.', component: null },
    { text: 'Texto', icon: 'fa-solid fa-font', nameTag: 'textComponent', description: 'Exibe textos simples ou estilizados.', component: TextComponent },
    { text: 'Link', icon: 'fa-solid fa-link', nameTag: 'linkComponent', description: 'Disponibiliza link para imagens e textos.', component: LinkComponent },
    { text: 'Pesquisa', icon: 'fa-solid fa-magnifying-glass', nameTag: 'scearhComponent', description: 'Campo de busca para localizar informações.', component: null },
    { text: 'Histórico', icon: 'fa-solid fa-clock-rotate-left', nameTag: 'historyComponent', description: 'Exibe registros de ações ou atividades.', component: null },
    { text: 'Mensagens', icon: 'fa-solid fa-envelope', nameTag: 'mesageComponent', description: 'Lista de mensagens recebidas e enviadas.', component: null },
    { text: 'Carregamento', icon: 'fa-solid fa-spinner', nameTag: 'lodingComponent', description: 'Indicador de carregamento (spinner).', component: null },
    { text: 'Tema Escuro', icon: 'fa-solid fa-moon', nameTag: 'themeComponent', description: 'Ativa o modo escuro na interface.', component: null }
  ];

  screens: ComponentDragDrop[] = [
    { text: 'Pagamento', icon: 'fa-solid fa-credit-card', nameTag: 'paymentScreen', description: 'Tela de inserção ou confirmação de pagamentos.', component: null },
    { text: 'Perfil', icon: 'fa-solid fa-user', nameTag: 'perfilScreen', description: 'Exibe ou edita informações do usuário.', component: null },
    { text: 'Configurações', icon: 'fa-solid fa-gear', nameTag: 'configScreen', description: 'Ajustes de preferências e comportamentos do app.', component: null },
    { text: 'Notificações', icon: 'fa-solid fa-bell', nameTag: 'notifyScreen', description: 'Lista de alertas e mensagens do sistema.', component: null },
    { text: 'Mensagens', icon: 'fa-solid fa-envelope', nameTag: 'messageScreen', description: 'Seção de mensagens privadas entre usuários.', component: null },
    { text: 'Ajuda', icon: 'fa-solid fa-circle-question', nameTag: 'helpScreen', description: 'Central de suporte e FAQs.', component: null },
    { text: 'Favoritos', icon: 'fa-solid fa-heart', nameTag: 'favScreen', description: 'Tela para visualizar e editar favoritos do usuário.', component: null },
    { text: 'Carrinho', icon: 'fa-solid fa-cart-shopping', nameTag: 'cartScreen', description: 'Resumo de compras ou itens selecionados.', component: null },
    { text: 'Histórico', icon: 'fa-solid fa-clock-rotate-left', nameTag: 'historyScreen', description: 'Registros de compras, navegação ou ações.', component: null },
    { text: 'Relatórios', icon: 'fa-solid fa-file-invoice', nameTag: 'reportsScreens', description: 'Tela com estatísticas e dados formatados.', component: null },
    { text: 'Login', icon: 'fa-solid fa-right-to-bracket', nameTag: 'loginScreens', description: 'Tela de entrada do sistema com autenticação.', component: null }
  ];

  selectItem(index: number) {
    this.selectedIndex = index;
  }

  searchTerm: string = '';

  get filteredComponents(): ComponentDragDrop[] {
    return this.components.filter(component =>
      this.normalize(component.text).includes(this.normalize(this.searchTerm))
    );
  }

  get filteredScreens(): ComponentDragDrop[] {
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

  trackByFn(index: number, item: ComponentDragDrop) {
    return item.nameTag;
  }

  // Function to handle actions when a screen is clicked
  askActionScreen(screen: ComponentDragDrop) {
    this.selectedScreen = screen;
    this.screenNameTag = screen.nameTag;
    this.isOpen = true;
  }

  useScreen() {
    if (this.selectedScreen) {
      const listId = this.selectedScreen.nameTag
      .replace('Screen', '')
      .toLowerCase() + 'List';

      const newButton: ButtonSetScreen = {
        screen: this.selectedScreen.nameTag,
        class: this.selectedScreen.icon,
        title: this.selectedScreen.text,
        selected: false,
        list: listId
      };

      this.cdkService.addButton(newButton);
      this.closePopUp();
    }
  }

  closePopUp() {
    this.selectedScreen = null;
    this.screenNameTag = '';
    this.isOpen = false;
  }
}
