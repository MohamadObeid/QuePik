const item = ({id, state}) => ([
    `setData?data=value.text`,
    `setValue;resetStyles?value.mountOnLoad=false??state.${state}`,
    `setState?state.${state}=[${id || 'value.id'},${id || 'value.id'}++-icon,${id || 'value.id'}++-text,${id || 'value.id'}++-chevron]`,
    `setValue;mountAfterStyles?value.mountOnLoad??state.${state}`,
])//;state.admin-view=Inventory;route,

module.exports = {item}