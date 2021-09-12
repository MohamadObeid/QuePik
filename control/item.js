module.exports = ({params}) => ([
    `setData?data.value=value.text`,
    `resetStyles?value.mountOnLoad::state.${params.state}=false??state.${params.state}`,
    `setState?state.${params.state}=[${params.id || 'value.id'},${params.id || 'value.id'}++-icon,${params.id || 'value.id'}++-text,${params.id || 'value.id'}++-chevron]`,
    `mountAfterStyles?value.mountOnLoad::state.${params.state}??state.${params.state}`,
])