# .richmediarc

> **_.richmediarc has a few features that are quite handy you can read about them [here](./richmediarc-features.md)._**

The .richmediarc file is one of the files that gets generated when you start a new project.

You can find it in the root directory of your creative, i.e. /src/300x250.

> **_Important:_** Each creative requires at least one .richmediarc file

In a freshly generated project, the .richmediarc will look something like this

```
{  
  "settings": {  
    "type": "plain",  
    "entry": {  
      "js": "./script/main.js",  
      "html": "./index.html"  
    },  
    "size": {  
      "width": 300,  
      "height": 250  
    }  
  },  
  "content": {  
    "text": "Welcome to this Banner!",  
    "cta": "Click here",  
    "bgcolor": "#FF0000"  
  }  
}
```
As you can see this file contains configuration settings for your creative, as well as key-value pairs which you can use for content, styling or even functionality.

Size and height should already be set to the correct values based on the selection made during the generator process.

This file is parsed when you run “npm run dev”. Webpack grabs the values from this file and hardcodes them into the compiled creative which you see in the preview.

It’s possible to make changes to this file while the preview [server](#localserver.md) is running.

> **_Note:_** In older versions of generator-richmedia-temple changes made to the .richmediarc file require stopping 
> and restarting the dev server**

Go ahead and change content.bgcolor to something else and save the file. In the terminal, you’ll see the creative getting recompiled. Once done, you can refresh the preview page and see the changes you made reflected in the preview unit.

## Basic .richmediarc concepts

Below are some guides on how you can use these values in your creative.

### Using .richmediarc values in HTML

In your index.html, you can retrieve .richmediarc values using the **data-bind** attribute on HTML elements. This is 
made possible by the databind class which is imported by ./js/Banner.js.



For example:

In .richmediarc:
```
"content": {
...
	"cta": "Click here!"
}
```  

In index.html:


```html
<body>

<div class="cta" data-bind="text: cta"></div>

</body>
``` 

and

In .richmediarc:
```
"content": {
...
	"bg-img-url": "../shared/images/background_300x250.jpg"
...
}
```

In index.html:
```html
<body>

<img class="background-image" data-bind="src: bg-img-url"></div>

</body>
```  

### Using .richmediarc values in CSS

[In CSS](./richmediarc-features.md/#css-vars), you can retrieve these values as follows:

```css
var(--{node}-{childNode}-{childNode})
```

For example:

In .richmediarc:
```
"content": {
...
	"bgcolor": "#FFFFFF"
...
}
```
In style.css:
```css
body {
	background-color: var(--content-bgcolor);
}
``` 

and

In .richmediarc:
```
"settings": {

	"size": {

		"width": 300,

		"height": 250
  }
}
```
In style.css:
```css
.banner {
	width: var(--settings-size-width)px;
	height: var(--settings-size-height)px;
}
```
### Using .richmediarc values in javascript

The main javascript file (conveniently named ./js/main.js) imports the .richmediarc files as follows:

```js
import config from "richmediaconfig";
```
and passes this object into the Banner constructor

```js
const banner = new Banner(config);
```
Which also passes the config object to the Animation constructor.

From there, you are able to retrieve pretty much every value from the .richmediarc.

Example:

In .richmediarc:
```
"content": {
...
	"intro": false
...
}
```  
In Animation.js:
```js
export default class Animation {

constructor(container, config) {

	if (config.content.intro) {
	// play intro
	} else {
	// play main animation
	}
  }
}
```
## Advanced .richmediarc concepts

Below are advanced techniques you can use in the .richmediarc file.

### [Inheritance](./richmediarc-features.md/#inheritance)

Sometimes you need to set up multiple .richmediarc files in the same creative. For example, when you’re working on a multilingual project and you want the English version to say “Click Here”, whereas the French version says ‘Cliquez Ici’.

In this case, the most elegant solution would be two .richmediarc files. For example:

.richmediarc.en

.richmediarc.fr


However, there will be a lot of overlap between these two files, if you’re only changing the copy - and not the background colors, the width height, the entry files, etc.

Our system supports inheritance of values, by providing a ‘parent’ file from which to inherit all the values defined in that file. The ‘child’ file can then overwrite only the needed values, thereby completely eliminating any overlap between the parent and child files.

Example

.richmediarc.en (parent file):
```
{

"settings": {

	"type": "plain",

	"entry": {

		"js": "./script/main.js",

		"html": "./index.html"
},
	"size": {

		"width": 300,

		"height": 250
	}
},
	"content": {

		"text": "Welcome!",

		"cta": "Click here",

		"bgcolor": "#FF0000"

		"bgimg": "./img/bgimage.jpg"
	}
}
```
.richmediarc.fr (child file):
```
{
	"parent": "./richmediarc.en",

	"content": {

		"text": "Bienvenue!",

		"cta": "Cliquez Ici"
	}
}
```
As shown in the example above, in the French .richmediarc, we only specify the parent file, and the new values for text and cta. Everything else is inherited from the parent file.

This method is very useful and scalable, should the need arise to add even more languages or versions.  

[Go back](./creating-a-project.md/#creating-a-new-project)