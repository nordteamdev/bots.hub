const http = require("request")
const url = "http://api.vk.com/method/"
/*
  {
      url: data
      method: data
      params: json
  }
*/
function vk(method, params){
    
}
function get_vk(params, next){
    request.get(url + params.method + "?" + params.params, function (e, r, b){
        if(e) return console.log("Error vk: " + e)
        var data = JSON.parse(b)
        next(data)
    })
}