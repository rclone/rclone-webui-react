export const TEST_REDUX_PROPS = {
    status: {
        isConnected: true,
        jobs: {
            bytes: 0,
            checks: 0,
            deletes: 0,
            elapsedTime: 737.732988329,
            errors: 0,
            fatalError: false,
            retryError: false,
            speed: 0,
            transfers: 0
        },
        speed: [
            {
                elapsedTime: 737.732988329,
                speed: 0,
                speedAvg: 0
            }
        ],
        runningAvgSpeed: 0,
        checkStatus: false,
        bandwidth: {
            bytesPerSecond: -1,
            rate: 'off'
        }
    },
    config: {
        providers: [{
            Name: 'b2',
            Description: 'Backblaze B2',
            Prefix: 'b2',
            Options: [
                {
                    Name: 'account',
                    Help: 'Account ID or Application Key ID',
                    Provider: '',
                    Default: '',
                    Value: null,
                    ShortOpt: '',
                    Hide: 0,
                    Required: true,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: false,
                    DefaultStr: '',
                    ValueStr: '',
                    Type: 'string'
                },
                {
                    Name: 'key',
                    Help: 'Application Key',
                    Provider: '',
                    Default: '',
                    Value: null,
                    ShortOpt: '',
                    Hide: 0,
                    Required: true,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: false,
                    DefaultStr: '',
                    ValueStr: '',
                    Type: 'string'
                },
                {
                    Name: 'endpoint',
                    Help: 'Endpoint for the service.\nLeave blank normally.',
                    Provider: '',
                    Default: '',
                    Value: null,
                    ShortOpt: '',
                    Hide: 0,
                    Required: false,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: true,
                    DefaultStr: '',
                    ValueStr: '',
                    Type: 'string'
                },
                {
                    Name: 'test_mode',
                    Help: 'A flag string for X-Bz-Test-Mode header for debugging.\n\nThis is for debugging purposes only. Setting it to one of the strings\nbelow will cause b2 to return specific errors:\n\n  * "fail_some_uploads"\n  * "expire_some_account_authorization_tokens"\n  * "force_cap_exceeded"\n\nThese will be set in the "X-Bz-Test-Mode" header which is documented\nin the [b2 integrations checklist](https://www.backblaze.com/b2/docs/integration_checklist.html).',
                    Provider: '',
                    Default: '',
                    Value: null,
                    ShortOpt: '',
                    Hide: 2,
                    Required: false,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: true,
                    DefaultStr: '',
                    ValueStr: '',
                    Type: 'string'
                },
                {
                    Name: 'versions',
                    Help: 'Include old versions in directory listings.\nNote that when using this no file write operations are permitted,\nso you can\'t upload files or delete them.',
                    Provider: '',
                    Default: false,
                    Value: null,
                    ShortOpt: '',
                    Hide: 0,
                    Required: false,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: true,
                    DefaultStr: 'false',
                    ValueStr: 'false',
                    Type: 'bool'
                },
                {
                    Name: 'hard_delete',
                    Help: 'Permanently delete files on remote removal, otherwise hide files.',
                    Provider: '',
                    Default: false,
                    Value: null,
                    ShortOpt: '',
                    Hide: 0,
                    Required: false,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: false,
                    DefaultStr: 'false',
                    ValueStr: 'false',
                    Type: 'bool'
                },
                {
                    Name: 'upload_cutoff',
                    Help: 'Cutoff for switching to chunked upload.\n\nFiles above this size will be uploaded in chunks of "--b2-chunk-size".\n\nThis value should be set no larger than 4.657GiB (== 5GB).',
                    Provider: '',
                    Default: 209715200,
                    Value: null,
                    ShortOpt: '',
                    Hide: 0,
                    Required: false,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: true,
                    DefaultStr: '200M',
                    ValueStr: '200M',
                    Type: 'SizeSuffix'
                },
                {
                    Name: 'chunk_size',
                    Help: 'Upload chunk size. Must fit in memory.\n\nWhen uploading large files, chunk the file into this size.  Note that\nthese chunks are buffered in memory and there might a maximum of\n"--transfers" chunks in progress at once.  5,000,000 Bytes is the\nminimum size.',
                    Provider: '',
                    Default: 100663296,
                    Value: null,
                    ShortOpt: '',
                    Hide: 0,
                    Required: false,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: true,
                    DefaultStr: '96M',
                    ValueStr: '96M',
                    Type: 'SizeSuffix'
                },
                {
                    Name: 'disable_checksum',
                    Help: 'Disable checksums for large (> upload cutoff) files',
                    Provider: '',
                    Default: false,
                    Value: null,
                    ShortOpt: '',
                    Hide: 0,
                    Required: false,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: true,
                    DefaultStr: 'false',
                    ValueStr: 'false',
                    Type: 'bool'
                },
                {
                    Name: 'download_url',
                    Help: 'Custom endpoint for downloads.\n\nThis is usually set to a Cloudflare CDN URL as Backblaze offers\nfree egress for data downloaded through the Cloudflare network.\nThis is probably only useful for a public bucket.\nLeave blank if you want to use the endpoint provided by Backblaze.',
                    Provider: '',
                    Default: '',
                    Value: null,
                    ShortOpt: '',
                    Hide: 0,
                    Required: false,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: true,
                    DefaultStr: '',
                    ValueStr: '',
                    Type: 'string'
                },
                {
                    Name: 'download_auth_duration',
                    Help: 'Time before the authorization token will expire in s or suffix ms|s|m|h|d.\n\nThe duration before the download authorization token will expire.\nThe minimum value is 1 second. The maximum value is one week.',
                    Provider: '',
                    Default: 604800000000000,
                    Value: null,
                    ShortOpt: '',
                    Hide: 0,
                    Required: false,
                    IsPassword: false,
                    NoPrefix: false,
                    Advanced: true,
                    DefaultStr: '1w',
                    ValueStr: '1w',
                    Type: 'Duration'
                }
            ]
        }],
        configDump: {
            local: {
                type: 'local'
            },
            mydrive: {
                token: '',
                type: 'drive'
            }
        },
        hasError: false
    },
    remote: {
        configs: {
            local: {
                Features: {
                    About: true,
                    BucketBased: false,
                    CanHaveEmptyDirectories: true,
                    CaseInsensitive: false,
                    ChangeNotify: false,
                    CleanUp: false,
                    Copy: false,
                    DirCacheFlush: false,
                    DirMove: true,
                    DuplicateFiles: false,
                    GetTier: false,
                    ListR: false,
                    MergeDirs: false,
                    Move: true,
                    OpenWriterAt: true,
                    PublicLink: false,
                    Purge: true,
                    PutStream: true,
                    PutUnchecked: false,
                    ReadMimeType: false,
                    ServerSideAcrossConfigs: false,
                    SetTier: false,
                    SetWrapper: false,
                    UnWrap: false,
                    WrapFs: false,
                    WriteMimeType: false
                },
                Hashes: [
                    'MD5',
                    'SHA-1',
                    'DropboxHash',
                    'QuickXorHash',
                    'Whirlpool'
                ],
                Name: 'local',
                Precision: 1,
                Root: '/home/negative0/Projects/rclone/rclone',
                String: 'Local file system at /home/negative0/Projects/rclone/rclone'
            }
        },
        remotes: [
            'local',
            'mydrive'
        ],
        files: {
            'local-': {
                time: '2019-07-13T07:43:19.196Z',
                files: [
                    {
                        Path: '.appveyor.yml',
                        Name: '.appveyor.yml',
                        Size: 1434,
                        MimeType: 'application/octet-stream',
                        ModTime: '2019-06-07T22:44:37.357539000+05:30',
                        IsDir: false
                    },
                    {
                        Path: '.circleci',
                        Name: '.circleci',
                        Size: -1,
                        MimeType: 'inode/directory',
                        ModTime: '2019-06-24T09:45:29.483620000+05:30',
                        IsDir: true
                    }
                ]
            }
        },
        hasError: false,
        numCols: 1,
        distractionFreeMode: false
    },
    explorer: {
        backStacks: {
            '0': {
                backStack: {
                    items: [
                        {
                            remoteName: 'local',
                            remotePath: ''
                        }
                    ],
                    count: 1
                },
                forwardStack: {
                    items: [],
                    count: 0
                }
            }
        },
        currentPaths: {
            '0': {
                remoteName: 'local',
                remotePath: ''
            }
        },
        visibilityFilters: {},
        gridMode: {},
        searchQueries: {
            '0': ''
        },
        loadImages: {
            '0': false
        }
    },
    providerStatus: {
        about: {}
    },
    user: {
        auth: {
            userName: 'chaitanya',
            password: 'abcd',
            ipAddress: 'http://localhost:5572/',
            interceptor: 2
        }
    },
    imageLoader: {}
};

export const TEST_FILE_CONTAINER_ID = '0'

export const FILE_ITEM_DATA = {
    Path: '.appveyor.yml',
    Name: '.appveyor.yml',
    Size: 1434,
    MimeType: 'application/octet-stream',
    ModTime: '2019-06-07T22:44:37.357539000+05:30',
    IsDir: false
};