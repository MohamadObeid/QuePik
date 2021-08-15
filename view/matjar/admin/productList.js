const productList = {
    type: 'List?id=side-bar-products-list',
    children: [{
        type: 'Item?text=Inventory;icon.name=grid',
        controls: [{
            event: 'click',
            actions: 'createActions?type=item;state=side-bar-item;id=side-bar-products-id',
        }, {
            actions: 'createControls?type=toggleView;id=admin-view;view=inventory'
        }]
    }, {
        type: 'Item?text=Brands;icon.name=bootstrap',
    }, {
        type: 'Item?text=Packages;icon.name=box-seam',
    }]
}

module.exports = {productList}