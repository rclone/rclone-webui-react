import configReducer from "./configReducer";
import {GET_CONFIG_DUMP, GET_PROVIDERS, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";

describe('Config Reducer', function () {
    it('should return default state', function () {
        const newState = configReducer(undefined, {});
        expect(newState).toEqual({
            providers: [],
            configDump: {},
            hasError: false,
        });
    });

    it('should return new state for GET_PROVIDERS', function () {
        const providers = [
            {
                Name: 'alias',
                Description: 'Alias for an existing remote',
                Prefix: 'alias',
                Options: [
                    {
                        Name: 'remote',
                        Help: 'Remote or path to alias.\nCan be "myremote:path/to/dir", "myremote:bucket", "myremote:" or "/local/path".',
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
                    }
                ]
            }
        ];

        const newState = configReducer(undefined, {
            type: GET_PROVIDERS,
            payload: providers
        });

        expect(newState.providers).toEqual(providers);

    });

    it('should return new state for GET_CONFIG_DUMP SUCCESS', function () {
        const dump =
            {
                eventsfunk: {
                    acknowledge_abuse: 'false',
                    allow_import_name_change: 'false',
                    alternate_export: 'false',
                    auth_owner_only: 'false',
                    chunk_size: '8M',
                    client_id: '',
                    client_secret: '',
                    export_formats: 'docx,xlsx,pptx,svg',
                    formats: '',
                    impersonate: '',
                    import_formats: '',
                    keep_revision_forever: 'false',
                    list_chunk: '1000',
                    pacer_burst: '100',
                    pacer_min_sleep: '100ms',
                    root_folder_id: '',
                    scope: '',
                    service_account_credentials: '',
                    service_account_file: '',
                    shared_with_me: 'false',
                    skip_checksum_gphotos: 'false',
                    skip_gdocs: 'false',
                    team_drive: '',
                    token: '{"access_token":"ya29.GlwpBwoWlgdY4iklkvTyGKcAj-riCDNbXFQ2yxQeofU9Jqqv8ynvDKzugTJYVOJMhEjkisDveOFmQwpYuh4Jdp0C8NHrG3FRmYzxnPubVtX3dyIjEglit-1KCQbJ6A","token_type":"Bearer","refresh_token":"1/kwlvEghV-Kutx0LPoazLviSzI3wY8RCBUVnM53MpjtI","expiry":"2019-06-17T00:20:56.014222131+05:30"}',
                    trashed_only: 'false',
                    type: 'drive',
                    upload_cutoff: '8M',
                    use_created_date: 'false',
                    use_trash: 'true',
                    v2_download_min_size: 'off'
                },
            };
        const newState = configReducer(undefined, {
            type: GET_CONFIG_DUMP,
            status: REQUEST_SUCCESS,
            payload: dump
        });

        expect(newState.configDump).toEqual(dump);
        expect(newState.hasError).toBe(false);
        expect(newState.error).toBe(undefined)


    });
    it('should return new state for GET_CONFIG_DUMP FAILURE ', function () {
        const error = {"error": "Network Error"};
        const newState = configReducer(undefined, {
            type: GET_CONFIG_DUMP,
            status: REQUEST_ERROR,
            payload: error
        });
        expect(newState.hasError).toBe(true);
        expect(newState.error).toEqual(error);
    });


});