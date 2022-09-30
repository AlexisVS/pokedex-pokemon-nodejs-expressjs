exports.success = (message, data) => ({message, data});

exports.getUniqueId = (data) => data.sort((a, b) => b.id - a.id)[0].id

