
const { toBoolean } = require('./toBoolean')
const { toObject } = require('./toObject')
const { toId } = require('./toId')

const events = ['click', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup', 'touchstart', 'touchend']

const addEventListener = ({ VALUE, STATE, controls, id }) => {
    
    const { execute } = require('./execute')

    if (!controls.actions) return
    var local = VALUE[id]

    var events = controls.event.split('?')
    var params = toObject({ VALUE, STATE, string: events[1] })
    var conditions = events[2]
    var idList = events[3]
    var once = params.once !== undefined ? true : false

    idList = toId({ VALUE, STATE, id, string: idList })

    events = events[0].split(';')

    events.map(event => {

        var timer = 0

        // action>>id
        var eventid = event.split('>>')[1]
        if (eventid) idList = toId({ VALUE, STATE, id, string: eventid })
        event = event.split('>>')[0]

        // action::timer
        timer = event.split('::')[1] || 0
        event = event.split('::')[0]

        if (!event) return

        // add event listener
        idList.map(id => {

            var body = id === 'body'
            var myFn = (e) => {
                
                if (body) id = local.id
                
                // VALUE[id] doesnot exist
                if (!VALUE[id]) return e.target.removeEventListener(event, myFn)
                
                var approved = toBoolean({ VALUE, STATE, string: conditions, e, id })
                if (!approved) return

                local[`${controls.actions}-timer`] = setTimeout(
                    () => execute({ VALUE, STATE, controls, e, id }),
                    timer)

            }

            // body || window
            if (id === 'body' || id === 'window') return document.body.addEventListener(event, myFn, { once })

            // elements
            return VALUE[id].element.addEventListener(event, myFn, { once })
        })
    })
}

const setEvents = ({ VALUE, id }) => {
    var local = VALUE[id]

    local.touchStart = false
    local.mouseenter = false
    local.mouseDown = false

    events.map(event => {

        const setEventType = (e) => {

            var local = VALUE[id]
            if (!local) return e.target.removeEventListener(event, setEventType)

            if (event === 'mouseenter') local.mouseenter = true
            else if (event === 'mouseleave') local.mouseenter = false
            else if (event === 'mousedown') local.mouseDown = true
            else if (event === 'mouseup') local.mouseDown = false
            else if (event === 'touchstart') local.touchStart = true
            else if (event === 'touchend') local.touchStart = false
        }

        local.element.addEventListener(event, setEventType)
    })
}

module.exports = {addEventListener, setEvents}