import { Component, OnInit ,AfterViewInit, ElementRef, ViewChild,HostListener, Renderer} from '@angular/core';
import {Observable, interval} from "rxjs";


@Component({
  selector: 'app-login-back',
  templateUrl: './login-back.component.html',
  styleUrls: ['./login-back.component.scss']
})
export class LoginBackComponent implements OnInit , AfterViewInit {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  @ViewChild('widgetParentDiv') parentDiv:ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if(event){
      console.log('resize ', event.target.outerWidth);
      console.log('resize ', event.target.outerHeight);
      this.screenWidth = event.target.outerWidth;
      this.screenHeight =  event.target.outerHeight;
      this.create_window_hexagons();
    }


      //noinspection TypeScriptUnresolvedVariable
      this.divWidth = this.parentDiv.nativeElement.clientWidth;

  }

  @HostListener('mouseenter', ['$event'])
  onMouseenter(event: MouseEvent): void  {
    console.log(event.screenX);
    console.log(event.screenY);
    console.log('context',this.context.isPointInPath(this.hex, event.clientX, event.clientY));

    if (this.context.isPointInPath(this.hex, event.clientX, event.clientY)) {
      this.context.fillStyle = 'green';
    }
    else {
      this.context.fillStyle = 'red';
    }
  }


  private divWidth  = 0;
  public context: CanvasRenderingContext2D;
  private screenHeight:any=0
  private screenWidth:any=0
  x: number=20;
  y: number=20;

  side: number=0;
  size: number=20;

  countWidth:number=0;
  countHeight:number=0;
  arr:any[]=[];
  hex: any;
  color:string="#0E3556";
  changeColor: any;
  //colorArray:string[]=[ "rgb(36, 0, 0)","rgb(46, 0, 0)","rgb(56, 0, 0)","rgb(66, 0, 0)","rgb(56, 0, 0)","rgb(46, 0, 0)","rgb(36, 0, 0)","rgba(5, 0, 0, 1)"];
  colorArray:string[]=[ "rgb(26, 0, 0)","rgb(36, 0, 0)","rgb(46, 0, 0)","rgb(56, 0, 0)","rgb(46, 0, 0)","rgb(36, 0, 0)","rgb(26, 0, 0)","rgba(5, 0, 0, 1)"];
  constructor(private el: ElementRef,
              private renderer: Renderer) {


  }

  ngOnInit() {
    this.onResize();
    console.log('width',this.screenWidth+' === '+'height',this.screenHeight)
    //noinspection TypeScriptUnresolvedVariable
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    let countColor=0;
    this.create_window_hexagons();
    this.changeColor = setInterval(() => {
      if(countColor>=this.colorArray.length){
        countColor=0;
      }
      //this.color=this.colorArray[countColor];
      //noinspection TypeScriptUnresolvedVariable
      this.parentDiv.nativeElement.style.backgroundColor=this.colorArray[countColor];
      this.create_window_hexagons();

      countColor++;

    }, 1000);


  }
  ngOnDestroy() {
    clearInterval(this.changeColor);
  }
  ngAfterViewInit() {
    this.onResize();

  }


  hexagon(ss,yy){

    this.context.beginPath();

     // this.context.fillStyle = "rgba(0, 186, 255, 0.84)";

      this.context.fillStyle = this.color;



    this.context.moveTo(ss+this.x + this.size * Math.cos(0), yy+this.y + this.size * Math.sin(0));

    this.hex = new Path2D();
    for (this.side; this.side <7; this.side++) {


      this.hex .lineTo(ss+this.x + this.size * Math.cos(this.side * 2 * Math.PI / 6)*0.98, yy+this.y + this.size * Math.sin(this.side * 2 * Math.PI / 6)*0.98);
      this.hex.x=ss+this.x;


    }

    this.arr.push(this.hex );

    this.context.fill(this.hex );

    this.side = 0;
    this.context.closePath();



   /* this.context.lineWidth=0.5;
    this.context.stroke();*/
  }
  create_hexagonsRow(x,y){
    let yInternal=y;
    for (let i=0; i < this.countWidth; i++) {
      if(y>yInternal){
        y=yInternal;
      }else{
        y=yInternal+this.size*1*0.90;
      }

      this.hexagon(x,y)

      x=x+this.size*1.5;
    }
  }
  create_window_hexagons(){
    this.context.canvas.width=this.screenWidth+this.size;
    this.context.canvas.height=this.screenHeight+this.size;
    let xx=0;
    let yy=0;
    this.countWidth=Math.floor(this.screenWidth/this.size);
    this.countHeight=Math.floor(this.screenHeight/this.size*1.5);

    for(let i=0;i<this.countHeight;i++){
      this.create_hexagonsRow(xx,yy);
      yy=yy+this.size*1.8;
    }
  }




}
