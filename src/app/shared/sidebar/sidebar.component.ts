import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent{

  get historial() {
    return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService ) { }

  public buscar( query: string ) {
    this.gifsService.buscarGifs(query);
  }

}
