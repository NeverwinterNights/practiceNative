export type ProductType = {
    id: string,
    ownerId: string | null | undefined,
    title: string,
    imageUrl: string,
    description: string,
    price: number
}



export type ModifiedCartItems = {
    productId: string,
    title: string,
    price: number,
    quantity:number,
    sum:number,
}

export type OrdersType = {
    [key:string]: {
        "cartItem":ModifiedCartItems[],
        date: string
        totalAmount:number
    }
}

