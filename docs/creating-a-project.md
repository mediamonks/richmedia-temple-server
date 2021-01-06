# Creating a new project

In the terminal, make your way to a new project folder of your choosing, i.e. documents/work/my-banner-project

### Step 1

Generate (scaffold) a new banner project. This will generate all the necessary files and folder structure
you need for the project.

$ `yo richmedia-temple`

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608810960/MM_Temple_Server_docs/Screenshot_install_richmedia_scaffold.png" />
</div>  

If this is the first time you’re running this command, Yeoman will ask you the following:

```
We're constantly looking for ways to make yo better!

May we anonymously report usage statistics to improve the tool over time?

More info: https://github.com/yeoman/insight & http://yeoman.io

Up to you if you want to send them statistics. Hit either **Y** or **N**.
```

After you make your selection, the following menu appears

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608811575/MM_Temple_Server_docs/Screenshot_richmedia-welcome.png" />
</div> 

In this menu you can use the arrow keys to navigate the cursor.

### Step 2

We’re just going to create a standard banner in this guide, so in this case, just hit Enter to select

‘create a banner’.

Enter the name of the project or just hit enter to use the default, which is the folder name.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608811916/MM_Temple_Server_docs/Screenshot_banner-name.png" />
</div>


### Step 3

Select the first unit you would like the generator to create. Use the arrow keys to navigate and hit Enter
when ready.

<div style="display: flex; justify-content: center">
<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1608812165/MM_Temple_Server_docs/Screenshot_select-unit-size.png" />
</div> 

Enter the directory where you wish the source files to be placed. Just hit enter to use the default, which is something like “./src/{size}x{width}”


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

/node_modules/ <br>
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
	- [.richmediarc](./richmediarc.md)
	- index.html

.editorconfig

.gitignore

.prettierrc

package.json ([more info](https://docs.google.com/document/d/18yvVCWTs0-tUXli90fnnok4tv4JzQVo3DLaQRDtSlIY/edit#heading=h.uqdkj8lreb37))

package-lock.json

### Step 4 

Make sure everything works by running

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

[Go back](./getting-started.md)