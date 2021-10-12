const {clone} = require("./clone");

module.exports = {
  toAwait: ({VALUE, STATE, id, e, params = {}}) => {
    if (!params.asyncer) return;

    const awaiter = clone(params.awaiter);
    const awaits = clone(params.await);

    delete params.asyncer;
    delete params.awaiter;
    delete params.await;

    const {execute} = require("./execute");
    const {toParam} = require("./toParam");
    
    if (awaits && awaits.length > 0) {
      toParam({VALUE, STATE, id, e, string: awaits.join(";")});
    }

    if (awaiter) execute({VALUE, STATE, id, e, actions: awaiter, params});
  },
};
