/**
 * Returns whether the passed in object (obj) is empty or it contains some entries.
 * @param obj {$ObjMap} An object to check if it is empty: it can be an array or a map.
 * @returns {boolean}
 */
export function isEmpty(obj) {
    if (Array.isArray(obj)) return obj.length === 0;
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/**
 * Converts bytes into MB.
 * @param bytes {number} bytes to be converted.
 * @returns {number}
 */
export function bytesToMB(bytes) {
    if (bytes === 0) return 0;
    const mb = bytes / 1024 / 1024;

    return mb;
}

/**
 * Converts bytes to KB.
 * @param bytes {number} bytes to be converted
 * @returns {number}
 */
export function bytesToKB(bytes) {
    if (bytes === 0) return 0;
    const kb = bytes / 1024;

    return kb;
}

/**
 * Converts bytes to GB.
 * @param bytes {number} bytes to be converted
 * @returns {number}
 */
export function bytesToGB(bytes) {
    if (bytes === 0) return 0;
    const mb = bytes / 1024 / 1024 / 1024;

    return mb;
}

/**
 * Converts bytes per second to Megabytes per second.
 * @param bps {number} bytes per second.
 * @returns {number}
 */
export function bpsToMbps(bps) {
    if (bps === 0) return 0;
    const mbps = bytesToMB(bps);
    return mbps;
}

/**
 * Format bytes to a human readable format.
 * @param bytes {number} bytes to be formatted.
 * @param decimals {number} specifies the precision of numbers after the decimal point.
 * @returns {string}
 */
export function formatBytes(bytes, decimals = 2) {
    if (bytes < 1) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Converts time in seconds to a minute and hour string of the format "HH:MM:SS hrs"
 * @param seconds {number} Number of seconds since 00:00:00
 * @returns {string}
 */
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

/**
 * Converts seconds to a human readable string with support for year, day, week, minute, seconds.
 * @param seconds
 * @returns {string}
 */
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

/**
 * Base validator takes in a regex exp and tests an input str against that regex.
 * @param regex
 * @param str
 * @returns {boolean | * | never}
 */
export function baseValidator(regex, str) {

    return regex.test(str);
}

/**
 * Validate Size Suffix of the format (off | 1K | 1M | 100G | 10P ) etc
 * @param str {string} String to be validated
 * @returns {boolean|*|never}
 */
export function validateSizeSuffix(str) {
    const regex = /^(off|(([0-9]+[.][0-9]+|[0-9]+)([KMGTP])))$/i;

    return baseValidator(regex, str);
}

/**
 * Validate integer without decimal points (0-9)
 * @param str {number|string} The string to be validated.
 * @returns {boolean|*|never}
 */
export function validateInt(str) {
    const regex = /^([0-9]+)$/;
    return baseValidator(regex, str);
}

/**
 * Validate duration hours, minutes, seconds, milliseconds etc.
 * @param str {number|string} The duration to be validated.
 * @returns {boolean|*|never}
 */
export function validateDuration(str) {
    const regex = /^(\d+[h])?(\d+[m])?(\d+[s])?(\d+ms)??$/i;
    return baseValidator(regex, str);
}

/**
 * Opens the specified URL in a new tab and focus on it.
 * @param url {string} URL to be opened.
 */
export function openInNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();
}

/**
 * Helper function for finding the provider with a given prefix.
 * @param config {$ObjMap} Array of remote configs
 * @param name {string} Specifies the name of the provider to find.
 * @returns {*}
 */

export function findFromConfig(config, name) {
    const currentConfig = config.find((ele, idx, array) => {
        return (name === ele.Prefix);
    });
    return currentConfig;
}


/**
 * Helper function to add semicolon to the last.
 * Behaviour: if the passed in string does not have a semicolon at last, then insert it.
 * If there is a semicolon in the middle, skip insertion.
 * @param name
 * @returns {string}
 */
export function addColonAtLast(name) {
    if (name.indexOf(':') === -1) {
        if (name[name.length - 1] !== ":") {
            name = name + ":"
        }
    }

    return name;
}

/**
 * Allowed types for visibility Status modification in file explorer.
 * @type {{Pdf: string, Images: string}}
 */
const visibilityAssociation = {
    Images: "image/jpeg",
    Pdf: "application/pdf",
};

/**
 * Function to filter the list of files based on the provided visibility status.
 * @param list {$ObjMap}
 * @param filter {string} Specifies the type of files to display eg: Images, Pdf etc.
 * @param checkList {$ObjMap} Provides mimeType matches for every string visibility operation eg: Images: "image/jpeg"
 * @returns {$ObjMap}
 */
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

/**
 * Function to filter the list of files based on the provided search query.
 * Uses linear search for filtering the relevant files.
 * @param list
 * @param searchQuery
 * @returns {*}
 */
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

/**
 * Checks whether the remoteName is local or not. Returns true if it is a remote local path, false otherwise.
 * Behaviour: if the name starts with "/" it is a local name.
 * @param remoteName {string} Name of the remote to check for.
 * @returns {boolean}
 */
export function isLocalRemoteName(remoteName) {
    return (remoteName && remoteName !== "" && remoteName[0] === "/");
}

/**
 * Group the array items by the given key inside each object.
 *
 * @param xs{T}     array of T type
 * @param keyGetter       key to select from the T
 * @returns map{T}  map with format {key: [...objects with same key]}
 */

// export function groupByKey(xs, key) {
//     return xs.reduce(function(rv, x) {
//         (rv[x[key]] = rv[x[key]] || []).push(x);
//         return rv;
//     }, {});
// }
export function groupByKey(xs, keyGetter) {
    const map = new Map();
    xs.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
