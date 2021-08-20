module.exports = ({params}) => ([
    `setData?data=value.text`,
    `setValue;resetStyles?value.mountOnLoad=false??state.${params.state}`,
    `setState?state.${params.state}=[${params.id || 'value.id'},${params.id || 'value.id'}++-icon,${params.id || 'value.id'}++-text,${params.id || 'value.id'}++-chevron]`,
    `setValue;mountAfterStyles?value.mountOnLoad??state.${params.state}`,
])