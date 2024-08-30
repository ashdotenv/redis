export const getProducts = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({
                products: [
                    {
                        id: 1,
                        name: "Product 1",
                        price: 100
                    }
                ]
            })
        }, 2000);
    })
}