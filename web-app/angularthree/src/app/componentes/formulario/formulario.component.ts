import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from '@three-ts/orbit-controls';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  green=0x00ff00;
  red=0xff0000;
  blue=0x0000ff;
  flag=0;
  constructor() { }

  ngOnInit(): void {
    this.crearMundo();
  }
  crearMundo(){
    const scene = new THREE.Scene(); 
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer(); renderer.setSize( window.innerWidth, window.innerHeight ); 
    const controls = new OrbitControls( camera, renderer.domElement );
    document.body.appendChild( renderer.domElement );
    const greenCube=this.crearCubo(this.green,1,0,0);
    const redCube=this.crearCubo(this.red,1,0,0);
    const blueCube=this.crearCubo(this.blue,1,0,0);    
    camera.position.set(3,4,5);
    controls.update();
    const animate = () => {
      if(this.flag==0){
        scene.clear();
        scene.add(redCube);        
      }else if(this.flag==1){
        scene.clear();
        scene.add(greenCube);
      }else if(this.flag==2){
        scene.clear();
        scene.add(blueCube);
      }

      requestAnimationFrame( animate ); 
      controls.update();
      renderer.render( scene, camera ); 
    } 
    animate();
  }
  getRedCube(){
    this.flag=0;
  }
  getGreenCube(){
    this.flag=1;
  }
  getBlueCube(){
    this.flag=2;
  }
  crearCubo(green:any,x:number,y:number,z:number){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: green} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x,y,z);
    return cube;
  }

}
