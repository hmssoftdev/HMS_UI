export interface setting{
    id?: number,
    isActive?: boolean,
    createdOn?: string,
    createdBy?: number,
    updatedOn?: string,
    updatedBy?: number,
    userId?: number,
    theme?: number,
    menuDisplay?: number,
    billWithGST?: number,
    billWithCustomer?: number,
    billWithLOGO?: number,
    billWithSign?: number,
    billWithSeal?: number,
    language?:string,
    activeOrderFlow? :number,
    directKOTBillPrint?:number;

    billPrintAndKOT?:number;
    billPrintAndKOTDining?:number;
    billPrintAndKOTHomeDelivery?:number;
    billPrintAndKOTTakeAway?:number;


}
export interface language{
    name:string;
}


   

