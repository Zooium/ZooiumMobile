import i18n from '@src/i18n.js';
import { FlatList } from 'react-native';
import Loader from '@components/Loader.js';
import { Layout } from '@ui-kitten/components';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import MediaRow from '@components/rows/MediaRow.js';
import { useTeam } from '@providers/AuthProvider.js';
import parseQuery from '@utils/apollo/parseQuery.js';
import { ReactNativeFile } from 'apollo-upload-client';
import LoadingModal from '@components/LoadingModal.js';
import * as DocumentPicker from 'expo-document-picker';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import UPLOAD_FILE from '@graphql/mutations/File/uploadFile.gql.js';
import DELETE_FILE from '@graphql/mutations/File/deleteFiles.gql.js';
import ResourceListEmpty from '@components/resource/ResourceListEmpty.js';
import React, { Fragment, useState, useEffect, useCallback } from 'react';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import { useEvent, usePrivateChannel } from '@providers/SocketProvider.js';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import VIEW_ANIMAL_MEDIA from '@graphql/queries/Animal/viewAnimalMedia.gql.js';
import { useActionSheet, connectActionSheet } from '@expo/react-native-action-sheet';

// TODO - refactor
function AnimalMediaScreen({ navigation }) {
    // Get passed item and define media query.
    const [item] = useState(navigation.getParam('item'));
    const query = useQuery(VIEW_ANIMAL_MEDIA, {
        variables: {
            id: item && item.id,
        },
    });

    // Connect to socket and listen for thumbnail events.
    const team = useTeam();
    const client = useApolloClient();
    const channel = usePrivateChannel('Team.' + team && team.id);
    useEvent(channel, 'ThumbnailGenerated', event => {
        // Update thumbnail url in query cache.
        query.updateQuery(results => {
            return {
                animal: {
                    ...results.animal,
                    files: results.animal.files.map(item => {
                        if (item.id === event.id) {
                            item.thumbnail_url = event.thumbnail_url;
                        }

                        return item;
                    }),
                },
            }
        });

        // Remove id from new.
        setNewIds(state => state.filter(item => item.id !== event.id))
    }, [item, client]);

    // Parse the query response.
    const { loading, data, refetch } = query;
    const { response } = parseQuery(data);

    // Define file deletion mutation.
    const [deleteFile] = useMutation(DELETE_FILE, {
        update(cache, { data: { deleteFiles } }) {
            // Deep delete the files from cache.
            deleteFiles.forEach(item => cache.deepDelete(item));
        },
    });

    // Define file uploading mutation.
    const [newIds, setNewIds] = useState([]);
    const [uploadFile, { loading: uploading }] = useMutation(UPLOAD_FILE, {
        update(cache, { data: { uploadFile } }) {
            // Add file id to new ids list.
            setNewIds(state => [...state, uploadFile.id]);

            // Add new file to cache.
            query.updateQuery(results => {
                return {
                    animal: {
                        ...results.animal,
                        files: [ ...results.animal.files, uploadFile ],
                    },
                }
            });
        },
    });

    // Share upload actions with navigation.
    useEffect(() => {
        // Parse file from file request response.
        const parseFile = (response) => {
            // Get values from file request response.
            let { uri, name, type, cancelled } = response;
            if (cancelled || type && type === 'cancel') return;

            // Find file extension and name.
            const parts = uri.split('.');
            const extension = parts[parts.length - 1];
            const fileName = name || (new Date()).toLocaleString();

            // Create file instance holder variable.
            const fileInstance = new ReactNativeFile({
                uri: uri,
                type: type + '/' + extension,
                name: fileName,
            });

            // Upload file to back-end.
            uploadFile({
                variables: {
                    team_id: team && team.id,
                    resource_id: item.id,
                    resource_type: 'Animal',
                    file: fileInstance,
                    name: fileName,
                },
            });
        }

        // Share upload actions with navigation.
        navigation.setParams({
            selectFile: async () => parseFile(await DocumentPicker.getDocumentAsync()),
            captureImage: async () => {
                // Ask permission to camera and camera roll.
                await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

                // Attempt to open camera and parse file.
                try {
                    parseFile(await ImagePicker.launchCameraAsync())
                } catch { /* Left blank intentionally */ }
            },
        })
    }, [item, team, uploadFile]);

    // Create callbacks for resource item renderings.
    const { showActionSheetWithOptions } = useActionSheet();
    const emptyCallback = useCallback(() => <ResourceListEmpty resource={i18n.t('Media').toLowerCase()} />, []);
    const itemCallback = useCallback(({ item, index }) => (
        <MediaRow item={item} index={index} viewItem={() => {
            // Show action sheet options.
            showActionSheetWithOptions({
                options: [
                    i18n.t('View'),
                    i18n.t('Rename'),
                    i18n.t('Delete'),
                    i18n.t('Cancel'),
                ],
                cancelButtonIndex: 3,
                destructiveButtonIndex: 2,
            }, (index) => {
                switch (index) {
                    case 0: { // View
                        return navigation.navigate('AuthorizedWebView', {
                            uri: item.view_url,
                            title: item.name,
                        });
                    }
        
                    case 1: { // Rename
                        const route = 'FileEdit';
                        return navigation.navigate({
                            key: route + item.id,
                            routeName: route,
                            params: { item },
                        });
                    }
        
                    case 2: { // Delete
                        return deleteFile({
                            variables: {
                                ids: [item.id],
                            },
                        });
                    }
                }
            });
        }} isNew={newIds.includes(item.id)} />
    ), [newIds, deleteFile, showActionSheetWithOptions]);

    // Return the grid list view.
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                {loading && <Loader /> || (
                    <Fragment>
                        <FlatList
                            numColumns={3}
                            keyExtractor={item => item.id}
                            data={response && response.files || []}
                            renderItem={itemCallback}
                            ListEmptyComponent={emptyCallback}
                            onRefresh={() => {
                                refetch();
                                setNewIds([]);
                            }}
                            refreshing={loading}
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                        />

                        {uploading && <LoadingModal text={i18n.t('Uploading...')} />}
                    </Fragment>
                )}
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

AnimalMediaScreen.navigationOptions = ({ navigation: { getParam } }) => {
    return {
        title: i18n.t('Media'),

        headerRight: function UploadButtons() {
            return (
                <HeaderButtons>
                    <Item title="upload" iconName="upload" onPress={() => {
                        getParam('selectFile')();
                    }} />

                    <Item title="camera" iconName="camera" onPress={() => {
                        getParam('captureImage')();
                    }} />
                </HeaderButtons>
            );
        },
    };
}

export default connectActionSheet(AnimalMediaScreen);
