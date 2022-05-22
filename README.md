<!-- ![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title") -->
# Genshin Data

## Overview

In the game Genshin Impact, there are available areas in the game that are only available on certain days. Checking for which of these areas are available on what days can get tedious, as every character and weapon need different materials, and you may end up forgetting what each one needs. The goal of this site is to eliminate the need to memorize what days and what materials are needed for you to level up your characters and weapons.

Genshin Impact Daily Info is a web app that will allow users to view what materials are available on the day the user accesses the site. Users must register an account, and then can indicate which characters and weapons they want to focus on, so those will appear clearly on the page.

## Currently Planned Features
* suggestion form
* show artifacts
* give suggestions for weapons to also track based on characters picked ('on change', happens while user is selecting)
* show gem/mat bosses for characters
  * indicate if not tracking talent/trounce
* search for weapon 
    name
    class
    rarity
  or character
    name
    vision
    region
  * characters and weapon parallel on page
  * grid instead of flexbox?
  * new deps
    * connect-ensure-login
  * reenter password on register
  * change password
  * forgot password
  * one submission for polls
  * maybe api/routes for info