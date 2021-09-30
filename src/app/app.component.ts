import { Component } from '@angular/core';
import { ServiceService } from './services/service.service';
import { TextSelectEvent } from "./text-select.directive";

interface SelectionRectangle {
	left: number;
	top: number;
	width: number;
	height: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FETest';
  textSelectedLabel=[{}];
  public hostRectangle: SelectionRectangle | null = null;
  labels =[{
    id:0,
    label:"Vide"
  }];
  newid=1
selectedRadioButton:String="";
text:String ="Martinus agens illas provincias pro praefectis aerumnas innocentium graviter gemens saepeque obsecrans, ut ab omni culpa inmunibus parceretur, cum non inpetraret, minabatur se discessurum: ut saltem id metuens perquisitor malivolus tandem desineret quieti coalitos homines in aperta pericula proiectare."


constructor( private service : ServiceService) {



	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I render the rectangles emitted by the [textSelect] directive.
	public renderRectangles( event: TextSelectEvent ) : void {
    if (event.text!=""){
      let textselected = {
        start:this.text.search(event.text),
        end: this.text.search(event.text)+event.text.length,
        label: this.selectedRadioButton,
        text:event.text
        };
      this.textSelectedLabel.push(textselected);

    }

	}

  add(label:any){
    let newlabel = {
      id:this.newid,
      label: label

    };
    this.labels.push(newlabel);
    this.newid=+1

  }
  changeselectedlabel(event:any){
    this.selectedRadioButton= event.srcElement.value;
    //console.log(getElementById(event.srcElement.id).value);
  }
  sendJson(){
    this.textSelectedLabel.shift()
      let json= {
          document : this.text,
          annotation : this.textSelectedLabel
        }
    console.log(json)
    this.service.sendJson(json).subscribe(
      resp=>{
        console.log("Json file generated")
      }, err=>{
        console.log(err);
        console.log("Error");
      }
    )
  }
}
