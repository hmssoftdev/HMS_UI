import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'primeng/tooltip';
// import { ButtonsModule } from 'ngx-bootstrap/buttons'; 
import { ModalModule } from 'ngx-bootstrap/modal'; 
import {CarouselModule} from 'primeng/carousel';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {InputSwitchModule} from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea'; 
import { SelectButtonModule } from 'primeng/selectbutton';
import {TagModule} from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import {CardModule} from 'primeng/card';
import {RippleModule} from 'primeng/ripple';
import {DataViewModule} from 'primeng/dataview';
import {AvatarModule} from 'primeng/avatar';
import {TabViewModule} from 'primeng/tabview';
import { TimelineModule } from "primeng/timeline";
import { OrderStatusComponent } from './order-status/order-status.component';
@NgModule({
  declarations: [
    OrderStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ChartsModule,
    BsDropdownModule,
    CardModule,
    CarouselModule,
    TooltipModule,
    //ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    CheckboxModule,    
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SelectButtonModule,
    TagModule,
    InputMaskModule,
    RippleModule,
    DataViewModule,
    AvatarModule,
    TabViewModule,
    TimelineModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    BsDropdownModule,
    TooltipModule,
    // ButtonsModule,
    ModalModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    CheckboxModule,    
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule ,
    InputSwitchModule,
    SelectButtonModule,
    TagModule,
    InputMaskModule,
    RippleModule,
    DataViewModule,
    AvatarModule,
    TabViewModule,
    TimelineModule,
    OrderStatusComponent
  ],
  providers:[MessageService, ConfirmationService]
})
export class SharedModule { }
