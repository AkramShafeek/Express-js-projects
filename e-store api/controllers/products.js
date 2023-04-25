const Products = require('../database/models/Products');

const getAllProductsStatic = async (req, res) => {
    const products = await Products.find({ name: 'vase table' });
    res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
    const { name, company, featured, sort, fields, limit } = req.query;
    const queryObject = {};

    if (featured)
        queryObject.featured = (featured === 'true' ? true : false);
    if (company)
        queryObject.company = company;
    if (name)
        queryObject.name = { $regex: name, $options: 'i' };

    let result = Products.find(queryObject);

    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else{
        result = result.sort('-createdAt');
    }
    if(fields){
        const selectList = fields.split(',').join(' ');
        result = result.select(selectList);
    }
    if(limit){
        result = result.limit(limit);
    }

    const products = await result;

    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}