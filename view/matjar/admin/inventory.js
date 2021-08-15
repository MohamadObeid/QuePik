const inventory = {
    type: 'View?remove.DATA',
    actions: 'search?state=products-table;query.collection=product;id=products-table',
    children: [{
        type: 'View?class=flex-box;style.width=100%;style.marginBottom=2.5rem;style.justifyContent=space-between',
        children: [{
            type: 'Text?text=Inventory;style.fontSize=1.8rem;style.color=#444;style.fontWeight=500'
        }, {
            type: 'View?class=flex-box',
            children: [{
                type: 'Button?text=Import;icon.name=download;style.marginRight=1rem',
                tooltip: 'Import multiple products to store at once',
            }, {
                type: 'Button?text=Export;icon.name=upload;style.marginRight=1rem',
                tooltip: 'Export all products to a CSV file',
            }, {
                type: 'Button?text=New Product;icon.name=plus;style.marginRight=1rem',
                tooltip: 'Create a new product',
                controls: [{
                    actions: 'createControls?type=toggleView;id=admin-view;view=newProduct'
                }]
            }]
        }]
    }, {
        type: 'View?style.padding=1rem;style.borderRadius=.5rem;style.border=1px solid #eee',
        children: [{
            type: 'View?class=flex-box;style.paddingBottom=1rem;style.borderBottom=1px solid #eee',
            children: [{
                type: 'Input?featured;!removable;!clearable;icon.name=search;icon.style.fontSize=1.8rem;search.id=products-table;search.state=products-table;search.query.collection=const.product;search.query.all=const.element.value;placeholder-ar=...إبحث عن الإسم، الصنف، الماركة',
                placeholder: 'Search by name, collection, category, brand...',
                style: {
                    height: '4rem',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    color: '#666',
                    borderRadius: '.75rem',
                    marginRight: '1rem'
                }
            }, {
                type: 'Button?text=Filter;icon.name=funnel',
            }, {
                type: 'Button?text=Collection;icon.name=ui-checks-grid',
            }, {
                type: 'Button?text=Category;icon.name=bookmarks;dropList.items=[Categories:readOnly,state.category-list.name];search.state=products-admin;search.query.collection=const.product;search.query.category=const.value.data',
            }, {
                type: 'Button?text=Brand;icon.name=bootstrap;dropList.items=[Brands:readOnly,state.brand-list.name]',
            }, {
                type: 'Button?text=View;icon.name=list-ul',
            }]
        }, {
            type: 'View?style.padding=1rem;style.width=100%',
            children: [{
                type: 'Table?style.width=100%',
                children: [{
                    type: 'Row?class=flex-box;toChildren.sort.state=products-table;toChildren.sort.id=products-table;toChildren.featured=true',
                    style: {
                        height: '5rem',
                        fontSize: '1.4rem',
                        fontWeight: '400',
                        color: '#444',
                        textAlign: 'Left',
                        borderBottom: '1px solid #eee',
                    },
                    children: [{
                        type: 'Header?text=Image;style.width=6rem',
                    }, {
                        type: 'Header?path=nameEn;text=Name;style.width=25rem',
                    }, {
                        type: 'Header?path=discount;text=Discount;style.wdith=6rem',
                    }, {
                        type: 'Header?path=priceLbp;text=Price;style.width=10rem;style.justifyContent=flex-end',
                    }, {
                        type: 'Header?path=countInStock;text=Stock;style.width=7rem;style.justifyContent=center',
                    }, {
                        type: 'Header?path=active;text=Status;style.width=10rem;style.justifyContent=center',
                    }, {
                        type: 'Header?text=Actions;style.flex=1',
                    }]
                }]
            }, {
                type: 'View?id=products-table;t=true',
                actions: [
                    'setStyle?style.display=none?!value.data',
                    'setStyle?style.display=initial;t?value.data',
                    'setValue?value.DATA=state.products-table?state.products-table'
                ],
                children: [{
                    type: 'View?class=flex-box',
                    style: {
                        textAlign: 'start',
                        justifyContent: 'flex-start',
                        fontSize: '1.4rem',
                        color: '#444',
                        borderBottom: '1px solid #eee',
                        height: '5rem',
                        after: { backgroundColor: '#daeffe' }
                    },
                    controls: [{
                        event: 'mouseenter',
                        actions: 'mountAfterStyles'
                    }, {
                        event: 'mouseleave',
                        actions: 'resetStyles'
                    }],
                    children: [{
                        type: 'View?path=image;class=flex-box;style.width=6rem',
                        children: [{
                            type: 'Image?style.borderRadius=5rem;style.maxWidth=4rem;style.maxHeight=4rem'
                        }]
                    }, {
                        type: 'View?path=nameEn;style.width=25rem',
                        children: [{
                            type: 'Text',
                            tooltip: '?text=value.element.innerHTML;placement=right;width=25rem',
                            style: {
                                width: 'fit-content',
                                maxWidth: '25rem',
                                overflowX: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }
                        }]
                    }, {
                        type: 'View?path=discount;class=flex-box;style.width=6rem;style.maxWidth=6rem;style.color=red',
                        children: [{
                            type: 'Text?style.marginRight=.1rem',
                        }, {
                            type: 'Text?text=%',
                            actions: `setValue?value.text=''?!value.data`
                        }]
                    }, {
                        type: 'View?path=priceLbp;class=flex-box;style.width=10rem;style.justifyContent=flex-end',
                        children: [{
                            type: 'Text?style.marginRight=.2rem',
                            actions: 'toNumber'
                        }, {
                            type: 'Text?text=L.L'
                        }]
                    }, {
                        type: 'View?path=countInStock;class=Stock flex-box;style.width=7rem',
                        children: [{
                            type: 'Text',
                        }]
                    }, {
                        type: 'View?path=active;class=Status flex-box;style.width=10rem',
                        children: [{
                            type: 'View?class=flex-box',
                            style: {
                                padding: '0.2rem 0.8rem',
                                backgroundColor: '#f0c040',
                                borderRadius: '1.5rem',
                                cursor: 'pointer'
                            },
                            children: [{
                                type: 'Text?text=Active;style.color=#fff;style.fontSize=1.2rem'
                            }, {
                                type: 'Icon?icon.name=chevron-down',
                                style: {
                                    color: '#fff',
                                    marginTop: '0.3rem',
                                    fontSize: '1.2rem',
                                    marginLeft: '0.4rem',
                                    transition: 'transform 0.2s'
                                }
                            }]
                        }]
                    }, {
                        type: 'View?class=flex-box;style.justifyContent=flex-end;style.flex=1',
                        children: [{
                            type: 'Icon?class=flex-box actions-list;icon.name=three-dots',
                            style: {
                                cursor: 'pointer',
                                color: '#116dff',
                                fontSize: '2.5rem',
                                height: '3.5rem',
                                width: '3.5rem',
                                borderRadius: '3.5rem',
                                transition: 'all 0.2s',
                                marginRight: '1rem',
                                after: { backgroundColor: '#fff' }
                            },
                            controls: [{
                                actions: 'createControls?type=list;id=actions-list;placement=left'
                            }, {
                                event: 'mouseenter',
                                actions: 'mountAfterStyles'
                            }, {
                                event: 'mouseleave',
                                actions: 'resetStyles'
                            }]
                        }]
                    }]
                }]
            }]
        }]
    }]
}

module.exports = {inventory}