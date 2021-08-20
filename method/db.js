const deleteDb = async ({ VALUE, STATE, id, params = {} }) => {
    var local = VALUE[id]
    if (!local) return

    var {data} = await axios.delete('/api/asset', { data: params.delete })
    
    console.log(data, STATE[params.state]);
}

module.exports = {deleteDb}