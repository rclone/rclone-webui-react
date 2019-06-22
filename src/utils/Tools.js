export function isEmpty(obj) {
    if (Array.isArray(obj)) return obj.length === 0;
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export default isEmpty;

export function bytesToMB(bytes) {
    if (bytes === 0) return 0;
    const mb = bytes / 1024 / 1024;

    return mb;
}

export function bytesToKB(bytes) {
    if (bytes === 0) return 0;
    const kb = bytes / 1024;

    return kb;
}

export function bytesToGB(bytes) {
    if (bytes === 0) return 0;
    const mb = bytes / 1024 / 1024 / 1024;

    return mb;
}

export function bpsToMbps(bps) {
    if (bps === 0) return 0;
    const mbps = bytesToMB(bps);
    return mbps;
}

export function formatBytes(bytes, decimals = 2) {
    if (bytes < 1) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function secondsToMinutesHourString(seconds) {
    if (seconds === 0) {
        return `00:00:00 S`;
    }
    let minutes = seconds / 60;
    seconds = seconds % 60;
    let hours = minutes / 60;
    minutes = minutes % 60;

    return `${Math.round(hours)}:${Math.round(minutes)}:${Math.round(seconds)} hrs`;
}

export function secondsToStr(seconds) {
    // TIP: to find current time in milliseconds, use:
    // var  current_time_milliseconds = new Date().getTime();

    function numberEnding(number) {
        return (number > 1) ? 's' : '';
    }

    let years = Math.floor(seconds / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years);
    }
    //TODO: Months! Maybe weeks?
    let days = Math.floor((seconds %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days);
    }
    let hours = Math.floor((seconds %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours);
    }
    let minutes = Math.floor((seconds %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes);
    }
    seconds = seconds % 60;
    if (seconds) {
        return seconds.toFixed(2) + ' second' + numberEnding(seconds);
    }
    return 'Just now'; //'just now' //or other string you like;
}

export function baseValidator(regex, str) {

    return regex.test(str);
}


export function validateSizeSuffix(str) {
    const regex = /^(off|(([0-9]+[.][0-9]+|[0-9]+)([KMGTP])))$/i;

    return baseValidator(regex, str);
}

export function validateInt(str) {
    const regex = /^([0-9]+)$/;
    return baseValidator(regex, str);
}

export function validateDuration(str) {
    const regex = /^(\d+[h])?(\d+[m])?(\d+[s])?(\d+ms)??$/i;
    return baseValidator(regex, str);
}

export function openInNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();
}

/*Returns object of config if found, else returns undefined*/
export function findFromConfig(config, name) {
    const currentConfig = config.find((ele, idx, array) => {
        return (name === ele.Prefix);
    });
    return currentConfig;
}

export function addColonAtLast(name) {
    if (name.indexOf(':') === -1) {
        if (name[name.length - 1] !== ":") {
            name = name + ":"
        }
    }

    return name;
}

const visibilityAssociation = {
    Images: "image/jpeg",
    Pdf: "application/pdf",
};


export function changeListVisibility(list, filter, checkList = visibilityAssociation) {
    let acceptType = checkList[filter];
    // console.log(list);
    if (acceptType) {
        let newList = list.filter((item) => {
            return (item.IsDir || item.MimeType === acceptType);
        });
        return newList;
    }
    return list;

}

export function changeSearchFilter(list, searchQuery = "") {
    searchQuery = searchQuery.toLowerCase();
    if (searchQuery) {
        let newList = list.filter((item) => {
            return item.Name.toLowerCase().startsWith(searchQuery);
        });
        return newList;
    }
    return list;

}


export function isLocalRemoteName(remoteName) {
    return (remoteName && remoteName !== "" && remoteName[0] === "/");
}