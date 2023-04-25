const Products = require('../database/models/Products');

const getAllProductsStatic = async (req, res) => {
    const products = await Products.find({ name: 'vase table' });
    res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
    const { name, company, featured, sort, fields, numericFilters } = req.query;
    const queryObject = {};

    if (featured)
        queryObject.featured = (featured === 'true' ? true : false);
    if (company)
        queryObject.company = company;
    if (name)
        queryObject.name = { $regex: name, $options: 'i' };
    if (numericFilters) {
        const operatorsMap = {
            '>': '$gt',
            '<': '$lt',
            '=': '$eq',
            '>=': '$gte',
            '<=': '$lte',
        }

        // no idea how this regex works :)        
        const regEx = /\b(>|<|=|>=|<=)\b/g;

        let filters = numericFilters.replace(regEx, (match) => {
            return `-${operatorsMap[match]}-`;
        });

        const options = ['price', 'rating'];

        filters = filters.split(',');
        filters.forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })

    }

    let result = Products.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('-createdAt');
    }
    if (fields) {
        const selectList = fields.split(',').join(' ');
        result = result.select(selectList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;

    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}