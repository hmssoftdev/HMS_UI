export interface User {
    id?: number;
    userName?: string;
    email?: string;
    contact?: string;
    address?: string;
    pinCode?: number;
}

export interface City {
    id?: number;
    name: string;
}

export interface State {
    id?: number;
    name: string;
}

export interface UserFeedback {
    id?: number; //user ID
    rating?: number;
    opinionText?: string;
    reviewTitle?: string;
    termsAccept?: boolean;
    timeStamp?: string;
}