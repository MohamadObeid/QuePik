
const { toBoolean } = require('./toBoolean')
const { toId } = require('./toId')
const { getParam } = require('./getParam')
const { toParam } = require('./toParam')

const events = ['click', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup', 'touchstart', 'touchend']

const addEventListener = ({ VALUE, STATE, controls, id }) => {
    
    const { execute } = require('./execute')

    var local = VALUE[id]

    var events = controls.event.split('?')
    var idList = events[3]
    var once = getParam(controls.event, 'once', false)
    
    idList = toId({ VALUE, STATE, id, string: idList })

    events = events[0].split(';')

    events.map(event => {

        var timer = 0

        // action::id
        var eventid = event.split('::')[1]
        if (eventid) idList = toId({ VALUE, STATE, id, string: eventid })
        event = event.split('::')[0]

        // action>>timer
        timer = event.split('>>')[1] || 0
        event = event.split('>>')[0]

        if (!event) return

        // add event listener
        idList.map(id => {

            var body = id === 'body'
            var myFn = (e) => {

                var events = controls.event.split('?')
                clearTimeout(local[`${controls.actions || controls.event}-timer`])
                
                if (body) id = local.id
                
                // VALUE[id] doesnot exist
                if (!VALUE[id]) return e.target.removeEventListener(event, myFn)
                
                // approval
                if (!toBoolean({ VALUE, STATE, string: events[2], e, id })) return

                // params
                params = toParam({ VALUE, STATE, string: events[1], e, id })

                if (controls.actions) local[`${controls.actions}-timer`] = setTimeout(
                    () => execute({ VALUE, STATE, controls, e, id }), timer)


            }

            // body || window
            if (id === 'body' || id === 'window') return document.body.addEventListener(event, myFn, { once })

            // onload event
            if (event === 'load') return myFn({ target: VALUE[id].element })

            // elements
            return VALUE[id].element.addEventListener(event, myFn, { once })
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