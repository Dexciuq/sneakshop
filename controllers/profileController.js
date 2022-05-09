const Model = require('../models/User')
module.exports.profile = async function (req, res) {
    res.render('profile.ejs')
}

module.exports.editProfile = function(req, res){
    res.render('editProfile.ejs')
}

module.exports.getOrders = function(req, res){
    res.render('getOrders.ejs')
}

module.exports.deleteProfile = function(req, res){
}