require('dotenv').config();

const connectToMongo = require('./database/connectToMongo')
const ProductSchema = require('./database/models/Products');
const products = require('./products.json');

const start = async () => {
    try {
        await connectToMongo(process.env.MONGO_URI);
        await ProductSchema.deleteMany();
        await ProductSchema.create(products);
        console.log('Products populated');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }    
}

start();
