import { Component } from '@angular/core';

@Component({
  selector: 'app-library-layouts',
  templateUrl: './library-layouts.component.html',
  styleUrls: ['./library-layouts.component.css']
})
export class LibraryLayoutsComponent {
  projects: any = [
    {
      id: 1,
      title: 'Barbearia',
      infos: 'Layout para estabelecimentos de barbearias, venda seus produtos e mostre seus serviços.',
      tag: { icon: 'monetization_on', text: 'Grátis' },
      img: { url1: '../../../assets/images/library/barber1.png', url2: '../../../assets/images/library/barber1.png', url3: '../../../assets/images/library/barber1.png' }
    },
    {
      id: 2,
      title: 'Ecommerce',
      infos: 'Layout para ecommerces padrões, venda e gerencie de forma completa.',
      tag: { icon: 'monetization_on', text: 'Grátis' },
      img: { url1: '../../../assets/images/library/ecommerce1.png', url2: '../../../assets/images/library/ecommerce2.png', url3: '../../../assets/images/library/ecommerce3.png' }
    },
    {
      id: 3,
      title: 'Delivery',
      infos: 'Layout para estabelecimentos de alimentícios, gerencie seu delivery.',
      tag: { icon: 'monetization_on', text: 'Grátis' },
      img: { url1: '../../../assets/images/library/delivery1.png', url2: '../../../assets/images/library/delivery2.png', url3: '../../../assets/images/library/delivery3.png' }
    },
  ];
}
