const { capitalize } = require("./capitalize")
const { save } = require("./save")
const { toAwait } = require("./toAwait")

module.exports = {
    upload: async ({ VALUE, STATE, id, e, params = {} }) => {

        var local = VALUE[id]
        var storage = STATE.storage
        var upload = params.upload || {}
        upload.save = upload.save !== undefined ? upload.save : true
        
        await storage.child(`images/${local.file.fileName}.${local.file.fileType}`).put(local.file.src)
        await storage.child(`images/${local.file.fileName}.${local.file.fileType}`).getDownloadURL().then(url => local.file.url = url)
        
        local.file.id = `${local.file.fileName}.${local.file.fileType}`

        upload.save && await save({ VALUE, STATE, params: {...params, save: { path: "image", data: {
            "creation-date": new Date().getTime() + 10800000 + "", name: `${local.file.fileName}.${local.file.fileType}`, id: `${local.file.fileName}.${local.file.fileType}`, url: local.file.url, description: `${capitalize(local.file.fileName.split('-')[0])} Image`, active: true
        }}}, id, e })

        !upload.save && toAwait({ VALUE, STATE, id, params, e })
    }
}