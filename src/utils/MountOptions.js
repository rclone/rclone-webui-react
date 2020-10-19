export const vfsOptions = {
    "CacheMaxAge": {
        Type: 'int',
        Default: 3600000000000
    },
    "CacheMaxSize": {
        Type: 'int',
        Default: -1,
        Help: ''
    },
    "CacheMode": {
        Type: 'int',
        Options: [
            {value:'off', key: 0},
            {value:'minimal', key: 1},
            {value:'writes', key: 2},
            {value:'full', key: 3},
        ],
        Default: 0,
        Help: ''
    },
    "CachePollInterval": {
        Type: 'int',
        Default: 60000000000,
        Help: ''
    },
    "CaseInsensitive": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "ChunkSize":{
        Type: 'int',
        Default: 134217728,
        Help: ''
    },
    "ChunkSizeLimit": {
        Type: 'int',
        Default: -1,
        Help: ''
    },
    "DirCacheTime": {
        Type: 'int',
        Default: 300000000000,
        Help: ''
    },
    "DirPerms": {
        Type: 'int',
        Default: 511,
        Help: ''
    },
    "FilePerms": {
        Type: 'int',
        Default: 438,
        Help: ''
    },
    "GID": {
        Type: 'int',
        Default: 1000,
        Help: ''
    },
    "NoChecksum": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "NoModTime": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "NoSeek": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "PollInterval": {
        Type: 'int',
        Default: 60000000000,
        Help: ''
    },
    "ReadAhead": {
        Type: 'int',
        Default: 0,
        Help: ''
    },
    "ReadOnly": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "ReadWait": {
        Type: 'int',
        Default: 20000000,
        Help: ''
    },
    "UID": {
        Type: 'int',
        Default: 1000,
        Help: ''
    },
    "Umask": {
        Type: 'int',
        Default: 2,
        Help: ''
    },
    "WriteBack": {
        Type: 'int',
        Default: 5000000000,
        Help: ''
    },
    "WriteWait": {
        Type: 'int',
        Default: 1000000000,
        Help: ''
    }
}

export const mountOptions = {
    "AllowNonEmpty": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "AllowOther": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "AllowRoot": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "AsyncRead": {
        Type: 'bool',
        Default: true,
        Help: ''
    },
    "AttrTimeout": {
        Type: 'int',
        Default: 1000000000,
        Help: ''
    },
    "Daemon": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "DaemonTimeout": {
        Type: 'int',
        Default: 0,
        Help: ''
    },
    "DebugFUSE": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "DefaultPermissions": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "ExtraFlags": {
        Type: 'array',
        Default: [],
        Help: ''
    },
    "ExtraOptions": {
        Type: 'array',
        Default: [],
        Help: ''
    },
    "MaxReadAhead": {
        Type: 'int',
        Default: 131072,
        Help: ''
    },
    "NoAppleDouble": {
        Type: 'bool',
        Default: true,
        Help: ''
    },
    "NoAppleXattr": {
        Type: 'bool',
        Default: false,
        Help: ''
    },
    "VolumeName": {
        Type: 'string',
        Default: "",
        Help: ''
    },
    "WritebackCache": {
        Type: 'bool',
        Default: false,
        Help: ''
    }
}