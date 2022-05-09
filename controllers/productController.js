const ProductModel = require('../models/Product')

module.exports.getAll = async function (req, res) {
    try {
        const products = await ProductModel.find();
        res.status(200).render('products', {mydata: products})
    } catch(error) {
        res.status(404).render('products', {mydata: error.message})
    }
}

module.exports.addProduct = async function (req, res) {
    const candidate = await ProductModel.findOne({name: req.body.name});
    if (candidate) {
        res.status(404).json({
            message: 'This product already added'
        })
    } else {
        if (!candidate.name || !candidate.price){
            return res.status(400).json({
                message: "Enter required parameters"
            })
        }
        const product = new ProductModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            productImg: req.body.productImg
        });
        try {
            console.log(req.body);
            await ProductModel.save();
            res.status(201).json(product)
        } catch (err) {
            res.status(404).json({
                message: "Error"
            })
        }
    }
}

module.exports.updateProduct = async function(req, res){
    if (!req.body.name){
        return res.status(400).json({
            message: "Required Name"
        })
    }
    const product = await ProductModel.findOne({name: req.body.name}).exec();
    if (!product) {
        return res.status(204).json({
            message: `Not Found ${req.body.name}`
        })
    }

    if (req.body?.name) product.name = req.body.name;
    if (req.body?.price) product.price = req.body.price;

    const result = await product.save();
    res.json(result);
}

module.exports.deleteProduct = async function (req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            message: "Required Name"
        })
    }
    const product = await ProductModel.findOne({name: req.body.name}).exec();
    if (!product) {
        return res.status(204).json({
            message: `Not Found ${req.body.name}`
        })
    }
    const result = await product.deleteOne({name: req.body.name});
    res.json(result);
}

module.exports.sorted = function(req, res){

}

module.exports.reverseSorted = function(req, res){

}

module.exports.forWoman = function(req, res){

}

module.exports.forMan = function(req, res){

}
