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
    billWithSeal?: number
}
export interface language{
    lang?:string;
}