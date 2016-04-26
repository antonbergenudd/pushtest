function pushNot() {
    var ref = new Firebase('https://pushtest2.firebaseio.com/');
    var deviceID;
    ref.once("value", function(snapshot){
        deviceID = snapshot.val().devices;
        var pubnub = PUBNUB.init({
            subscribe_key: 'sub-c-ee2ffedc-0bef-11e6-b422-0619f8945a4f',
            publish_key:   'pub-c-8493cf03-067c-44d2-a665-b307882c6c4a',
        });

        var ref = new Firebase('https://pushtest2.firebaseio.com/');

        changeTemperature();

        function changeTemperature(e) {
            var temp = 90;
          
            pubnub.publish({
                channel: 'gcm-test',
                message: {
                    temperature: temp
                }
            });

            if(temp >= 80) {
                sendPush();
            }
        }

        function sendPush() {
            pubnub.mobile_gw_provision ({
                device_id: deviceID, // Reg ID you got on your device
                channel  : 'gcm-test',
                op: 'add', 
                gw_type: 'gcm',
                error : function(msg){console.log(msg);},
                callback : successCallback
            });
        }

        function successCallback() {
            var message = PNmessage();

            message.pubnub = pubnub;
            message.callback = function(msg){ console.log(msg); };
            message.error = function (msg){ console.log(msg); };
            message.channel = 'gcm-test';
            message.gcm = {
                title: 'Push Demo',
                message: 'The room temperature is set too high'
            };

            message.publish();
        }
    })
}
