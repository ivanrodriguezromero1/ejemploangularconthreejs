import { Component, Input,Output,EventEmitter, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements OnInit {
  
  @Input('color') color:any;//typeof color
  @Input('geometry') geometry:any;
  @Input('refresh') refresh=0;
  @Input('escala') escala=1;
  @Input('geomActual') geomActual='cubo';
  @Output() newRefresh= new EventEmitter();
  objeto : any;
  camera : any;
  renderer:any;

  constructor() { }

  ngOnInit(): void {
    this.crearMundo();
  }
  crearMundo(){
    const scene = new THREE.Scene(); 
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    this.renderer.setClearColor(0xdefbfb, 1 );
    const controls = new OrbitControls( this.camera, this.renderer.domElement );
      
    (document.getElementById("renderer") as HTMLFormElement).appendChild( this.renderer.domElement );
    
    this.camera.position.set(3,4,5);
    controls.update();
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.color=0xff0000;
    this.refresh=0;
    this.addEventResize();
    const animate = () => {
    if(this.refresh==0){
        scene.clear();
        this.crear(this.geometry,this.color,1,1,1);
        scene.add(this.objeto);
        this.refresh=1;
        this.newRefresh.emit(1);
      }
 
      requestAnimationFrame( animate );
      
      controls.update();
      this.renderer.render( scene, this.camera ); 
    }
    animate();

  }
  crear(geometry:any,colores:any,x:number,y:number,z:number){
    const material = new THREE.MeshBasicMaterial( {color: colores} );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(x,y,z);
    this.objeto=mesh;
  }
  addEventResize(){
    window.addEventListener('resize',()=>{
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );  
    });
  }

}
