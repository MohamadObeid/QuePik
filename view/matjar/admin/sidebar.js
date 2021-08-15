const adminSidebar = {
    type: 'View?toChildren.state=side-bar-item;toChildren.featured',
    style: {
        padding: '0.5rem 0.2rem',
        boxShadow: '0px 0px 5px 0px #888',
        clipPath: 'inset(0 -5px 0 0)',
        width: '17%',
        position: 'fixed',
        height: '90%',
        display: 'display',
        flexDirection: 'column',
    },
    children: [{
        type: 'Item?text=Dashboard;icon.name=house-door;chevron.style.display=none;mountOnLoad'
    }, {
        type: 'Item?text=Orders;icon.name=cart3',
    }, {
        type: 'Item?text=Products;icon.name=tag;id=side-bar-products-id',
        controls: [{
            actions: 'createControls?type=list;id=side-bar-products-list',
        }]
    }, {
        type: 'Item?text=Collections;icon.name=collection',
    }, {
        type: 'Item?text=Customers;icon.name=people',
    }, {
        type: 'Item?text=Shipping & Delivery;icon.name=truck',
    }, {
        type: 'Item?text=Finance & Payment;icon.name=credit-card',
    }, {
        type: 'Item?text=Marketing & SEO;icon.name=megaphone',
    }, {
        type: 'Item?text=Analytics & Reports;icon.name=clipboard-data'
    }, {
        type: 'Item?text=Inbox;icon.name=chat-left-text',
    }, {
        type: 'Item?text=Website;icon.name=layout-wtf',
    }, {
        type: 'Item?text=Settings;icon.name=gear',
    }]
}

module.exports = {adminSidebar}