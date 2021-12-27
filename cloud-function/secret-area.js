exports.handler = function(event, context, callback){
    const secretContent = `
    <h3>Welcome to the secret area</h3>
    <p>Here we can tell you that the sky is dark, and 2+2=5. </p>
    `
    let inputBody

    if (event.body){
        inputBody=JSON.parse(event.body);
    }else{
        inputBody={};
    }
    if(inputBody.password == "strongPassword"){
        callback(null, {
            statusCode: 200,
            body: "Welcome to the super secret area."
        })
    }else{
        callback(null,{
            statusCode:401
        })
    }
}