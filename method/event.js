const { toApproval } = require('./toApproval')
const { toId } = require('./toId')
const { getParam } = require('./getParam')
const { toParam } = require('./toParam')
const { clone } = require('./clone')
const { generate } = require('./generate')

const events = ['click', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup', 'touchstart', 'touchend']

const addEventListener = ({ VALUE, STATE, controls, id }) => {
    
    const { execute } = require('./execute')

    var local = VALUE[id]
    var mainID = local.id

    var events = controls.event.split('?')
    var once = getParam(controls.event, 'once', false)
    var _idList = toId({ VALUE, STATE, id, string: events[3] })

    events = events[0].split(';')

    events.map(event => {

        var timer = 0
        var code = generate()

        // action::id
        var eventid = event.split('::')[1]
        if (eventid) idList = toId({ VALUE, STATE, id, string: eventid })
        else idList = clone(_idList)

        // event
        event = event.split('::')[0]

        // action>>timer
        timer = event.split('>>')[1] || 0
        event = event.split('>>')[0]

        if (!event) return

        clearTimeout(local[`${code}${event}-timer`])

        // add event listener
        idList.map(id => {

            var myFn = (e) => {

                local[`${code}${event}-timer`] = setTimeout(async () => {

                    var events = controls.event.split('?')
                    
                    // VALUE[id] doesnot exist
                    if (!VALUE[id]) return e.target.removeEventListener(event, myFn)
                    
                    // approval
                    var approved = toApproval({ VALUE, STATE, string: events[2], e, id })
                    if (!approved) return

                    // params
                    params = toParam({ VALUE, STATE, string: events[1], e, id })
                    
                    if (controls.actions) await execute({ VALUE, STATE, controls, e, id: mainID })
                    
                    // await params
                    if (params.await) toParam({ VALUE, STATE, id, e, string: params.await.join(';') })
                
                }, timer)
            }

            // onload event
            if (event === 'load') myFn({ target: VALUE[id].element })
            
            // elements
            VALUE[id].element.addEventListener(event, myFn)
        })
    })
}

const defaultEventHandler = ({ VALUE, id }) => {
    var local = VALUE[id]

    local.touchstart = false
    local.mouseenter = false
    local.mousedown = false
    
    events.map(event => {

        const setEventType = (e) => {

            var local = VALUE[id]
            if (!local) return e.target.removeEventListener(event, setEventType)

            if (event === 'mouseenter') local.mouseenter = true
            else if (event === 'mouseleave') local.mouseenter = false
            else if (event === 'mousedown') local.mousedown = true
            else if (event === 'mouseup') local.mousedown = false
            else if (event === 'touchstart') local.touchstart = true
            else if (event === 'touchend') local.touchstart = false
        }

        local.element.addEventListener(event, setEventType)
    })
}

module.exports = {addEventListener, defaultEventHandler}