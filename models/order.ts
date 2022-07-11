import {ModifiedCartItems} from "../types/types";

export class Order {
    constructor(public id: string, public items: ModifiedCartItems[], public totalAmount: number, public date: Date) {
    }
    get correctDate() {
        return this.date.toLocaleString("en-EN", {
            year:"numeric",
            month:"long",
            day:"numeric",
            hour:"2-digit",
            minute:"2-digit",
        })
    }
}