## lets get started

# Contents
- [Installation](#installations)
- [Creating a new project](#creating-a-new-project)
- [.richmediarc](#richmediarc)
	- [Basic .richmediarc concepts](#basic-.richmediarc-concepts)
	- [Advanced .richmediarc concepts](#advanced-.richmediarc-concepts)
	- [Google Sheets](#google-sheets)
- [Running a development server locally](#running-a-development-server-locally)
- [Build and upload your preview](#build-and-upload-your-preview)
	- [Build](#build)
	- [Upload](#upload)
- [Types of banners](#types-of-banners)
- [Package.json](#package.json)

# Installation

Software required

-   Terminal i.e Windows Powershell, iTerm (Mac OS) etc

-   Code editor, i.e. [VSCode](https://code.visualstudio.com/), [Webstorm](https://www.jetbrains.com/webstorm/) etc

-   [NodeJS](https://nodejs.org/en/) V12 or higher




Now, open a terminal and do the following:

- **Step 1** install [Yeoman](https://yeoman.io/) globally

$ `npm install -g yo`

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608809628/MM_Temple_Server_docs/Screenshot_yoeman_install.png" />
</div>  

- **Step 2** Install Media Monks generator globally

$ `npm install -g generator-richmedia-temple`

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608809983/MM_Temple_Server_docs/Screenshot_install_generator.png" />
</div>   

Verify Yeoman is working globally by running the following command

$ `yo --version`

If it shows you the version number, continue to the next step

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608810170/MM_Temple_Server_docs/Screenshot_yo_--vesion.png" />
</div>  

# Creating a new project

In the terminal, make your way to a new project folder of your choosing, i.e. documents/work/my-banner-project

- **Step 3** generate (scaffold) a new banner project. This will generate all the necessary files and folder structure you need for the project.

$ `yo richmedia-temple`

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608810960/MM_Temple_Server_docs/Screenshot_install_richmedia_scaffold.png" />
</div>  

If this is the first time you’re running this command, Yeoman will ask you the following:

We're constantly looking for ways to make yo better!

May we anonymously report usage statistics to improve the tool over time?

More info: https://github.com/yeoman/insight & http://yeoman.io

Up to you if you want to send them statistics. Hit either **Y** or **N**.

After you make your selection, the following menu appears

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608811575/MM_Temple_Server_docs/Screenshot_richmedia-welcome.png" />
</div> 

In this menu you can use the arrow keys to navigate the cursor.

- **Step 4** We’re just going to create a standard banner in this guide, so in this case, just hit Enter to select ‘create a banner’.

Enter the name of the project or just hit enter to use the default, which is the folder name.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608811916/MM_Temple_Server_docs/Screenshot_banner-name.png" />
</div>


- **Step 5** Select the first unit you would like the generator to create. Use the arrow keys to navigate and hit Enter when ready.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608812165/MM_Temple_Server_docs/Screenshot_select-unit-size.png" />
</div> 

Enter the directory where you wish the source files to be placed. Just hit enter to use the default, which is something like “./src/{size}x{width}”

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608812294/MM_Temple_Server_docs/Screenshot_source-directory.png" />
</div>   

Select the type of banner (refer to [types of banners](#types-of-banners) for more info)

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608812407/MM_Temple_Server_docs/Screenshot_banner-type.png" />
</div>

For the purposes of this guide, select ‘plain’.



The generator will generate the basic template files and install the according node modules as well. This process will take a minute.

When it’s done, you’ll end up with a directory looking something like this

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608814657/MM_Temple_Server_docs/Screenshot_project-structure.png" />
</div>

/node_modules/
/src
- /**300x250** (assuming you created a 300x250)

	- /**css**/
		-  styles.css

	-  /**img**/
		- 1x1_blank.png

	- /**script**/
		- Animation.js
		- Banner.js
		- main.js

	- /static/
		- 1x1_blank.png
	- .richmediarc ([more info](https://docs.google.com/document/d/18yvVCWTs0-tUXli90fnnok4tv4JzQVo3DLaQRDtSlIY/edit#heading=h.i6sft07plj7m))
	- index.html

.editorconfig

.gitignore

.prettierrc

package.json ([more info](https://docs.google.com/document/d/18yvVCWTs0-tUXli90fnnok4tv4JzQVo3DLaQRDtSlIY/edit#heading=h.uqdkj8lreb37))

package-lock.json

- **Step 6** Make sure everything works by running

$ `npm run dev` ([more info](https://docs.google.com/document/d/18yvVCWTs0-tUXli90fnnok4tv4JzQVo3DLaQRDtSlIY/edit#heading=h.pbe720401c8i))

This will start the server. You’ll see something like


<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608814774/MM_Temple_Server_docs/Screenshot_run_dev_server.png" />
</div> 

Press **N**

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608814963/MM_Temple_Server_docs/Screenshot_localhost8000.png" />
</div>

Your primary browser will launch, opening [http://localhost:8000/](http://localhost:8000/)

In your terminal, you’ll be able to see the output of webpack, compiling the source code.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608815327/MM_Temple_Server_docs/Screenshot_webpack-compiling.png" />
</div>  

In your browser, the preview environment will load along with a preview of the compiled version of the banner you just created. The banner should display as a simple unit with a red background.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608815492/MM_Temple_Server_docs/Screenshot_banner-browser.png" />
</div> 

If there are no javascript errors and everything works fine, that’s it!


### Step 1
First lets setup everything, for that please go to the [documentation](https://mediamonks.github.io/generator-richmedia-temple/) from the generator. [Here](https://mediamonks.github.io/generator-richmedia-temple/)

When your done with that go to the next step.

### Step 2

Lets run build

in your package.json you would see something like

```
{
    "version": "1.0.0",
    "description": "",
    "homepage": "",
    "author": "",
    scripts: {
        "dev": "rds-dev",
        "build": "rds-build",
        "preview": "./node_modules/.bin/henk'
    },
    license: 'ISC',
}
```

Now run 

```
npm run dev
```

this will execute rds-dev through the scripts in the package.json.

All the other steps are self explanatory just follow what is in your console.

[Go back](../index.md)
