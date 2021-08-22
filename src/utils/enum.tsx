export const currentDate: Date = new Date();
export const random = Math.ceil(Math.random() * Math.random());
export const duration = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
export const dateFormat = "dd";
export const dayFormat = "cccccc";

export declare type DateArray = {
    current: boolean; date: string; day: string; fullFormat: Date;
}[];

export declare type TimeArray = {
    value: string;
}[];