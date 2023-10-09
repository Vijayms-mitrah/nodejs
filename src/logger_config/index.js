const {createLogger, transports, format} = require('winston')

// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
//   };


const customerLogger = createLogger({
    transports:[
        new transports.File({
            filename:"src/log/info.log",
            level:"info",
            format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.File({
            filename:"src/log/error.log",
            level:"error",
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = {customerLogger}

