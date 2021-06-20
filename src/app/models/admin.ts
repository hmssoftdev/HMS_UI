export class Admin{
  constructor(
public businessName?:string,
public category?: string,
public gst?: string,
public address?: string,
public foodLincNum?: string,
public id?: number,
public pincode?: number,
public restaurentLogo?:string,
public restaurentSeal?:string,
public signature?:string,
public termAndCondition?:string,
public bankDetails?: Bankdetails
  ){}
}
export class Bankdetails {
  constructor(
    public accountName?: string,
    public accountNumber?: number,
    public bankName?: string,
    public ifscCode?: string,
    public UPICodeImg?:string,
    public UPICodeNumber?:string){}
  }