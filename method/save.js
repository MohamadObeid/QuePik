const save = async ({VALUE, STATE, params, id}) => {

    var local = VALUE[id]
    if (!local) return
    
    var { data } = await axios.post('/api/asset', params.save)
    console.log('saved');
}

module.exports = {save}