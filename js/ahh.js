(function ($) {  

  Drupal.behaviors.audiophreak_subtheme = {

    attach: function (context, settings) {

     // Start JS code
     
     console.log(Drupal.settings.my_db_module.account);
     console.log(Drupal.settings.my_db_module.nodeId);
     
         var player = $('iframe');
    var playerOrigin = '*';
    var status = $('.status');

    // Listen for messages from the player
    if (window.addEventListener) {
        window.addEventListener('message', onMessageReceived, false);
    }
    else {
        window.attachEvent('onmessage', onMessageReceived, false);
    }

    // Handle messages received from the player
    function onMessageReceived(event) {
        // Handle messages from the vimeo player only
        if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
            return false;
        }
        
        if (playerOrigin === '*') {
            playerOrigin = event.origin;
        }
        
        var data = JSON.parse(event.data);
        
        switch (data.event) {
            case 'ready':
                onReady();
                break;
               
            case 'playProgress':
                onPlayProgress(data.data);
                break;
                
            case 'pause':
                onPause();
                break;
               
            case 'finish':
                onFinish();
                break;
        }
    }

    // Call the API when a button is pressed
    $('button').on('click', function() {
        post($(this).text().toLowerCase());
    });

    // Helper function for sending a message to the player
    function post(action, value) {
        var data = {
          method: action
        };
        
        if (value) {
            data.value = value;
        }
        
        var message = JSON.stringify(data);
        player[0].contentWindow.postMessage(data, playerOrigin);
    }

    function onReady() {
        status.text('ready');
        
        post('addEventListener', 'pause');
        post('addEventListener', 'finish');
        post('addEventListener', 'playProgress');
    }

    function onPause() {
        status.text('paused');
    }

    function onFinish() {
        status.text('finished');
    }

    function onPlayProgress(data) {
        status.text(data.seconds + 's played');
    }
    
    
    //Testing ajax jquery
    
    // Create an object using an object literal.
    var ourObj = {};

    // Create a string member called "data" and give it a string.
    // Also create an array of simple object literals for our object.
    ourObj.data = "Some Data Points";
    ourObj.arPoints = [{'x':1, 'y': 2},{'x': 2.3, 'y': 3.3},{'x': -1, 'y': -4}];
    
    
     var url = Drupal.settings.basePath + '/ajax/get_info/';
    // $.get(url);
    
    $.ajax({
   url: url,
   type: 'post',
   data: {"points" : JSON.stringify(ourObj)},
   success: function(data) {
        // Do something with data that came back. 
      }
    });
    
     // end our js code


   }
 };})(jQuery);