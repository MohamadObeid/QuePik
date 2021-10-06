module.exports = {
    dateTimeFormater: ({ VALUE, STATE, id, e, params: {dateTime, opposite} }) => {
        
        var time = dateTime.split('T')[1]
        dateTime = dateTime.split('T')[0]
        var day = dateTime.split('-')[0]
        var month = dateTime.split('-')[1]
        var year = dateTime.split('-')[2]

        if (!opposite) {
            day = dateTime.split('-')[2]
            month = dateTime.split('-')[1]
            year = dateTime.split('-')[0]
        }

        return opposite 
        ? `${year}-${month}-${day}T${time}`
        : `${day}-${month}-${year}T${time}`
    }
}