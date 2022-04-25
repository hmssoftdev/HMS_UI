export class graphs{
    labeldine:string;
    labelhd:string;
    labeltakeaway:string;
    bgdine?:string;
    bgdh?:string;
    bgtake?:string;
    data?:number;
    topusername?:string[]
}
export class graphsdataset{
    label?:string;
    backgroundColor?:string;
    backgroundColors?:string[];
    hoverBackgroundColor?:string[];
    data:number[];
    borderColor?:string;

}
export class graph{
    labels:string[];
    datasets:graphsdataset[];

}