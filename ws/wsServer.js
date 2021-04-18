module.exports = function (server) {

    var WebSocket = require('ws');
    const wsServer = new WebSocket.Server({ server });
    var wsConnection;
    wsServer.on('connection', (wsConn) => {
        wsConnection = wsConn;
        //connection is up, let's add a simple simple event
        wsConnection.on('message', (message) => {

            //log the received message and send it back to the client
            console.log('received: %s', message);
            var order = {
                id: 123,
                items: [
                    "Milk",
                    "Bread",
                    "Water"
                ]
            };

            order.id = message;

            wsConnection.send(JSON.stringify(order));
        });

        //send immediatly a feedback to the incoming connection    
        wsConnection.send('Hi there, I am a WebSocket server');
    });


    function sendWS() {
        if (wsConnection != undefined){
            wsConnection.send("from sendWS");
        }

    }



}

// wsConnection.on('message', (message) => {

//     //log the received message and send it back to the client
//     console.log('received: %s', message);
//     var order = {
//         id: 123,
//         items: [
//             "Milk",
//             "Bread",
//             "Water"
//         ]
//     };

//     order.id = message;

//     wsConn.send(JSON.stringify(order));
// });

