Here you will find all the information you are looking for. And if not please contribute.

First lets setup everything, for that please go to the [documentation](https://mediamonks.github.io/generator-richmedia-temple/) from the generator. [Here](https://mediamonks.github.io/generator-richmedia-temple/)

Then follow documentation down here.

 - [Getting Started](./docs/getting-started.md)
 - [Creating a new project](./docs/creating-a-project.md) 
 - [.richmediarc](./docs/richmediarc.md)  
 - [.richmediarc features](./docs/richmediarc-features.md)

### What is the richmedia temple server?
To explain this as fast as possible, what the rts (richmedia temple server) is a build and development server to develop and build richmedia units as fast as possible.

It does this by setting up a webpack ( https://webpack.js.org/ ) environment where ever it finds a .richmediarc file. Why? Because its faster to just use the same webpack and webpack.config for every display advertising unit, instead of creating one for every single unit.

The .richmediarc file has some added features that are explained [here](./docs/richmediarc-features.md) like being able to link a feed to a richmedia unit so you can build hundreds of units without having to duplicate any code. Or be able to read the data available in the richmediarc in the css file.

