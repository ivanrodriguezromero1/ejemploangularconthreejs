import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
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
  flag=0;
  objeto:any;
  listaGeom:string[]=['cubo','cilindro', 'esfera'];
  listaColor:string[]=['rojo','verde', 'azul'];
  slider=0;
  escala=1;
  geomActual='cubo';
 
  constructor() { }

  ngOnInit(): void {
    this.crearMundo();
  }
  ngOnChange(){

  }
  crearMundo(){
    const scene = new THREE.Scene(); 
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    renderer.setClearColor(0xdefbfb, 1 );
    const controls = new OrbitControls( camera, renderer.domElement );
      
    (document.getElementById("renderer") as HTMLFormElement).appendChild( renderer.domElement );
    
    camera.position.set(3,4,5);
    controls.update();
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.color=this.red;

    const animate = () => {
      if(this.flag==0){
        scene.clear();
        this.crear(this.geometry,this.color,1,1,1);
        scene.add(this.objeto);
        this.flag=1;      
      }
      requestAnimationFrame( animate ); 
      controls.update();
      renderer.render( scene, camera ); 
    } 
    animate();
  }

  crear(geometry:any,colores:any,x:number,y:number,z:number){
    const material = new THREE.MeshBasicMaterial( {color: colores} );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(x,y,z);
    this.objeto=mesh;
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
    this.flag=0;
  }
  cambioColor(color:string){
    switch(color){
      case 'rojo':
        this.color = this.red;
        this.flag=0;
        break;
      case 'verde':
        this.color = this.green;
        this.flag=0;
        break;
      case 'azul':
        this.color = this.blue;
        this.flag=0;
        break;
    }
  }
  cambioTam(slider:MatSliderChange){
    this.escala= Number(slider.value);
    this.cambioGeom(this.geomActual);
    this.flag=0;
  }

}
