// this piece of code handles a response
// if response is a redirection --> redirects to another URL specified in the server code
// if response is something else --> a callback function is used to work on response data
export async function redirection_handler(url,method,params,callback) {
    
    let response = await fetch(url,method);
    if(response.redirected){

        window.location.href = response.url;
    }else{
        callback.apply(await response.json(),[params]);
    }
}