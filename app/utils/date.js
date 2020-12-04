const moment = require('moment')

function dateformat(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dateStr).format(pattern);
}

module.exports = { dateformat }