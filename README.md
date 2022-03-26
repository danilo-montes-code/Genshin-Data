<!-- ![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title") -->
# Genshin Impact Daily Info

## Overview

In the game Genshin Impact, there are available areas in the game that are only available on certain days. Checking for which of these areas are available on what days can get tedious, as every character and weapon need different materials, and you may end up forgetting what each one needs. The goal of this site is to eliminate the need to memorize what days and what materials are needed for you to level up your characters and weapons.

Genshin Impact Daily Info is a web app that will allow users to view what materials are available on a given day (the current day, by default). Registered users can also indicate which characters and weapons they want to focus on, so those will appear clearly on the page.

## Data Model

The application will store Users, Characters, Weapons, Materials, and Domains

* each list will store information about a single character or weapon
* users can have multiple characters and weapons (via references)
* characters and weapons contain materials (via references)
* materials contain domains (via references)

An Example User:

```javascript
{
  username: // a user's username,
  hash: // a password hash,
  characters: // an array of references to documents containing the character info
  weapons: // an array of references to documents containing the weapon info
}
```

An Example Character document:

```javascript
{
  name: "Beidou",
  region: "Liyue",
  vision: "Electro",
  talent-material: "Gold",
  weekly-material: "Dvalin's Sigh"
}
```

An Example Weapon document:

```javascript
{
  name: "Sacrificial Greatsword",
  class: "Claymore",
  rarity: 4,
  stats: {base_atk: "565", 
          second_stat: "Energy Recharge", 
          second_stat_number: "30.6%"},
  ascension_material : "Boreal Wolf Teeth"
}
```

An Example Material document:

```javascript
{
  name: "Boreal Wolf Teeth",
  days_of_week: "Tu/Fr",
  domain: "Cecilia Garden"
}
```

An Example Domain document:

```javascript
{
  name: "Stormterror's Lair"
  region: "Mondstadt", 
  weekly_boss: "Dvalin"
}
```


## [Link to Commented First Draft Schema](db.js) 

## Wireframes

/ - home page of site

![home page](documentation/wireframes/home.png)

/ - home page of site if user is logged in

![home page with login](documentation/wireframes/home-with-login.png)

/user/login - login page

![login page](documentation/wireframes/login.png)

/user/register - registration page

![registration page](documentation/wireframes/register.png)

/characters - list of all characters

![characters page](documentation/wireframes/characters.png)

/characters/slug - information about a specific character

![character page](documentation/wireframes/characters_slug.png)

/weapons - list of all weapons

![weapons page](documentation/wireframes/weapons.png)

/weapons/slug - information about a specific weapon

![weapon page](documentation/wireframes/weapons_slug.png)

/materials - list of all materials

![materials page](documentation/wireframes/materials.png)

/materials/slug - information about a specific material

![material page](documentation/wireframes/materials_slug.png)

/domains - list of all domains

![domains page](documentation/wireframes/domains.png)

/domains/slug - information about a specific domain

![domain page](documentation/wireframes/domains_slug.png)

## Site map

![Site Map](/documentation/AIT%20Final%20Project%20Sitemap.png?raw=true)

## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(__TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

