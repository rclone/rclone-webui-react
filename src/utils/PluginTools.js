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