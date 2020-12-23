const moment = require('moment')

function dateformat(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dateStr).format(pattern);
}
function getWeek(dateString) {
    var dateArray = dateString.split("-");
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    return "星期" + "日一二三四五六".charAt(date.getDay());
}

module.exports = { dateformat, getWeek }