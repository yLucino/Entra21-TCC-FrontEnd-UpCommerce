import { Component } from '@angular/core';

@Component({
  selector: 'app-card-layouts',
  templateUrl: './card-layouts.component.html',
  styleUrls: ['./card-layouts.component.css']
})


export class CardLayoutsComponent {
  id: number = 1;
  title: string = 'Título do Card';
  infos: string = 'Informações do card';
  tag = [{
    icon: 'z,hx,ahx',
    text: 'gratis'
  }]
  img1: string = 'https://s2.glbimg.com/ghFXiTWz85oCFk-SHWci8rrMz44=/e.glbimg.com/og/ed/f/original/2016/05/02/y3hp4en.jpg';
  img2: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwcTNTFICYY4cFwa0-Z7lWK7PI2WuEyu1vbg&s';
  img3: string = 'imagem3.png';
  
}