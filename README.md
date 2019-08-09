# Rclone Web UI  [![Google Summer of Code 19](https://img.shields.io/badge/Google%20Summer%20of%20Code-2019-blue.svg)](https://summerofcode.withgoogle.com/projects/#5104629795258368)

[![CCExtractor](https://img.shields.io/badge/CCExtractor-org-blue.svg)](https://www.ccextractor.org/) [![RClone](https://img.shields.io/badge/RClone-org-blue.svg)](https://rclone.org/)

This is a reactjs based web UI for the rclone cli project @ [Rclone Website](rclone.org)  

This project can be unstable and is being actively developed. Feel free to create any issues, feature requests or enhancements as you encounter them. 

## Build Status

[![Build Status](https://travis-ci.com/rclone/rclone-webui-react.svg?branch=master)](https://travis-ci.com/rclone/rclone-webui-react) 
[![Greenkeeper badge](https://badges.greenkeeper.io/rclone/rclone-webui-react.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/rclone/rclone-webui-react/badge.svg?branch=master)](https://coveralls.io/github/rclone/rclone-webui-react?branch=master)

## Getting Started

The project currently requires you to install and configure react and npm to run correctly.
Read more about the project details at [good2be.me](http://good2be.me/blog)

## Screenshots
### Dashboard
![Dashboard](screenshots/dashboard.png)

### Login
![Login](screenshots/login.png)

### Remote Explorer
![Explorer](screenshots/remoteexplorer.png)

### Creating config
![New Config](screenshots/newRemote.png)

## Get the automated script and get running

**Bash users:**

Download the sh file given here: 
[webui.sh](https://raw.githubusercontent.com/negative0/rclone-webui-react/master/package.json)

Copy the file to root folder of rclone.

```
cp webui.sh <root-of-rclone>/
```
First of all open the webui.sh

You need to edit this code to the username and password you would like to use.
```
username='<your-username>'
password='<your-password>'
```
Save this file.

Now you can run the following commands:

- Download the project:
```
./webui.sh get
```

- Build the webui app:
```
./webui.sh build
```

- Run the app with rclone backend:
```
./webui.sh run
```

- At any point, you can update the webui with new changes from the repo (optional):

```
./webui.sh update
```


**Windows:**
Coming soon

### Get the Project
```
    git clone https://github.com/negative0/rclone-webui-react
```
OR download a zip from the option above.

### Install dependencies
If you are using NPM:

**Make sure that you are using the latest LTS version of NPM**
```
    cd <cloned directory>
    npm install 
```

Using yarn:
```
    cd <cloned directory>
    yarn install
```


### Run the project
```
    npm start
```
OR
```
    npm run start
```

### Run tests
```npm test```OR ```yarn test``` if you want to run all jest tests. 
Test specific environment can be set using setupTests.js

**With Coverage**: ```npm run test:cov```


### Run Rclone
You have to run rclone with the following flags:
```
    rclone rcd --rc-user=<username> --rc-pass=<password> --rc-serve
```
Replace username and password with your custom username password. This will be required to login to rclone. rc-no-auth is not available due to security concerns.

--rc-serve:  It serves the remote objects at localhost:5572/[remoteName:remotePath]/path/to/file. It enables us to download files via the RemoteExplorer through the browser.

## Progress

For the progress and future implementation details please refer Progress.md


