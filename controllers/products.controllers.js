const products = [
    {
        id:1,
        name:'apple phone',
        price: 300,
        in_cart: false
    },
    {
        id:2,
        name:'apple phone 2',
        price: 300,
        in_cart: false
    },
    {
        id:3,
        name:'apple phone 3',
        price: 300,
        in_cart: false
    },
]

const getProducts  = (req,res)=> {
    res.send(products)
}

module.exports = {
    getProducts
}