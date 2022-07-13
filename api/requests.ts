import axios from "axios";

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
    createProd(title: string, description: string, imageUrl: string, price: number) {
        return instance.post("/products.json", {
            title,
            description,
            imageUrl,
            price
        })
    },
    updateProd(id: string, title: string, description: string, imageUrl: string) {
        return instance.patch(`/products/${id}.json`, {
            title,
            description,
            imageUrl
        })
    },
    deleteProd(id: string) {
        return instance.delete(`/products/${id}.json`, {
            headers: {},
        })
    }

}