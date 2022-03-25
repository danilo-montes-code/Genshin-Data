The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

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

(__TODO__: sample documents_)

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
  talent-material: {name: "Gold", 
                    days_of_week: "We/Sa",
                    domain: {name: "Taishan Mansion",
                             region: "Liyue"} 
                   }
  weekly-material: {name: "Dvalin's Sign", 
                    domain: {name: "Stormterror's Lair"
                             region: "Mondstadt", 
                             weekly_boss: "Dvalin"}
                   } 
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
  ascension_material : {name: "Boreal Wolf Teeth",
                        days_of_week: "Tu/Fr",
                        domain: {name: "Cecilia Garden",
                                 region: "Liyue"}
                       }
}
```

An Example Material document:

```javascript
{
  name: "Boreal Wolf Teeth",
  days_of_week: "Tu/Fr",
  domain: {name: "Cecilia Garden",
          region: "Liyue"}
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

(__TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(__TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

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

