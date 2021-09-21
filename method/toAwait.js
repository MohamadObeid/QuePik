module.exports = {
    toAwait: ({ VALUE, STATE, id, e, params = {} }) => {
        if (!params.asyncer)  return

        const { execute } = require("./execute")
        const { toParam } = require("./toParam")

        if (params.await && params.await.length > 0)
        toParam({ VALUE, STATE, id, e, string: params.await.join(';') })
        
        if (params.awaiter) execute({ VALUE, STATE, id, e, actions: params.awaiter, params })
    }
}