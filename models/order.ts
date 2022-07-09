import {ModifiedCartItems} from "../types/types";

export class Order {
    constructor(public id: string, public items: ModifiedCartItems, public totalAmount: number, public date: Date) {
    }
}