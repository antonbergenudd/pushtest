console.log('hej');
    var pubnub = PUBNUB.init({
        subscribe_key: 'sub-c-ee2ffedc-0bef-11e6-b422-0619f8945a4f',
        publish_key:   'pub-c-8493cf03-067c-44d2-a665-b307882c6c4a',
    });

    // function changeTemperature(e) {
    //     var temp = input.value;
    console.log('pubnub');
        pubnub.publish({
            channel: 'gcm-test',
            message: {
                temperature: 'hej'
            }
        });

        // if(temp >= 80) {
            sendPush();
    //     }
    // }

    function sendPush() {
        console.log('send push');
        pubnub.mobile_gw_provision ({
            device_id: 'APA91bERgbCFiAaR5awbHISeMDlCYfJB7pe95StxP8zNETEkBxgWY-HkxTXkB....', // Reg ID you got on your device
            channel  : channel,
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
        message.channel = channel;
        message.gcm = {
            title: 'Push Demo',
            message: 'The room temperature is set too high'
        };

        message.publish();
    }