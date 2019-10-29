const urls = {
    /**
     * Make Directory.
     */
    mkdir: "operations/mkdir",
    /**
     * Purge a directory.
     */
    purge: "operations/purge",
    /**
     * Delete a file.
     */
    deleteFile: "operations/deletefile",
    /**
     * Create public link.
     */
    createPublicLink: "operations/publiclink",
    /**
     * Stats for rclone backend.
     */
    stats: "core/stats",
    /**
     * Check and set bwlimit.
     */
    bwlimit: "core/bwlimit",
    /**
     * Move a directory.
     */
    moveDir: "sync/move",
    /**
     * Move a file.
     */
    moveFile: "operations/movefile",
    /**
     * Copy Directory
     */
    copyDir: "sync/copy",
    /**
     * Copy Files.
     */
    copyFile: "operations/copyfile",
    /**
     * Cleanup the remote recycle bin(trash).
     */
    cleanUpRemote: "operations/cleanup",

    /**
     * Try to connect without any authentication headers.
     */
    noopAuth: "rc/noopauth",
    /**
     * Check the version of the rclone.
     */
    getRcloneVersion: "core/version",

    /**
     * Memstats for the rclone backend.
     */
    getRcloneMemStats: "core/memstats",
    /**
     * Get options available in the backend.
     */
    getOptions: "options/get",
    /**
     * Get providers configuration in the rclone backend.
     */
    getProviders: "config/providers",
    /**
     * Get entire remote configuration dump from backend.
     */
    getConfigDump: "config/dump",
    /**
     * List the currently running jobs.
     */
    getRunningJobs: "job/list",
    /**
     * Get the status for a job.
     */
    getStatusForJob: "job/status",
    /**
     *  Get config for a specific remote.
     */
    getConfigForRemote: "config/get",
    /**
     * Create a new config with parameters.
     */
    createConfig: "config/create",
    /**
     * Update an existing config with parameters.
     */
    updateConfig: "config/update",
    /**
     * Get File system information and supported features for a given remote time.
     */
    getFsInfo: "operations/fsinfo",

    /**
     * List the remote names of created remotes.
     */
    listRemotes: "config/listremotes",
    /**
     * Get the files for given remoteName and path.
     */
    getFilesList: "operations/list",

    /**
     * Get information about the rclone backend.
     */
    getAbout: "operations/about",
    /**
     * Delete a config with config name.
     */
    deleteConfig: "config/delete",

    /**
     * Stop a running job by job id
     */
    stopJob: "job/stop",

};
export default urls;
