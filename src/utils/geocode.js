const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicGFreWEiLCJhIjoiY2tkM2s2eGJ6MGJpcTJ3bzB4MHg5bWJrNSJ9.1sf8GlzgDaakO_zTbHR54Q&limit=1'
    request({url : url, json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services :(',undefined)
        }else if(response.body.message){
            callback('enter correct location :( ', undefined)
        }else{
                callback( undefined , {
                    lattitude : response.body.features[0].center[0],
                    longitude : response.body.features[0].center[1],
                    location : response.body.features[0].place_name
                })

        }
    })
}



module.exports = geocode
