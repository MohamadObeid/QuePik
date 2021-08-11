const setState = ({ STATE, params }) => {

    // push states to route
    if (params.route) pushRoute({ params })

    params.state ;
        Object.entries(params.state).map(([key, value]) => {
            STATE[key] = value
        })
}

module.exports = {setState}