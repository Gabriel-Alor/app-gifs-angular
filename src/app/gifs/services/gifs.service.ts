import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsAPI } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "R8FWQCHM5xGnaIaknujrk2Si4dkT6Pwr";
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {
    //TODO: UNA MANERA DE HACERLO
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
    //TODO: OTRA MANERA DE HACERLO
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  public buscarGifs( query: string = '' ){

    query = query.trim().toLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    console.log(this._historial);

    this.http.get<GifsAPI>(`https://api.giphy.com/v1/gifs/search?api_key=R8FWQCHM5xGnaIaknujrk2Si4dkT6Pwr&q=${query}&limit=10`)
        .subscribe( (resp) => {
          console.log( resp.data );
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        })

  }
}
