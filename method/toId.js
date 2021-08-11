const { generate } = require("./generate");
const { toArray } = require("./toArray")
const { toObject } = require("./toObject");

const toId = ({ VALUE, STATE, id, string }) => {
    var idList = [], local = VALUE[id]

    if (typeof string === 'object') return string;

    (string || id).split(';').map(id => {

        // id=id:index
        if (id.includes(':index')) {

            var index = local.index
            var parent = local.parent

            // search parent for index
            while (index === undefined) {
                index = VALUE[parent].index
                parent = VALUE[parent].parent
            }

            id = id.split(':index')[0] + ':' + index
        }

        // id=this
        if (id === 'this') idList.push(local.id)

        // id=siblings
        else if (id === 'siblings') {
            var siblings = VALUE[local.parent].childrenSiblings

            // remove current id from siblings
            siblings = siblings.filter(id => id !== id)

            // insert siblings
            idList.push(...siblings)
        }

        // id=value.path
        else if (id.includes('.')) {

            var k = generate()
            id = toObject({ VALUE, STATE, string: `${k}=${id}`, id: local.id })[k]
            idList.push(...toArray(id))
        }

        else idList.push(id)
    })

    return idList
}

module.exports = {toId}