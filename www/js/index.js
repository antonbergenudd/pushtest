/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.init, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    init: function() {
        var pushNotification = window.plugins.pushNotification;

        pushNotification.register(
            successHandler, 
            errorHandler, 
            {
                'senderID':'868383843689',
                'ecb':'onNotificationGCM' // callback function
            }
        );

        function successHandler(result) {
            console.log('Success: '+ result);
            console.log('ANTON success');
        }

        function errorHandler(result) {
            console.log('Success: '+ result);
        }

        onNotificationGCM = function (e) {
            switch(e.event){
                case 'registered':
                    if (e.regid.length > 0){
                        // deviceRegistered(e.regid);
                        window.alert(e.regid);
                    }
                break;

                case 'message':
                    if (e.foreground){
                        // When the app is running foreground. 
                        alert('The room temperature is set too high')
                    }
                break;

                case 'error':
                    console.log('Error: ' + e.msg);
                break;

                default:
                  console.log('An unknown event was received');
                  break;
            }
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();