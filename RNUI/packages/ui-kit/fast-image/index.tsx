import { ImageRequireSource, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import RNFastImage, { FastImageProps, Source } from 'react-native-fast-image';
import { ActivityIndicator } from 'react-native';
import { storage } from '@src/utils/mmkv';
import dayjs from 'dayjs';

enum FastImageCacheKey {
    FastImageCacheTime = 'FastImageCacheTime',
    FastImageCachePreload = 'FastImageCachePreload',
}
(function () {
    FastImageCache();
})();

/**
 * @param {number} [durationExpired=86400000]
 * durationExpired is millisecond, 1000 = 1 second, 86400000 = 1 day. Default 3 days
 */
export function FastImageCache(durationExpired = 3 * 86400000) {
    const cacheAt = storage.getString(FastImageCacheKey.FastImageCacheTime);

    if (!cacheAt) {
        storage.set(FastImageCacheKey.FastImageCacheTime, dayjs().toString());
    }
    if (cacheAt && dayjs().diff(dayjs(cacheAt).add(durationExpired, 'millisecond')) > 0) {
        // <-- Cache Image 3 days
        storage.set(FastImageCacheKey.FastImageCacheTime, dayjs().toString());
        RNFastImage.clearDiskCache();
        RNFastImage.clearMemoryCache();
    }
}

/** Open scope if want to save Image Preload */
export function FastImagePreload() {
    const jsonPreload = storage.getString(FastImageCacheKey.FastImageCachePreload);
    const preloadObject = jsonPreload ? JSON.parse(jsonPreload) : {};
    RNFastImage.preload(Object.values(preloadObject));
    return preloadObject;
}

export const listFastImagePreload = FastImagePreload();

export function FastImageSavePreloadItem(isPreload: boolean, source: Source | ImageRequireSource) {
    if (isPreload) {
        listFastImagePreload[source?.uri] = source;
        storage.set(FastImageCacheKey.FastImageCachePreload, JSON.stringify(listFastImagePreload));
    } else {
        if (listFastImagePreload[source?.uri]) {
            delete listFastImagePreload[source?.uri];
            storage.set(
                FastImageCacheKey.FastImageCachePreload,
                JSON.stringify(listFastImagePreload)
            );
        }
    }
}
/** Open scope if want to save Image Preload */

interface IProps extends FastImageProps {
    showLoading?: boolean;
    isPreload?: boolean;
}
const FastImage = (props: IProps) => {
    const { showLoading = true, isPreload = false, ...restProps } = props;
    const [isLoading, setLoading] = useState(true);
    /** Open scope if want to save Image Preload */
    FastImageSavePreloadItem(isPreload, restProps?.source);
    /** Open scope if want to save Image Preload */
    function onLoadStart() {
        setLoading(true);
    }
    function onLoadEnd() {
        setLoading(false);
    }

    // function onProgress(e: OnProgressEvent) {
    //     console.log('Loading Progress ' + e.nativeEvent.loaded / e.nativeEvent.total);
    // }
    if (!showLoading) {
        return <RNFastImage {...restProps} />;
    }

    return (
        <View>
            <RNFastImage
                {...restProps}
                onLoadStart={onLoadStart}
                // onProgress={onProgress}
                onLoadEnd={onLoadEnd}
                // defaultSource={images.ic_search} // <-- defaultSource is show image if image loading
            />
            {isLoading && <ActivityIndicator style={styles.loading} />}
        </View>
    );
};

export default FastImage;

const styles = StyleSheet.create({
    loading: { position: 'absolute', left: '40%', bottom: '40%' },
});
