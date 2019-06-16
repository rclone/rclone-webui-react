# Rclone Web UI - Google Summer of Code '19 

This is a reactjs based web UI for the rclone cli project @ [Rclone Website](rclone.org)  

## Build Status

Travis: [![Build Status](https://travis-ci.com/negative0/rclone-webui-react.svg?branch=master)](https://travis-ci.com/negative0/rclone-webui-react)

## Getting Started

The project currently requires you to install and configure react and npm to run correctly


### Install dependencies
```
  npm install -e package.json
```

### Run the project
```
  npm start
```

### Run Rclone
You have to run rclone with the following flags:
```
    rclone rc --rc-no-auth --rc-serve

```

--rc-no-auth: skips authentication for authenticated calls.

--rc-serve:  It serves the remote objects at localhost:5572/[remoteName:remotePath]/path/to/file. It enables us to download files via the RemoteExplorer through the browser.

## Progress

For the progress and future implementation details please refer Progress.md


