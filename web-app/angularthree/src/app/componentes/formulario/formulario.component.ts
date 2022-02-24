import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  green=0x00ff00;
  red=0xff0000;
  blue=0x0000ff;
  color:any;
  geometry:any;
  refresh=1;
  escala=1;
  geomActual='cubo';
  listaGeom :string[]=['cubo','cilindro', 'esfera'];
  listaColor:string[]=['rojo','verde', 'azul'];

  constructor() { }

  ngOnInit(): void {

  }

  cambioGeom(geom:string){
    switch(geom){
      case 'cubo':
        this.geometry = new THREE.BoxGeometry( this.escala, this.escala, this.escala );
        
        break;
      case 'cilindro':
        this.geometry = new THREE.CylinderGeometry( this.escala, this.escala, 2*this.escala,32 );
        break;
      case 'esfera':
        this.geometry = new THREE.SphereGeometry( this.escala,32,32 );
        break;
    }
    this.geomActual=geom;
    this.refresh=0;
  }
  cambioTam(slider:MatSliderChange){
    this.escala= Number(slider.value);
    this.cambioGeom(this.geomActual);
    this.refresh=0;
  }
  cambioColor(color:string){
    
    switch(color){
      case 'rojo':
        this.color = this.red;
        break;
      case 'verde':
        this.color = this.green;
        break;
      case 'azul':
        this.color = this.blue; 
        break;
    }
    this.refresh=0;
  }
  updateRefresh(refresh:number){
    this.refresh=refresh;
  }

}
