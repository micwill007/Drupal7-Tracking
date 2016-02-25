<?php

/**
 * Implements themename_preprocess_page().
 */

 //Adds javascript app.js to page based on the video content type
  function audiophreak_subtheme_preprocess_page(&$variables, $hook) {
    //Add javascript based on content type 
    if (isset($variables['node']->type) && !empty($variables['node']->type) && ($variables['node']->type == 'video')) {
      $variables['theme_hook_suggestions'][] = 'page__' . $variables['node']->type;
        drupal_add_js(base_path() . 'sites/all/libraries/player-api-master/javascript/froogaloop.js');
        drupal_add_js(base_path() . 'sites/all/libraries/FitVids/jquery.fitvids.js');
        drupal_add_js(base_path() . 'sites/all/modules/custom/my_db_module/js/app.js');
    }
}