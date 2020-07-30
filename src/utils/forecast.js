const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://samples.openweathermap.org/storage/history_bulk.json?appid=8e0910a2bf96a0746f9d7613343d0e20'

    request({ url : url , json:true},(error,response)=>{
        if(error){
            callback('check your conection',undefined)
        }else if(response.body.error){
            callback('location not found',undefined)
        }else{
            callback(undefined, response.body[0].main.temp)
        }
    })
}



module.exports = forecast
