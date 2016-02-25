# Drupal 7 Vimeo Video progress tracking using Froogaloop and the Vimeo API.
Repo to house my D7 module for tracking Vimeo video completion %. Thanks to Gergely Lekli at Urban Insight (https://www.urbaninsight.com/2014/10/06/tracking-progress-embedded-vimeo-videos) for helping with some of the front-end calculations as I had no idea what I was doing.

This was my first rough, rough, intro to Drupal modules. Incidentally, I picked a hard thing to do: implement video tracking on a user watching videos hosted on vimeo using a content type named 'video'. If they watch the video 100% through, they get a '1' in that database table. If not, their progress is still saved in a different table in an array from 0 - 100. Once all array indexes add up to a certain number (this is a constant..) then they get the 1 in that table..

Some of the code is in the theme which I will upload as well..
