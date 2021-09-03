import { Binary } from "@angular/compiler";

export interface Dish {
    id?: number;
    name?: string;
    description?: string | undefined;
    halfPrice?: number;
    fullPrice?: number;
    image?: any
    isVeg?: boolean;
    imageUrl?: any;
    nonVegCategory?: string;
    selectedCategory?: string;
    mainCategoryId?: number;
    cookingTime?: any;
    minHr?: string;
    status?: string;
    categories?: string;
    quantity?: any;
    serviceTime?: number;
    bookmark?: boolean;
    dishCategory?:string;
    files?: Binary;
    upi?: string;
    oldImageUrl?:string;
    isFullIsHalf?: boolean;
}

export class DishCategory {
    constructor(
        public id?: number,
        public name?: string,
        public isActive?: boolean,
        public gstCompliance?: number,
        public status?: string
    ) { }
}

