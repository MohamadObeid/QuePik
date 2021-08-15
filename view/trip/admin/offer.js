const offer = {
    type: 'View?style.padding=2rem;style.width=100%',
    children: [{
        type: 'View?class=flex-start',
        children: [{
            type: 'Text?text=New Offer;style.fontSize=2rem;style.color=#444',
        }, {
            type: 'Text?class=divider'
        }, {
            type: 'View?style.display=flex;style.width=100%',
            toChildren: 'model=featured;path=offers.0.type;state=offer-item;icon.style.fontSize=1.6rem;style.height=10rem;style.color=#fff;icon.style.margin=0;icon.style.marginBottom=.4rem;style.flexDirection=column;style.justifyContent=center;chevron.style.display=none;style.flex=1;style.fontSize=1.2rem;style.after.backgroundColor=#fff;style.marginRight=.6rem;style.after.marginRight=.5rem',
            children: [{
                type: 'Item?text=Discount;icon.name=cash-coin;style.after.color=HotPink;style.backgroundColor=HotPink;style.after.border=1px solid HotPink'
            }, {
                type: 'Item?text=Sale Price;icon.name=tag;style.after.color=#ff4d4d;style.backgroundColor=#ff4d4d;style.after.border=1px solid #ff4d4d'
            }, {
                type: 'Item?text=Free Shipping;icon.name=truck;style.after.color=#FF9933;style.backgroundColor=#FF9933;style.after.border=1px solid #FF9933'
            }, {
                type: 'Item?text=Buy X Get Y Free;icon.name=tags;style.after.color=MediumSeaGreen;style.backgroundColor=MediumSeaGreen;style.after.border=1px solid MediumSeaGreen'
            }, {
                type: 'Item?text=Cash Back;icon.name=currency-dollar;style.after.color=#3399FF;style.backgroundColor=#3399FF;style.after.border=1px solid #3399FF'
            }, {
                type: 'Item?text=Earn Points;icon.name=piggy-bank;style.after.color=#CC66FF;style.backgroundColor=#CC66FF;style.after.border=1px solid #CC66FF'
            }]
        }, {
            type: 'Text?class=divider'
        }, {
            type: 'View?style.width=100%;style.display=flex;style.flexDirection=column',
            children: [{
                type: 'View?class=flex-start;style.border=1px solid #f0f0f0;style.borderRadius=.5rem;style.padding=2rem;style.position=relative;style.marginBottom=2rem;path=offers',
                children: [{
                    type: 'View?style.display=flex;style.alignItems=center;style.position=absolute;style.top=1rem;style.right=2rem',
                    children: [{
                        type: 'Text?text=remove;style.fontSize=1.2rem'
                    }, {
                        type: 'Icon?icon.name=x;style.fontSize=2.2rem;style.cursor=pointer',
                        controls: {
                            event: 'click',
                            actions: 'remove>>value.parent.parent.id??value.length>>value.parent.parent.id>1'
                        }
                    }]
                }, {
                    type: 'View?style.display=grid;style.gridTemplateColumns=1fr 1fr;style.gap=1rem;style.width=100%',
                    children: [{
                        // type
                        type: 'View?class=flex-start',
                        children: [{
                            type: 'Label?text=Type;style.fontSize=1.4rem;style.marginBottom=.5rem'
                        }, {
                            type: 'Input?featured;tt;!clearable;!removable;style.backgroundColor=#f0f0f0;path=type;data=Discount;dropList.items=[Offers:readOnly,Discount,Sale Price,Free Shipping,Buy X Get Y Free,Cash Back,Earn Points]',
                            controls: {
                                watch: 'value.data??value.parent.parent.parent.index=0',
                                actions: 'createActions?type=item;state=offer-item;id=value.parent.parent.parent.parent.prev.prev.childrenSiblings.findIdByData??value.parent.parent.parent.parent.prev.prev.childrenSiblings.findIdByData'
                            }
                        }]
                    }, {
                        // name
                        type: 'View?class=flex-start',
                        children: [{
                            type: 'Label?text=Name;style.fontSize=1.4rem;style.marginBottom=.5rem'
                        }, {
                            type: 'Input?featured;!clearable;!removable;style.backgroundColor=#f0f0f0;path=name'
                        }]
                    }]
                }, {
                    type: 'View?style.display=grid;style.gridTemplateColumns=1fr 1fr;style.gap=1rem;style.width=100%;style.marginTop=2rem',
                    children: [{
                        // offer
                        type: 'View?class=flex-start',
                        children: [{
                            type: 'Label?text=Offer;style.fontSize=1.4rem;style.marginBottom=.5rem'
                        }, {
                            type: 'Input?featured;!clearable;!removable;input.type=number;style.backgroundColor=#f0f0f0;path=offer;currency=L.L',
                        }]
                    }, {
                        // minimmum requirements
                        type: 'View?class=flex-start',
                        children: [{
                            type: 'Label?text=Minimum Requirements;style.fontSize=1.4rem;style.marginBottom=.5rem'
                        }, {
                            type: 'Input?featured;!clearable;!removable;input.type=number;style.backgroundColor=#f0f0f0;path=minimum-requirements;currency=L.L'
                        }]
                    }]
                }, {
                    type: 'Text?class=divider',
                },

                // Validity

                {
                    type: 'View?style.display=flex;style.justifyContent=space-between;style.alignItems=center;style.width=100%',
                    children: [{
                        type: 'Text?text=Validity;style.fontSize=1.4rem',
                    }, {
                        type: 'Switch',
                        controls: [{
                            actions: 'setValue?value.element.checked=true?value.data.validity.starting-date'
                        }, {
                            event: 'change',
                            actions: [
                                'setData;setContent>>value.parent.next.next.1stChild.2ndChild.id?data=date.today;path=validity.starting-date?value.element.checked',
                                'setData;setContent>>value.parent.next.next.2ndChild.2ndChild.id?data=date.today.+4;path=validity.ending-date?value.element.checked',
                                'setStyle?style.display=grid?value.element.checked?value.parent.next.next.id',
                                'setStyle>>value.parent.next.next.id;removeData?style.display=none;path=validity?!value.element.checked',
                            ]
                        }]
                    }]
                }, {
                    type: 'Text?class=divider',
                }, {
                    type: 'View?style.display=none;style.gridTemplateColumns=1fr 1fr;style.gap=1rem;style.width=100%;path=validity',
                    actions: 'setStyle?style.display=grid?value.data.starting-date',
                    children: [{
                        // starting date
                        type: 'View?class=flex-start',
                        children: [{
                            type: 'Label?text=Starting Date;style.fontSize=1.4rem;style.marginBottom=.5rem'
                        }, {
                            type: 'Input?featured;input.type=datetime-local;style.backgroundColor=#f0f0f0;path=starting-date'
                        }]
                    }, {
                        // ending date
                        type: 'View?class=flex-start',
                        children: [{
                            type: 'Label?text=Ending Date;style.fontSize=1.4rem;style.marginBottom=.5rem'
                        }, {
                            type: 'Input?featured;input.type=datetime-local;style.backgroundColor=#f0f0f0;path=ending-date'
                        }]
                    }]
                },

                // Add a Code

                {
                    type: 'View?style.display=flex;style.justifyContent=space-between;style.alignItems=center;style.width=100%;style.marginTop=2rem',
                    children: [{
                        type: 'Text?text=Add a Code;style.fontSize=1.4rem',
                    }, {
                        type: 'Switch',
                        controls: [{
                            actions: 'setValue?value.element.checked=true?value.data.code.code'
                        }, {
                            event: 'change',
                            actions: [
                                'setData;setContent>>value.parent.next.next.1stChild.2ndChild.id?data=generate;path=code.code?value.element.checked',
                                'setData;setContent>>value.parent.next.next.2ndChild.2ndChild.id?data=20;path=code.total-uses?value.element.checked',
                                'setData;setContent>>value.parent.next.next.3rdChild.2ndChild.id?data=1;path=code.allowed-uses-per-user?value.element.checked',
                                'setStyle?style.display=grid?value.element.checked?value.parent.next.next.id',
                                'setStyle>>value.parent.next.next.id;removeData?style.display=none;path=code?!value.element.checked',
                            ]
                        }]
                    }]
                }, {
                    type: 'Text?class=divider',
                }, {
                    type: 'View?style.display=none;style.gridTemplateColumns=1fr 1fr 1fr;style.gap=1rem;style.width=100%;path=code',
                    actions: 'setStyle?style.display=grid?value.data.code',
                    children: [{
                        // code 
                        type: 'View?class=flex-start',
                        children: [{
                            type: 'Label?text=Code;style.fontSize=1.4rem;style.marginBottom=.5rem'
                        }, {
                            type: 'Input?featured;input.type=code;style.backgroundColor=#f0f0f0;path=code'
                        }]
                    }, {
                        // total available
                        type: 'View?class=flex-start',
                        children: [{
                            type: 'Label?text=Total Uses;style.fontSize=1.4rem;style.marginBottom=.5rem'
                        }, {
                            type: 'Input?featured;input.type=number;style.backgroundColor=#f0f0f0;path=total-uses'
                        }]
                    }, {
                        // allowed uses per user
                        type: 'View?class=flex-start',
                        children: [{
                            type: 'Label?text=Allowed Uses Per User;style.fontSize=1.4rem;style.marginBottom=.5rem'
                        }, {
                            type: 'Input?featured;input.type=number;style.backgroundColor=#f0f0f0;path=allowed-uses-per-user'
                        }]
                    }]
                }]
            }]
        }, {

            // add more offers

            type: 'View?style.display=flex;style.alignItems=center',
            children: [{
                type: 'Icon?icon.name=plus-circle-fill;style.fontSize=2rem;style.margin=0 1rem;style.color=#444;style.cursor=pointer',
                controls: [{
                    event: 'click',
                    actions: 'duplicate;focus::100???value.parent.prev.1stChild.id'
                }]
            }, {
                type: 'Text?text=Add More Offers;style.fontSize=1.4rem;style.color=#444'
            }]
        }]
    }]
}

module.exports = {offer}