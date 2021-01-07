#Running a development server locally
To start the dev server, type the following command in your terminal or console.

```
npm run dev
```

“Dev” is actually a script which is found in package.json, which in turn runs the command rds-dev. After you execute this script, it will start searching for .richmediarc files in all the directories and subdirectories of your project.  You’ll see something like this:

```
i Searching for configs
✔ Found 4 config(s)
✔ Taking a look if it has Spreadsheets
? Please select config(s) build: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) all
 ( ) ./src/300x250/.richmediarc
 ( ) ./src/300x600/.richmediarc
 ( ) ./src/728x90/.richmediarc
 ( ) ./src/970x250/.richmediarc
```

Here, you can select which units you wish to preview. Navigate with arrow keys and select (it’s possible to select multiple values) with spacebar, then press enter to confirm your selection.


```
? Do you want a browser to open to your dev location? (Y/n)
```
You can select whether or not to open a new browser window.

```
? save this as a separate part command in package.json (y/N)
```

Use this option to save your selection as a separate command. If you select y, you’ll see something like this:

````
? please provide a name for your command. You will type something like npm run dev:__NAME__
````

No special chars, spaces, dashes just a single word. You’ll have to give it a unique name, for example “selection”.

Now you will be able to run a dev server with the same selection simply by running

```
npm run dev:selection
```

It will now compile the banners you selected and start a local server on port 8000. You can see the preview at [http://localhost:8000](http://localhost:8000).

(if port 8000 is busy, it will automatically use the next available port, 8001, 8002, etc)

No special chars, spaces, dashes just a single word.

You’ll have to give it a unique name, for example “selection”.

Now you will be able to run a dev server with the same selection simply by running


>Important: You don’t have to restart the server if you make any changes to your banner’s code. It will automatically recompile your units when it detects changes in the source code.


#Build and upload your preview

##Build

To run the build script, you can run “npm run build” in your terminal or console.
“build” is actually a script which is found in package.json, which in turn runs the command rds-build. After you execute this script, it will start searching for .richmediarc files in all the directories and subdirectories of your project.  You’ll see something like this:

```
npm run build
```

“build” is actually a script which is found in package.json, which in turn runs the command rds-build. After you execute this script, it will start searching for .richmediarc files in all the directories and subdirectories of your project. You’ll see something like this:

```
? Please choose the current build to start. (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) all
( ) ./src/300x250/.richmediarc
( ) ./src/300x600/.richmediarc
( ) ./src/728x90/.richmediarc
( ) ./src/970x250/.richmediarc
```

Here, you can select which units you wish to build. Navigate with arrow keys and select (it’s possible to select multiple values) with spacebar, then press enter to confirm your selection.
```
? save this as a separate command in package.json (y/N)
```

Use this option to save your selection as a separate command. If you select y, you’ll see something like this:

```
? please provide a name for your command. You will type something like npm run build:__NAME__
```
No special chars, spaces, dashes just a single word.

You’ll have to give it a unique name, for example “selection”. Now you will be able to run a dev server with the same selection simply by running

 ```
 npm run build:selection
```

It will now compile the banners you selected and then move these files to the ./build directory, along with zipped files which you can use for delivering files or uploading to certain previews.

##Upload

Uploading your banners to a preview can be done in a number of ways.

The easiest method is to use our tool called “henk”, which you can start by running the following command:

```
npm run preview
```

If it’s the first time you run this command, you’ll see something like this:

```
Welcome to HENK (transport service)
? No .henkrc as added to the .gitignore, should i add it? (Y/n)
```

Press Y. You’ll see the following options

```
? Where do you want to upload? (Use arrow keys)
> Mediamonks Preview
  Amazon S3
  SFTP (alpha)
  - FTP (Disabled)
  - Netflix Monet (Disabled)
  - Google DoubleClick Studio (Disabled)
```

Below are guides for uploading to an Amazon S3 bucket.

FYI MediaMonks Preview and Amazon S3 do practically the same thing.


###MediaMonks Preview

This will upload the entire build folder to a S3 bucket. When you select this, you’ll have to enter a few things:

```
? What directory you want to upload?
```

Just enter
```
build
```
here by default.

```
? Please fill in the name for the S3 Bucket:
? Please fill in the accessKeyId for the S3 Bucket:
? Please fill in the secretAccessKey for the S3 Bucket:
```
These values you can find in the pinned messages of our ‘wfh-aas-dev’ Slack channel.

```
? outputDir: (3334d7e2-3d58-4c84-aec7-4b6d4f50c7f0/)
```

It will automatically generate a unique hash value as the directory name of the preview. Just press enter or add your own value and then press enter.

It will then upload the contents of the ./build/ directory and show you a link to the preview, which should look something like this:

>http://richmedia-previews-s3bucket-khpmpnjb2dya.s3.amazonaws.com/3334d7e2-3d58-4c84-aec7-4b6d4f50c7f0/index.html
