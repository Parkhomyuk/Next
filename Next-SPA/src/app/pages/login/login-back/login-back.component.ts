import { Component, OnInit ,AfterViewInit, ElementRef, ViewChild,HostListener, Renderer} from '@angular/core';


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

  @HostListener('click', ['$event'])
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
  constructor(private el: ElementRef,
              private renderer: Renderer) {


  }

  ngOnInit() {
    this.onResize();
    console.log('width',this.screenWidth+' === '+'height',this.screenHeight)
    //noinspection TypeScriptUnresolvedVariable
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.create_window_hexagons();

   /* this.context.canvas.width=this.screenWidth+this.size;
    this.context.canvas.height=this.screenHeight+this.size;
    let xx=0;
    let yy=0;
    this.countWidth=Math.floor(this.screenWidth/this.size);
    this.countHeight=Math.floor(this.screenHeight/this.size*1.5);

    for(let i=0;i<this.countHeight;i++){
      this.create_hexagonsRow(xx,yy);
      yy=yy+this.size*1.8;
    }*/
  }
  ngAfterViewInit() {
    this.onResize();
    // wait a tick to avoid one-time devMode
    // unidirectional-data-flow-violation error
    //noinspection TypeScriptUnresolvedVariable
    //setTimeout(_ => this.divWidth = this.parentDiv.nativeElement.clientWidth);
  }

  hexagon(ss,yy){
    this.context.beginPath();
    this.context.fillStyle = "#0E3556";
    this.context.moveTo(ss+this.x + this.size * Math.cos(0), yy+this.y + this.size * Math.sin(0));
   /* if((ss+this.x)>720 && (yy+this.y)> 500&&(yy+this.y)<800 && (ss+this.x)<1400){
      this.context.fillStyle = "green";
    }*/
    this.hex = new Path2D();
    for (this.side; this.side <7; this.side++) {

      //  this.context.lineTo(ss+this.x + this.size * Math.cos(this.side * 2 * Math.PI / 6), yy+this.y + this.size * Math.sin(this.side * 2 * Math.PI / 6));
      this.hex .lineTo(ss+this.x + this.size * Math.cos(this.side * 2 * Math.PI / 6)*0.98, yy+this.y + this.size * Math.sin(this.side * 2 * Math.PI / 6)*0.98);
      this.hex.x=ss+this.x;


    }

    this.arr.push(this.hex );

    this.context.fill(this.hex );

    this.side = 0;
    this.context.closePath();
    this.context.fillStyle = "#0E3556";


    this.context.lineWidth=0.5;
    this.context.stroke();
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
  onClickHexagon(){

  }



}
