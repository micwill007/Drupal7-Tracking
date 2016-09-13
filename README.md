# Drupal 7 Vimeo Video progress tracking using Froogaloop and the Vimeo API.
Repo to house my D7 module for tracking Vimeo video completion %. Thanks to Gergely Lekli at Urban Insight (https://www.urbaninsight.com/2014/10/06/tracking-progress-embedded-vimeo-videos) for helping with the video tracking.

This was an attempt at an idea I had for a membership site I wanted to create at the time. Incidentally, I picked a hard thing (at least I thought it was then) to do: implement video tracking on a user watching videos hosted on vimeo using a content type named 'video'.

If they watch the video 100% through, they get a '1' in that database table. If not, their progress is still saved in a different table in an array from 0 - 100. Once all array indexes add up to a certain number then they get the 1 in that table..

Some of the code is in the theme which I will upload as well..
