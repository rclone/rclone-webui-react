#!/bin/bash

username=''
password=''

repoName='rclone-webui-react'

command="$1"

errors=0

buildApp () {
	npm install
	npm run build
	cd ..
}

if [[ -z "$username" ]]; then
	#statements
	echo "Please set username in the webui.sh"
	errors=$((errors + 1))
fi

if [[ -z "$password" ]]; then
	#statements
	echo "Please set password in the webui.sh"
	errors=$((errors + 1))
fi

if [[ $errors -ge 1 ]]; then
	#statements
	echo "$valid errors encountered. Please fix them to continue."
	exit
fi


if [[ -z "$command" ]]; then
	echo "Command not provided"
fi

if [[ "$command" == "get" ]]; then
	#statements
	# Replace code to download the prebuilt version
	if [[ -n rclone-webui-react ]]; then
		#statements
		git clone https://github.com/rclone/"$repoName".git
	fi
fi

if [[ "$command" == "build" ]]; then
	#statements
	if [[ -e "$repoName"  ]]; then
		#statements
		cd rclone-webui-react
		buildApp
	fi
fi

if [[ "$command" == "update" ]]; then
	#statements
	cd rclone-webui-react
	git pull
	buildApp

fi

if [[ "$command" == "run" ]]; then
	#statements
	if [[ -e "$repoName"/build ]]; then
		#statements
		./rclone rcd --rc-serve --rc-user="$username" --rc-pass="$password" --rc-files="`pwd`/rclone-webui-react/build" -vv
	else
		echo "Please run build first"
	fi
	
fi

