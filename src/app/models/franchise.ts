export interface franchis {
     id?: number,
     isActive?:boolean,
     createdOn?:string ,
     createdBy?: string,
     updatedOn?:string ,
     updatedBy?: string,
     userName?:string ,
     password?:string ,
     email?:string ,
     businessName?:string,
     foodLincNum?:string ,
     gst?:string ,
     cityId?: number,
     city?:string ,
    stateId?: number,
    state?:string,
     pinCode?:string ,
     isFranchise?: number,
     parentCompanyId?: number,
     address?:string,
     franchiseAdminId?: number
     result?:string
     contact?:number;
     name?:string;
}
export interface captain{
    id?:number,
    isActive?:boolean,
    createdOn?:number,
    createdBy?:number,
    updatedOn?:number,
    updatedBy?:number,
    result?:string,
    user?:{
      id?:number,
      isActive?:boolean,
      createdOn?:string,
      createdBy?:number,
      updatedOn?:string,
      updatedBy?:number,
      name?:string,
      userType?: number,
      userName?:string,
      email?:string,
      contact?:string,
      password?:string,
      address?:string,
      cityId?:number,
      stateId?:number,
      city?:string,
      state?:string,
      pinCode?:string,
      resetPasswordLink?:string,
      isEmailVerified?:string,
      isFranchiseAdmin?:number,
      iscaptain?:number
    },
    tableList?: [
      {
        id?:number,
        isActive?:boolean,
        createdOn?: string,
        createdBy?:number,
        updatedOn?:string,
        updatedBy?:string,
        name?:string,
        seat?:number,
        isAc?:boolean,
        shape?: string,
        barcodeTest?: string,
        isBooked?: boolean,
        captainId?: number
      }
    ]
}