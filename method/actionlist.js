const actionlist = ({ VALUE, STATE, id, params = {} }) => {
    
    var local = VALUE[id]
    if(!local) return

    var actionList = VALUE['actionlist']
    var deleteBtn = VALUE['action-list-delete']
    var editBtn = VALUE['action-list-edit']
    var hideBtn = VALUE['action-list-hide']
    var archiveBtn = VALUE['action-list-archive']
    var dulicateBtn = VALUE['action-list-duplicate']

    actionList.Data = deleteBtn.Data = editBtn.Data = hideBtn.Data = archiveBtn.Data = dulicateBtn.Data = STATE[local.Data]
}

module.exports = {actionlist}