class ApiError extends Error{
    constructor (
        statusCode,
        message = 'Something goes wrong',
        error = [],
        statck =''
    ){
        super(message)
        this.message =message
        this.statusCode= statusCode
        this.data = null
        this.success = false,
        this.errors= error
        if(statck){
            this.statck= statck
        }else{
            Error.captureStackTrace(this, this.constructure)
        }
    }
}

export {ApiError}