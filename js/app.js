(function ($) {  

  Drupal.behaviors.audiophreak_subtheme = {

    attach: function (context, settings) {

     // Start JS code
     
     // Yay these work
     // console.log(Drupal.settings.my_db_module.account);
     // console.log(Drupal.settings.my_db_module.nodeId);
     
     $(".node-video").fitVids({ customSelector: "iframe[src^='https://player.vimeo.com']"});
     

      
      var iframe = $('#myvideo')[0],
      player = $f(iframe),
      status = $('.status');
      
      
      
    //Create an array for storing the progress
    plnzVideoTracker = {};
    plnzVideoTracker.progress = [];
    // plnzVideoTracker.node = nodeId;
    // plnzVideoTracker.uid = userId;
    
    //Begin functions
    
    player.addEvent('ready', function() {
        console.log('ready');
        status.text('ready');
        
        player.addEvent('pause', vimeoPauseEvent);
        player.addEvent('finish', onFinish);
        player.addEvent('playProgress', vimeoPlayProgressEvent);
    });
   
   
     //Finish 
     function onFinish() {
       status.text('finished');
     }
     
    //Pause
     function vimeoPauseEvent (data) {
        updateProgress();
        status.text('paused');
      }
      
    //playprogress
     function vimeoPlayProgressEvent (data, id) {
        var currentPercent = Math.ceil(data.percent * 100);
    
        if (plnzVideoTracker.progress.indexOf(currentPercent) != -1) {
          return;
        }
    
        var timestamp = (new Date()).getTime();
        timestamp = Math.floor(timestamp / 1000);
    
        plnzVideoTracker.progress.push(currentPercent);
        plnzVideoTracker.lastUpdate = timestamp;
        status.text(data.seconds + 's played');
      }
      
       //Set interval
      setInterval(updateProgress, 30000);
    
      //updateProgress
      function updateProgress () {
        if ( plnzVideoTracker.lastSent == plnzVideoTracker.lastUpdate) {
          return;
        }

        plnzVideoTracker.lastSent = plnzVideoTracker.lastUpdate;
        
        // $.post('callback', {
          // progress: plnzVideoTracker.progress,
          // node: plnzVideoTracker.node,
          // user: plnzVideoTracker.uid
        // });
         // node: plnzVideoTracker.node,
          // user: plnzVideoTracker.uid
          
          //Data
        var post = plnzVideoTracker.progress;
        // var nodeId = Drupal.settings.my_db_module.nodeId;
        // var userId = Drupal.settings.my_db_module.account;
         
        
        //Begin Ajax
        $.ajax({
          url: '/audiophreak/callback',
          type: 'POST',
          dataType: 'json',
          data: {
            data: post,
            uid: Drupal.settings.my_db_module.account,
            nid: Drupal.settings.my_db_module.nodeId
            },
          success: function(response) {
            //echo what the server sent back...
            alert(response);
          }
         });
      //End post
      }
      
      // Call the API when a button is pressed
      $('button').bind('click', function() {
          player.api($(this).text().toLowerCase());
      });
        
     // end our js code


   }
 };})(jQuery);