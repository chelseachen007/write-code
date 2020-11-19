export const ErrorHandlerPlugins = {
    install (Vue, options = {}) {
        Vue.config.errorHandler = (err, vm, info) => {
            let { message, name, script = '', line = 0, column = 0, stack } = err
            console.log('errorHandler:', err)
            uploadError({ error: err })
        }
    }
}



function uploadError ({
    lineno,
    colno,
    error: {
        stack
    },
    timeStamp,
    message,
    filename
}) {
    // 过滤
    const info = {
        lineno,
        colno,
        stack,
        timeStamp,
        message,
        filename
    }

    // const str = Base64.encode(JSON.stringify(info))
    const str = window.btoa(JSON.stringify(info))
    const host = 'http://localhost:7001/monitor/error'
    new Image().src = `${host}?info=${str}`
}

