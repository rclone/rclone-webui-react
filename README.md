# Rclone Web UI - Google Summer of Code '19 

This is a reactjs based web UI for the rclone cli project @ [Rclone Website](rclone.org)  

This project can be unstable and is being actively developed. Feel free to create any issues, feature requests or enhancements as you encounter them. 

## Build Status

[![Build Status](https://travis-ci.com/negative0/rclone-webui-react.svg?branch=master)](https://travis-ci.com/negative0/rclone-webui-react) [![Greenkeeper badge](https://badges.greenkeeper.io/negative0/rclone-webui-react.svg)](https://greenkeeper.io/)

## Getting Started

The project currently requires you to install and configure react and npm to run correctly

## Screenshots
### Dashboard
![Dashboard](screenshots/dashboard.png)

### Login
![Login](screenshots/login.png)

### Remote Explorer
![Explorer](screenshots/remoteexplorer.png)

### Creating config
![New Config](screenshots/newRemote.png)


### Get the Project
```
    git clone https://github.com/negative0/rclone-webui-react
```
OR download a zip from the option above.

### Install dependencies
```
  cd <cloned directory>
  npm install 
```

### Run the project
```
  npm start
```

### Run Rclone
You have to run rclone with the following flags:
```
    rclone rcd --rc-user=<username> --rc-pass=<password> --rc-serve
```
Replace username and password with your custom username password. This will be required to login to rclone.

--rc-serve:  It serves the remote objects at localhost:5572/[remoteName:remotePath]/path/to/file. It enables us to download files via the RemoteExplorer through the browser.

## Progress

For the progress and future implementation details please refer Progress.md


