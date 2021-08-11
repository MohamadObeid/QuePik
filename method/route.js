const { clearIntervals } = require('./clearIntervals')
const { starter } = require('./starter')
//const { search } = require("./search")
//const { setState } = require("./state")

/*const toRoute = ({ VAR, STATE }) => {

    var pathname = window.location.pathname.split('/')
    pathname.slice(2)
    var queries = pathname.filter(path => path.includes('search?') ; path.includes('search?').split('search?')[1])
    pathname = pathname.filter(path => !path.includes('search?'))

    queries.map(query => {
        query = toObject({ VAR, STATE, string: query })
        search({ VAR, STATE, params: query })
    })

    var stateList = toObject({ VAR, STATE, string: pathname.join(';') || '' })
    setState({ VAR, STATE, params: stateList })

}*/

const route = async ({ VALUE, STATE, params, id }) => {

    clearIntervals({ VALUE, STATE, id })

    var {data} = await axios.get(`/route${params.route}`)
    document.body.innerHTML = data

    starter()
        
    window.history.replaceState({}, '', params.route)
}



/*const replaceRoute = ({ params }) => {

    var route = '/' + window.location.pathname.split('/')[1]
    var pathname = `/search?state=${params.state};${params.query}`

    window.history.replaceState(null, "New Page Title", route + pathname)

}



export const pushRoute = ({ params }) => {

    var route = window.location.pathname.split('/')

    // page name
    var pathname = `/${route[1]}`
    route = route.slice(2)

    // search queries
    var queries = route.filter(route => route.includes('search?'))
    route = route.filter(route => !route.includes('search?'))
    queries.map(query => {
        pathname += `/${query}`
    })

    // states
    var states = toObject({ string: route.join(';') })
    states = states.state || {}
    states = { ...states, ...params.state }

    pathname += '/'

    states = Object.entries(states)
    states.map(([key, value], index) => {
        pathname += `state.${key}=${value}`
        if (index < states.length - 1) pathname += ';'
    })

    window.history.replaceState(null, "New Page Title", pathname)

}*/

module.exports = {route}