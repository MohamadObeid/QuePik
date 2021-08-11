const {navbar} = require('./home/navbar')

const {searchBox} = require('./public/searchBox')
const {dropList} = require('./public/dropList')

const {adminNavbar} = require('./admin/navbar')
const {adminSidebar} = require('./admin/sidebar')
const {admin} = require('./admin/admin')
const {productList} = require('./admin/productList')
const {inventory} = require('./admin/inventory')
const {newProduct} = require('./admin/newProduct')

module.exports = {
    navbar, searchBox, adminNavbar, admin, adminSidebar, productList, inventory, newProduct, dropList
}