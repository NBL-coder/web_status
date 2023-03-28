import { Injectable } from '@angular/core';
const isReachable = require('is-reachable');
@Injectable({
  providedIn: 'root'
})
export class ConectionsService {

  constructor() { }
  
  async urlPing(url:any){
    var result;
    await ping(url,1).then((res:any) => {
      result = String(res);
    }).catch((err:any) => {
        //console.log('Could not ping remote URL');
    });  
    try {
      var url_valid = await isReachable(url);
    } catch (error) {
      console.log(url, ": not valid");
    }
    
    if (url_valid != true){
      result = "error";
    }
    return result;
  }

  
}
function request_image(url:any) {
  return new Promise(function(resolve, reject) {
      var img = new Image();
      img.onload = function() { resolve(img); };
      img.onerror = function() { reject(url); };
      img.src =  url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);  
  });
}
function ping(url:any, multiplier:any) {
  return new Promise(function(resolve, reject) {
      var start = (new Date()).getTime();
      var response = function() { 
          var delta = ((new Date()).getTime() - start);
          delta *= (multiplier || 1);
          resolve(delta); 
      };
      request_image(url).then(response).catch(response);
      
      // Set a timeout for max-pings, 5s.
      setTimeout(function() { reject(Error('Timeout')); }, 5000);
  });
}
