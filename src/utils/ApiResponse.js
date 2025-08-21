class ApiResponse{
    constructor(statusCode,data,message="succes"){
        this.statusCode= statusCode;
        this.data= data;
        this.message = message;
        this.statusCode = statusCode<400;
    }
}