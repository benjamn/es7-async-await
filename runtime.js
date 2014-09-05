exports.async = function(generator) {
  return new Promise(function(resolve, reject) {
    var callNext = step.bind(generator.next);
    var callThrow = step.bind(generator.throw);

    function step(arg) {
      try {
        var info = this(arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(callNext, callThrow);
      }
    }

    callNext();
  });
};
