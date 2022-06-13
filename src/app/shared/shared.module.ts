
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'primeng/tooltip';
// import { ButtonsModule } from 'ngx-bootstrap/buttons'; 
import { ModalModule } from 'ngx-bootstrap/modal'; 
import {CarouselModule} from 'primeng/carousel';
import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ChartModule} from 'primeng/chart';
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
import { UserFormComponent } from '../views/user/user-form/user-form.component';
import { ClickOutsideDirective } from './../directive/click-outside.directive';
import { InvoiceComponent } from '../views/invoice/invoice.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TranslateService } from "@ngx-translate/core";
import {ToggleButtonModule} from 'primeng/togglebutton';
import {AccordionModule} from 'primeng/accordion';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TreeModule} from 'primeng/tree';
import {FieldsetModule} from 'primeng/fieldset';
@NgModule({
  declarations: [
    OrderStatusComponent,
    UserFormComponent,
    InvoiceComponent,
    ClickOutsideDirective,
    
    

  ],
  imports: [
    
    TieredMenuModule,
    TreeModule,
    FieldsetModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ChartModule,
    BsDropdownModule,
    CardModule,
    ChartModule,
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
    DynamicDialogModule,
    RippleModule,
    DataViewModule,
    AvatarModule,
    TabViewModule,
    TimelineModule,
    ChartModule,
    ProgressSpinnerModule,
    ToggleButtonModule,
    AccordionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports:[
    CommonModule,
    FieldsetModule,
    TieredMenuModule,
    TreeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartModule,
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
    DynamicDialogModule,
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
    OrderStatusComponent,
    UserFormComponent,
    InvoiceComponent,
    ClickOutsideDirective,
    ProgressSpinnerModule,
    ChartModule,
    ToggleButtonModule,
    AccordionModule,
    TranslateModule,
  ],
  providers:[MessageService, ConfirmationService,TranslateService]
})
export class SharedModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}