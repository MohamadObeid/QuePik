const deleteDb = async ({ VALUE, STATE, id, params = {} }) => {
    var local = VALUE[id]
    if (!local) return

    if (!params.delete['file-name']) return
    var { data: { data, message, success } } = await axios.delete('/api/asset', { data: params.delete })
    
    console.log(message, success);
}

const saveDb = async ({ VALUE, STATE, params, id }) => {

    var local = VALUE[id]
    if (!local) return
    
    if (!params.save['file-name']) return
    var { data: { data, message, success } } = await axios.post('/api/asset', params.save)
    
    console.log(message, success);
}

module.exports = {deleteDb, saveDb}