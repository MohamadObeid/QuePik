const newProduct = {
    type: 'View?DATA={}',
    actions: 'setValue?value.element.scrollTop=0',
    children: [{
        type: 'View?class=flex-box;style.width=100%;style.marginBottom=2.5rem',
        children: [{
            type: 'Text?text=Create a New Product',
            style: { fontSize: '1.8rem', color: '#444', fontWeight: '500' }
        }, {
            type: 'View?class=flex-box;style.marginLeft=auto',
            children: [{
                type: 'Icon?class=flex-box;icon.name=three-dots',
                style: {
                    cursor: 'pointer',
                    color: '#116dff',
                    fontSize: '2.5rem',
                    height: '4rem',
                    width: '4rem',
                    borderRadius: '4rem',
                    transition: 'all 0.2s',
                    marginRight: '1rem',
                    after: { backgroundColor: '#eee' }
                },
                controls: [{
                    actions: 'createControls?state=actions-list;type=list;id=actions-list;placement=left'
                }, {
                    event: 'mouseenter',
                    actions: 'mountAfterStyles'
                }, {
                    event: 'mouseleave',
                    actions: 'resetStyles'
                }]
            }, {
                type: 'Button?icon.name=x-square;text=Cancel;style.marginRight=1rem',
                controls: [{ actions: 'createControls?type=toggleView;id=admin-view;view=inventory' }]
            }, {
                type: 'Button?icon.name=check2-square;text=Save',
            }]
        }]
    }, {
        type: 'View',
        style: {
            border: '1px solid #eee',
            borderRadius: '0.5rem',
            padding: '1rem',
            display: 'flex'
        },
        children: [{
            type: 'View',
            style: {
                display: 'flex',
                flexDirection: 'column',
                width: '75%',
                padding: '1rem',
            },
            children: [{
                type: 'Text?text=General Info',
                style: {
                    display: 'flex',
                    fontSize: '1.7rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
            }, {
                type: 'View',
                style: {
                    display: 'flex',
                    padding: '2rem',
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    marginBottom: '3rem',
                },
                children: [{
                    type: 'View',
                    style: {
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: '1rem',
                    },
                    children: [{
                        type: 'Label?text=Product Name',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                        }
                    }, {
                        type: 'View?actions=focus::200',
                        children: [{
                            type: 'Input?featured;lang=en;path=name;data=[]',
                            style: {
                                height: '4rem',
                                borderRadius: '0.25rem',
                                border: '0',
                                padding: '0.5rem',
                                width: '100%',
                                marginBottom: '1rem'
                            },
                        }]
                    }, {
                        type: 'Label?text=Suppliers',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                            marginTop: '1rem'
                        }
                    }, {
                        type: 'View',
                        children: [{
                            type: 'Input?featured;path=supplier;data=[]',
                            style: {
                                height: '4rem',
                                borderRadius: '0.25rem',
                                border: '0',
                                padding: '0.5rem',
                                width: '100%',
                                marginBottom: '1rem'
                            }
                        }]
                    }, {
                        type: 'Label?text=UPC;class=flex-box',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                            justifyContent: 'flex-start',
                            width: 'fit-content',
                            marginTop: '1rem'
                        },
                        tooltip: 'UPC is a 13 digits number which stands for Universal Product Code?placement=right;maxWidth=30rem'
                    }, {
                        type: 'Input?input.type=number;path=UPC',
                        style: {
                            height: '4rem',
                            borderRadius: '0.25rem',
                            border: '0',
                            padding: '0.5rem',
                            width: '100%',
                            marginBottom: '2rem'
                        },
                    }, {
                        type: 'Label?text=EAN;class=flex-box',
                        style: {
                            justifyContent: 'flex-start',
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                            width: 'fit-content'
                        },
                        tooltip: 'EAN is a 12 digits number which stands for European Article Number?placement=right;maxWidth=30rem'
                    }, {
                        type: 'Input?path=EAN;input.type=number',
                        style: {
                            height: '4rem',
                            borderRadius: '0.25rem',
                            border: '0',
                            padding: '0.5rem',
                            width: '100%',
                            marginBottom: '2rem'
                        },
                    }]
                }, {
                    type: 'View',
                    style: {
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '1rem',
                    },
                    children: [{
                        type: 'Label?text=Product Description',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                        },
                    }, {
                        type: 'Paragraph?lang=en;path=description',
                        style: {
                            minHeight: '13rem',
                            borderRadius: '0.25rem',
                            border: '0',
                            padding: '0.5rem',
                            width: '100%',
                            marginBottom: '2rem'
                        },
                    }, {
                        type: 'Label?text=Notes',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                        },
                    }, {
                        type: 'Paragraph?lang=en;path=notes',
                        style: {
                            minHeight: '13rem',
                            borderRadius: '0.25rem',
                            border: '0',
                            padding: '0.5rem',
                            width: '100%',
                            marginBottom: '2rem'
                        },
                    }]
                }]
            }, {
                type: 'Text',
                style: {
                    display: 'flex',
                    fontSize: '1.7rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
                text: 'Uploads'
            }, {
                type: 'View',
                style: {
                    display: 'grid',
                    padding: '2rem',
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    marginBottom: '3rem',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    gridTemplateColumns: 'calc(50% - 1rem) calc(50% - 1rem)'
                },
                children: [{
                    type: 'View',
                    children: [{
                        type: 'Text?text=Images',
                        style: {
                            color: '#444',
                            fontSize: '1.5rem',
                            marginBottom: '1rem'
                        }
                    }, {
                        type: 'Upload?upload.type=image;style.width=100%;path=images',
                    }]
                }, {
                    type: 'View',
                    children: [{
                        type: 'Text?text=Videos',
                        style: {
                            color: '#444',
                            fontSize: '1.5rem',
                            marginBottom: '1rem'
                        }
                    }, {
                        type: 'Upload?upload.type=video;style.width=100%;path=videos',
                    }]
                }]
            },

            // specs and options

            {
                type: 'Text?text=Specifications & Options',
                style: {
                    display: 'flex',
                    fontSize: '1.7rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
            }, {
                type: 'View',
                style: {
                    display: 'flex',
                    padding: '2rem',
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    marginBottom: '3rem',
                    flexDirection: 'column'
                },
                children: [{
                    type: 'View?style.display=flex',
                    children: [{
                        type: 'View?style.flex=1',
                        children: [{

                            // spec

                            type: 'Text?text=Specifications;style.fontSize=1.5rem;style.width=fit-content',
                            tooltip: 'It is how product looks like, what are its features and functions...?placement=right;maxWidth=30rem'
                        }, {
                            class: 'flex-box',
                            type: 'View',
                            style: {
                                marginTop: '2rem',
                                flex: '1',
                            },
                            children: [{
                                type: 'Text?text=Specification',
                                style: {
                                    width: '100%',
                                    fontSize: '1.4rem',
                                    height: '3rem',
                                    color: '#444',
                                    textAlign: 'left'
                                },
                            }, {
                                type: 'Text?style.minWidth=3rem',
                            }, {
                                type: 'Text?text=Value',
                                style: {
                                    width: '100%',
                                    fontSize: '1.4rem',
                                    height: '3rem',
                                    color: '#444',
                                    textAlign: 'left'
                                },
                            }, {
                                type: 'Text?style.minWidth=3rem',
                            }]
                        }, {
                            type: 'View',
                            style: {
                                flex: '1',
                                display: 'grid',
                                gap: '1rem',
                                marginBottom: '1rem'
                            },
                            children: [{
                                type: 'View?path=specifications;class=flex-box;data=[]',
                                actions: 'setState?state.spec-dup=value.id',
                                children: [{
                                    type: 'Input?featured;lang=en;!removable;!clearable;path=specification',
                                    style: {
                                        width: '100%',
                                        height: '4rem',
                                        borderRadius: '0.25rem',
                                        border: '0',
                                        padding: '0.5rem',
                                        color: '#444'
                                    },
                                    actions: 'setState?state.spec-dup-input=value.id',
                                }, {
                                    type: 'Text?text=:',
                                    style: {
                                        minWidth: '3rem',
                                        fontSize: '2.4rem',
                                        color: '#444'
                                    }
                                }, {
                                    type: 'Input?featured;lang=en;!removable;!clearable;path=value',
                                    style: {
                                        width: '100%',
                                        height: '4rem',
                                        borderRadius: '0.25rem',
                                        border: '0',
                                        padding: '0.5rem',
                                        color: '#444'
                                    }
                                }, {
                                    type: 'View?style.minWidth=3rem',
                                    children: [{
                                        type: 'Icon?icon.name=x',
                                        style: {
                                            fontSize: '2.2rem',
                                            color: '#444',
                                            cursor: 'pointer'
                                        },
                                        controls: [{
                                            event: 'click',
                                            actions: [
                                                'remove>>value.parent.parent.id??value.length>>value.parent.parent.id>1',
                                                `focus::100>>state.spec-dup-input`
                                            ]
                                        }]
                                    }]
                                }]
                            }]
                        }, {
                            type: 'View',
                            style: {
                                display: 'flex',
                                alignItems: 'center'
                            },
                            children: [{
                                type: 'Icon?icon.name=plus-circle-fill',
                                style: {
                                    fontSize: '2rem',
                                    margin: '0 1rem',
                                    color: '#444',
                                    cursor: 'pointer'
                                },
                                controls: [{
                                    event: 'click',
                                    actions: 'duplicate>>state.spec-dup;focus::100>>state.spec-dup-input'
                                }]
                            }, {
                                type: 'Text?text=Add New Specification',
                                style: {
                                    fontSize: '1.4rem',
                                    color: '#444',
                                }
                            }]
                        }]
                    }, {
                        type: 'Text?style.height=100%;style.width=1px;style.backgroundColor=#ddd;style.margin=0 1rem'
                    }, {
                        type: 'View',
                        style: {
                            flex: '1',
                            marginLeft: '1rem'
                        },
                        children: [{
                            type: 'Text?text=Options',
                            style: {
                                fontSize: '1.5rem',
                                width: 'fit-content'
                            },
                            tooltip: 'If the product come in options like size: small, medium, large | color: red, blue, yellow...?placement=right;maxWidth=30rem'
                        }, {
                            class: 'flex-box',
                            type: 'View',
                            style: {
                                marginTop: '2rem',
                                flex: '1',
                            },
                            children: [{
                                type: 'Text?text=Group',
                                style: {
                                    width: '100%',
                                    fontSize: '1.4rem',
                                    height: '3rem',
                                    color: '#444',
                                    textAlign: 'left'
                                },
                            }, {
                                type: 'Text?style.minWidth=3rem',
                            }, {
                                type: 'Text?text=Options',
                                style: {
                                    width: '100%',
                                    fontSize: '1.4rem',
                                    height: '3rem',
                                    color: '#444',
                                    textAlign: 'left'
                                },
                            }, {
                                type: 'Text?style.minWidth=3rem',
                            }]
                        }, {
                            type: 'View',
                            style: {
                                flex: '1',
                                display: 'grid',
                                gap: '1rem',
                                marginBottom: '1rem'
                            },
                            children: [{
                                type: 'View?path=options;class=flex-box;data=[]',
                                actions: 'setState?state.options-dup=value.id',
                                style: { flex: '1' },
                                children: [{
                                    type: 'Input?featured;!removable;!clearable;lang=en;path=group',
                                    actions: 'setState?state.options-input=value.id',
                                    style: {
                                        width: '100%',
                                        height: '4rem',
                                        borderRadius: '0.25rem',
                                        border: '0',
                                        padding: '0.5rem',
                                        color: '#444',
                                        alignSelf: 'flex-start',
                                    }
                                }, {
                                    type: 'Text?text=:',
                                    style: {
                                        minWidth: '3rem',
                                        fontSize: '2.4rem',
                                        color: '#444',
                                        height: '4rem',
                                        alignSelf: 'flex-start',
                                    }
                                }, {
                                    type: 'View',
                                    style: {
                                        width: '100%',
                                        display: 'grid',
                                        gap: '1rem'
                                    },
                                    children: [{
                                        type: 'Input?featured;lang=en;path=options;data=[]'
                                    }]
                                }, {
                                    type: 'View',
                                    style: {
                                        minWidth: '3rem',
                                    },
                                    children: [{
                                        type: 'Icon?icon.name=x',
                                        style: {
                                            fontSize: '2.2rem',
                                            color: '#444',
                                            cursor: 'pointer'
                                        },
                                        controls: [{
                                            event: 'click',
                                            actions: [
                                                'remove>>value.parent.parent.id??value.length>>value.parent.parent.id>1',
                                                `focus::100>>state.options-input`
                                            ]
                                        }]
                                    }],
                                }]
                            }, {
                                type: 'View',
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                },
                                children: [{
                                    type: 'Icon',
                                    style: {
                                        fontSize: '2rem',
                                        margin: '0 1rem',
                                        color: '#444',
                                        cursor: 'pointer'
                                    },
                                    icon: { name: 'plus-circle-fill' },
                                    controls: [{
                                        event: 'click',
                                        actions: 'duplicate>>state.options-dup;focus::100>>state.options-input'
                                    }]
                                }, {
                                    type: 'Text?text=Add New Group',
                                    style: {
                                        fontSize: '1.4rem',
                                        color: '#444',
                                    }
                                }]
                            }]
                        }, {

                        }]
                    }],
                }]
            }, {

                // Inventory & Pricing

                type: 'Text',
                style: {
                    display: 'flex',
                    fontSize: '1.7rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
                text: 'Inventory & Pricing'
            }, {
                type: 'View',
                style: {
                    display: 'flex',
                    padding: '2rem',
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    marginBottom: '3rem',
                    flexDirection: 'column'
                },
                children: [{

                    // Inventory

                    type: 'Text',
                    style: {
                        fontSize: '1.5rem',
                        width: 'fit-content'
                    },
                    text: 'Inventory',
                }, {
                    type: 'View',
                    style: {
                        flex: '1',
                        display: 'flex',
                        marginTop: '2rem',
                    },
                    children: [{
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                            text: 'Options',
                            tooltip: 'Set price according to product options. Press enter to add new option. Press X to delete it'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                            text: 'Status',
                            tooltip: 'Set item available for purchase or block ordering it'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content',
                            },
                            text: 'SKU',
                            tooltip: 'A “Stock Keeping Unit” is a unique code you can create for each product or variant you have in your store. Using SKUs helps with tracking inventory.?maxWidth=25rem'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content',
                                whiteSpace: 'nowrap'
                            },
                            text: 'Count in stock',
                            tooltip: 'Quantity available in stock'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                            text: 'Minimum',
                            tooltip: 'Minimum amount of items allowed per order'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                            text: 'Maximum',
                            tooltip: 'Maximum amount of items allowed per order'
                        }]
                    }, {
                        type: 'Text',
                        style: { minWidth: '3rem' }
                    }]
                }, {
                    type: 'View',
                    style: {
                        display: 'grid',
                        gap: '1rem',
                        flex: '1'
                    },
                    children: [{
                        type: 'View?path=inventory;data=[]',
                        actions: 'setState?state.inventory-dup=value.id',
                        style: {
                            flex: '1',
                            display: 'flex',
                        },
                        children: [{
                            type: 'View',
                            style: {
                                width: '100%',
                                display: 'grid',
                                gap: '1rem',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: `Input?readOnly;featured;dropList.items=[Options:readOnly,All,const.DATA.options.options.name];path=options;data=[]`,
                                actions: 'setState?state.inventory-input=value.id',
                            }]
                        }, {
                            class: 'status-input',
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: 'Input?input.type=text;path=status;readOnly;input.value=In stock;dropList.items=[Status:readOnly,In stock,Out of stock,Pre Order]',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                },
                                controls: [{
                                    actions: 'createControls?type=dropList'
                                }]
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: 'Input?input.type=number;path=SKU',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: 'Input?featured;input.type=number;path=count-in-stock;input.value=1;unit=unit;!clearable;!removable',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: 'Input?input.type=number;path=min-per-order;input.value=1',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                            },
                            children: [{
                                type: 'Input?input.type=number;path=max-per-order;input.value=10',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            class: 'flex-box',
                            type: 'View',
                            style: {
                                height: '4rem',
                                minWidth: '3rem',
                            },
                            children: [{
                                type: 'Icon?icon.name=x',
                                style: {
                                    fontSize: '2.2rem',
                                    color: '#444',
                                    cursor: 'pointer'
                                },
                                controls: [{
                                    event: 'click',
                                    actions: [
                                        'remove>>value.parent.parent.id??value.length>>value.parent.parent.id>1',
                                        `focus::100>>state.inventory-input`
                                    ]
                                }]
                            }],
                        }]
                    }],
                }, {
                    type: 'View',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '1rem'
                    },
                    children: [{
                        type: 'Icon?icon.name=plus-circle-fill',
                        style: {
                            fontSize: '2rem',
                            margin: '0 1rem',
                            color: '#444',
                            cursor: 'pointer'
                        },
                        controls: [{
                            event: 'click',
                            actions: 'duplicate>>state.inventory-dup;focus::100>>state.inventory-input'
                        }]
                    }, {
                        type: 'Text',
                        text: 'Add More To Inventory',
                        style: {
                            fontSize: '1.4rem',
                            color: '#444',
                        }
                    }]
                }, {

                    // divider

                    type: 'Text',
                    style: {
                        height: '1px',
                        width: '100%',
                        backgroundColor: '#ddd',
                        margin: '2.5rem 0'
                    }
                }, {

                    // Pricing

                    type: 'Text',
                    style: {
                        fontSize: '1.5rem',
                        width: 'fit-content'
                    },
                    text: 'Pricing',
                }, {
                    type: 'View',
                    style: {
                        flex: '1',
                        display: 'flex',
                        marginTop: '2rem',
                    },
                    children: [{
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                            text: 'Options',
                            tooltip: 'Set price according to product options. Press enter to add new option. Press X to delete it'
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '1rem'
                        },
                        children: [{
                            type: 'Text?text=Cost',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '100%',
                            marginRight: '6rem',
                        },
                        children: [{
                            type: 'Text?text=Selling',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                        }]
                    }, {
                        type: 'View',
                        style: {
                            height: '3rem',
                            width: '200%',
                        },
                        children: [{
                            type: 'Text?text=Exchange Rate',
                            style: {
                                fontSize: '1.4rem',
                                color: '#444',
                                textAlign: 'left',
                                width: 'fit-content'
                            },
                        }]
                    }, {
                        type: 'Text',
                        style: { minWidth: '6rem' }
                    }]
                }, {
                    type: 'View',
                    style: {
                        display: 'grid',
                        gap: '1rem',
                        flex: '1',
                    },
                    children: [{
                        type: 'View?path=pricing',
                        actions: 'setState?state.pricing-dup=value.id',
                        style: {
                            flex: '1',
                            display: 'flex',
                        },
                        children: [{
                            type: 'View',
                            style: {
                                width: '100%',
                                display: 'grid',
                                gap: '1rem',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: `Input?readOnly;model=featured;dropList.items=[Options:readOnly,All,const.DATA.options.options.name];path=options;data=[]`,
                                actions: 'setState?state.pricing-input=value.id',
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '1rem'
                            },
                            children: [{
                                type: 'Input?model=featured;input.type=number;path=cost;currency=$;!clearable;!removable',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                                marginRight: '6rem'
                            },
                            children: [{
                                type: 'Input?input.type=number;path=selling;model=featured;currency=$;!clearable;!removable',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                            },
                            children: [{
                                type: 'Input?input.type=number;path=exchange-rate.global;model=featured;currency=$;input.value=1;!clearable;!removable',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            class: 'flex-box',
                            type: 'Text?text==',
                            style: {
                                minWidth: '3rem',
                                height: '4rem',
                                fontSize: '1.8rem',
                                color: '#444',
                                alignSelf: 'flex-start'
                            }
                        }, {
                            type: 'View',
                            style: {
                                width: '100%',
                            },
                            children: [{
                                type: 'Input?featured;input.type=number;path=exchange-rate.local;currency=L.L;input.value=13000;!clearable;!removable',
                                style: {
                                    width: '100%',
                                    height: '4rem',
                                    borderRadius: '0.25rem',
                                    border: '0',
                                    padding: '0.5rem',
                                    color: '#444',
                                }
                            }]
                        }, {
                            class: 'flex-box',
                            type: 'View',
                            style: {
                                height: '4rem',
                                minWidth: '3rem',
                            },
                            children: [{
                                type: 'Icon?icon.name=x',
                                style: {
                                    fontSize: '2.2rem',
                                    color: '#444',
                                    cursor: 'pointer'
                                },
                                controls: [{
                                    event: 'click',
                                    actions: [
                                        'remove>>value.parent.parent.id??value.length>>value.parent.parent.id>1',
                                        `focus::100>>state.pricing-input`
                                    ]
                                }]
                            }],
                        }]
                    }]
                }, {
                    type: 'View',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '1rem'
                    },
                    children: [{
                        type: 'Icon',
                        style: {
                            fontSize: '2rem',
                            margin: '0 1rem',
                            color: '#444',
                            cursor: 'pointer'
                        },
                        icon: { name: 'plus-circle-fill' },
                        controls: [{
                            event: 'click',
                            actions: 'duplicate>>state.pricing-dup;focus::100>>state.pricing-input'
                        }]
                    }, {
                        type: 'Text',
                        text: 'Add More Option Prices',
                        style: {
                            fontSize: '1.4rem',
                            color: '#444',
                        }
                    }]
                }]
            }]
        }, {

            // Collections & Categories

            type: 'View',
            style: {
                width: '25%',
                padding: '1rem'
            },
            children: [{
                type: 'Text',
                style: {
                    display: 'flex',
                    fontSize: '1.6rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
                text: 'Collections & Categories'
            }, {
                type: 'View',
                style: {
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [{
                    class: 'flex-box',
                    type: 'View',
                    style: {
                        justifyContent: 'space-between',
                        height: '3.5rem'
                    },
                    children: [{
                        type: 'Text?text=Categories',
                        style: {
                            fontSize: '1.5rem',
                            color: '#444',
                        },
                    }, {
                        type: 'Icon?icon.name=plus-circle-fill;dropList.id=category-view',
                        style: {
                            fontSize: '2rem',
                            color: '#444',
                            cursor: 'pointer'
                        }
                    }]
                }, {
                    type: 'View?id=category-view;dropList.items=[Categories:readOnly,state.category-list.name];dropList.path=category',
                    style: {
                        display: 'inline-flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        gap: '1rem',
                    },
                    children: [{
                        type: 'Input?featured;readOnly;path=category;!clearable;!duplicatable;data=[]',
                        style: {
                            width: 'fit-content',
                            height: '3rem',
                        },
                        actions: 'setStyle?style.display=none?!data||data=[]',
                    }]
                }]
            }, {
                type: 'View',
                style: {
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [{
                    class: 'flex-box',
                    type: 'View',
                    style: {
                        height: '3.5rem',
                        width: '100%',
                        justifyContent: 'space-between',
                    },
                    children: [{
                        type: 'Text?text=Collections',
                        style: {
                            fontSize: '1.5rem',
                            color: '#444',
                        }
                    }, {
                        type: 'Icon?icon.name=plus-circle-fill;dropList.id=collections-view',
                        style: {
                            fontSize: '2rem',
                            color: '#444',
                            cursor: 'pointer'
                        }
                    }]
                }, {
                    type: 'View?id=collections-view;dropList.items=[Collections:readOnly,state.collections-list.name];dropList.path=collections',
                    style: {
                        display: 'inline-flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        width: '100%',
                    },
                    children: [{
                        type: 'Input?model=featured;readOnly;path=collections;!clearable;!duplicates;data=[]',
                        style: {
                            width: 'fit-content',
                            height: '3rem'
                        },
                        actions: 'setValue?value.style.display=none?!data||data=[]'
                    }]
                }]
            }, {
                type: 'View',
                style: {
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    marginBottom: '2rem',
                },
                children: [{
                    type: 'View',
                    style: {
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                    },
                    children: [{
                        type: 'Text?text=Brand',
                        style: {
                            height: '3rem',
                            fontSize: '1.5rem',
                            color: '#444',
                        },
                    }]
                }, {
                    type: 'Input?model=featured;path=brand;dropList.items=[Brands:readOnly,state.brand-list.name];!duplicate;readOnly'
                }]
            }, {
                type: 'View',
                style: {
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    marginBottom: '2rem',
                },
                children: [{
                    type: 'Text?text=Tags',
                    style: {
                        height: '3rem',
                        fontSize: '1.5rem',
                        color: '#444',
                        marginRight: '1rem'
                    },
                }, {
                    type: 'Input?featured;path=tags;data=[]',
                    style: {
                        width: 'fit-content',
                        minWidth: '6rem',
                        height: '3rem',
                        marginRight: '.5rem',
                        marginBottom: '.5rem'
                    },
                }]
            }, {

                // Offers & Promotions

                type: 'Text?text=Offers & Promotions',
                style: {
                    display: 'flex',
                    fontSize: '1.6rem',
                    color: '#444',
                    marginBottom: '1rem',
                },
            }, {
                type: 'View',
                style: {
                    backgroundColor: '#eee',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    marginBottom: '2rem',
                },
                children: [{
                    type: 'Item?icon.name=gift;text=Offers;style.fontSize=1.5rem;icon.style.fontSize=1.6rem;style.after.color=#0d6efd',
                    controls: [{
                        actions: 'createControls?type=windowView;view=Offer'
                    }]
                }]
            }]
        }]
    }]
}

module.exports = {newProduct}