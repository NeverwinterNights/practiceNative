export type ProductType = {
    id: string,
    ownerId: string,
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