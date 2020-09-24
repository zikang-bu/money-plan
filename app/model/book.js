const { query } = require("../utils/better-mysql");

const bookModel = {
    items(value) {
        let _sql = "select * from book"
        return query(_sql)
    }
}

module.exports = bookModel