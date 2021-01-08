#Package.json

Below you will find the contents of the package.json file which gets generated in the root folder when you start a new project with the generator:

```
{
  "name": "my_banner_project",
  "version": "1.0.0",
  "description": "",
  "homepage": "",
  "author": "",
  "engines": {
    "npm": ">= 8.0.0"
  },
  "scripts": {
    "dev": "rds-dev",
    "build": "rds-build",
    "preview": "./node_modules/.bin/henk"
  },
  "license": "ISC",
  "dependencies": {
    "@mediamonks/richmedia-temple-server": "^6.0",
    "@mediamonks/temple": "^4.0.0",
    "@mediamonks/henk": "^1.1.1"
  }
}
```

You can run the commands under “scripts” in the following way:

```
npm run dev
npm run build
npm run preview
```

and so on.

##dev
Will compile your banners and start a preview server on localhost:8000 by default

>More info: Running a dev server (link to running-building-uploading)


##build
Will compile your banners and place them in the /build directory as folders and zip files, ready for delivery.

>More info: Build and upload your preview (link!)


##preview
Will upload your banners to a preview. The first time you run this command, you will have to configure the settings.

>More info: Build and upload your preview (link!)



Under dependencies, you’ll see the 3 default dependencies needed to run dev/build/preview:

```
"dependencies": {
    "@mediamonks/henk": "^1.1.1",
    "@mediamonks/richmedia-temple-server": "^6.0",
    "@mediamonks/temple": "^4.0.0"
  }
```

If these are missing, install them via (for example)

```
npm install @mediamonks/temple
```












