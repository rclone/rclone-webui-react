/**
 * Return URL string for a given plugin
 * @param ipAddress     {string}    IpAddress from where to load the plugin
 * @param pluginName    {string}    The name of the plugin (usually the repository name)
 * @param author        {string}    The name of the author (usually the repository author)
 * @param downloadURL   {string}    The url which can be used by rclone to fetch the object
 * @param MimeType      {string}    The MimeType of the object served by downloadURL
 * @returns {string}    {string}    URL string.
 */
export const getPluginServeUrl = (ipAddress, pluginName, author, downloadURL, MimeType) => {
    if (!ipAddress) {
        throw new Error("Invalid IP address specified " + ipAddress);
    }
    if (!pluginName) {
        throw new Error("Invalid pluginName Passed" + pluginName);
    }
    if (!author) {
        throw new Error("Invalid author specified" + author);
    }
    if (!downloadURL) {
        throw new Error("Invalid Download url" + downloadURL);
    }
    if (!MimeType) {
        throw new Error("Invalid MimeType" + MimeType);
    }

    return `${getPluginBaseUrl(ipAddress, pluginName, author)}?loadUrl=${downloadURL}&mimeType=${MimeType}`;
};
/**
 *  * Return URL string for a given plugin
 * @param ipAddress     {string}    IpAddress from where to load the plugin
 * @param pluginName    {string}    The name of the plugin (usually the repository name)
 * @param author        {string}    The name of the author (usually the repository author)
 *
 */
export const getPluginBaseUrl = (ipAddress, pluginName, author) => {
    if (!ipAddress) {
        throw new Error("Invalid IP address specified " + ipAddress);
    }
    if (!pluginName) {
        throw new Error("Invalid pluginName Passed" + pluginName);
    }
    if (!author) {
        throw new Error("Invalid author specified" + author);
    }

    return `${ipAddress}/plugins/${author}/${pluginName}/`;
}

/**
 * Get plugins from map.
 * @param plugins       {{}}    plugins map
 * @returns             {[]}    array of plugins
 */
export const getPluginsArray = (plugins) => {
    const availablePlugins = [];

    for (let m in plugins) {
        if (plugins.hasOwnProperty(m)) {
            let p = plugins[m];
            availablePlugins.push(p)
        }
    }

    return availablePlugins;
}

/**
 * filter plugins by file handling types
 * @param plugins       {[]}
 * @param MimeType      {String}
 * @return              {[]}
 */
export const filterPluginsByMimeType = (plugins, MimeType) => {
    return plugins.filter((p) => p["rclone"] &&
        p["rclone"]["handlesType"] &&
        p["rclone"]["handlesType"].includes(MimeType));
}

/**
 * filter plugins by file handling types
 * @param plugins   {[]}
 * @param type      {String}
 * @return          {[]}
 */
export const filterPluginsByType = (plugins, type) => {
    return plugins.filter((p) => p["rclone"] &&
        p["rclone"]["pluginType"] &&
        p["rclone"]["pluginType"].toUpperCase() === type.toUpperCase());
}