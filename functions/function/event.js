const { toApproval } = require("./toApproval")
const { toId } = require("./toId")
const { toParam } = require("./toParam")
const { clone } = require("./clone")

const events = [
  "click",
  "mouseenter",
  "mouseleave",
  "mousedown",
  "mouseup",
  "touchstart",
  "touchend",
]

const addEventListener = ({ VALUE, STATE, controls, id }) => {
  const { execute } = require("./execute")

  var local = VALUE[id]
  var mainID = local.id

  var events = controls.event.split("/?").join("_question").split("?")
  var _idList = toId({ VALUE, STATE, id, string: events[3] })

  events[0].split(";").map((event) => {

    var timer = 0, idList
    var once = events[1] && events[1].includes('once')

    // action::id
    var eventid = event.split("::")[1]
    if (eventid) idList = toId({ VALUE, STATE, id, string: eventid })
    else idList = clone(_idList)

    // event
    event = event.split("::")[0]

    // action>>timer
    timer = event.split(">>")[1] || 0
    event = event.split(">>")[0]

    if (!event) return

    clearTimeout(local[`${event}-timer`])

    // add event listener
    idList.map(id => {

      var myFn = async (e) => {

        if (once) e.target.removeEventListener(event, myFn)
        
        // VALUE[id] doesnot exist
        if (!VALUE[id]) return e.target.removeEventListener(event, myFn)
        
        // approval
        var approved = toApproval({ VALUE, STATE, string: events[2], e, id: mainID })
        if (!approved) return

        // params
        params = toParam({ VALUE, STATE, string: events[1], e, id: mainID })
        
        if (controls.actions)
        await execute({ VALUE, STATE, controls, e, id: mainID })

        // await params
        if (params.await && params.await.length > 0)
          toParam({ VALUE, STATE, id, e, string: params.await.join(";") })
      }

      var myFn1 = (e) => {
        local[`${event}-timer`] = setTimeout(async () => {

          if (once) e.target.removeEventListener(event, myFn)
          
          // VALUE[id] doesnot exist
          if (!VALUE[id]) return e.target.removeEventListener(event, myFn)
          
          // approval
          var approved = toApproval({ VALUE, STATE, string: events[2], e, id: mainID })
          if (!approved) return

          // params
          params = toParam({ VALUE, STATE, string: events[1], e, id: mainID })
          
          if (controls.actions)
          await execute({ VALUE, STATE, controls, e, id: mainID })

          // await params
          if (params.await && params.await.length > 0)
            toParam({ VALUE, STATE, id, e, string: params.await.join(";") })

        }, timer)
      }

      // onload event
      if (event === "loaded") myFn({ target: VALUE[id].element })

      // elements
      VALUE[id].element.addEventListener(event, myFn1)
    })
  })
}

const defaultEventHandler = ({ VALUE, id }) => {

  var local = VALUE[id]

  local.touchstart = false
  local.mouseenter = false
  local.mousedown = false

  if (local.link) local.element.addEventListener("click", (e) => e.preventDefault())

  // local.element.addEventListener("mousedown", (e) => e.preventDefault())

  // local.element.addEventListener("mouseup", (e) => e.preventDefault())

  //local.element.addEventListener("touchstart", (e) => e.preventDefault())

  //local.element.addEventListener("touchend", (e) => e.preventDefault())

  events.map((event) => {

    var setEventType = (e) => {

      if (!local) return e.target.removeEventListener(event, setEventType)

      if (event === "mouseenter") local.mouseenter = true
      else if (event === "mouseleave") local.mouseenter = false
      else if (event === "mousedown") local.mousedown = true
      else if (event === "mouseup") local.mousedown = false
      else if (event === "touchstart") local.touchstart = true
      else if (event === "touchend") local.touchstart = false
    }

    local.element.addEventListener(event, setEventType)
  })
}

module.exports = { addEventListener, defaultEventHandler }
