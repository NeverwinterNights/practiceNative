import axios from "axios";
import {ModifiedCartItems} from "../types/types";

const instance = axios.create({
    baseURL: "https://native-36fa9-default-rtdb.europe-west1.firebasedatabase.app/",
    headers: {
        "Content-Type": "application/json",
    },
})


export const apiRequests = {
    fetchProducts() {
        return instance.get("/products.json", {
            headers: {},
        })
    },
    createProd(title: string, description: string, imageUrl: string, price: number, token: string | null | undefined, ownerID: string | null | undefined) {
        return instance.post(`/products.json?auth=${token}`, {
            title,
            description,
            imageUrl,
            price,
            ownerID
        })
    },
    updateProd(id: string, title: string, description: string, imageUrl: string, token: string | null | undefined) {
        return instance.patch(`/products/${id}.json?auth=${token}`, {
            title,
            description,
            imageUrl
        })
    },
    deleteProd(id: string, token: string | null | undefined) {
        return instance.delete(`/products/${id}.json?auth=${token}`, {
            headers: {},
        })
    },
    // createOrder(cartItem: ModifiedCartItems[], totalAmount: number, date: string, token: string | null | undefined, userID: string | null | undefined) {
    createOrder(cartItem: ModifiedCartItems[], totalAmount: number, date: string, token: string | null | undefined, userID: string | null | undefined) {
        return instance.post(`/orders/${userID}.json?auth=${token}`, {
            cartItem,
            totalAmount,
            date: new Date().toString()
        })
    },
    // getOrders(userID: string | null | undefined) {
    getOrders(userID: string | null | undefined) {
        console.log(userID);
        return instance.get(`/orders/${userID}.json`, {
            headers: {},
        })
    }

}