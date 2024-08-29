import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import RNFastImage, { FastImageProps, OnProgressEvent } from 'react-native-fast-image';
import { ActivityIndicator } from 'react-native';
import { storage } from '@src/utils/mmkv';
import dayjs from 'dayjs';

enum CacheKey {
    FastImageCacheTime = 'fastImage.cacheTime'
}
const cacheAt = storage.getString(CacheKey.FastImageCacheTime);

if (!cacheAt) {
    storage.set(CacheKey.FastImageCacheTime, dayjs().toString());
}
if (cacheAt && dayjs().diff(dayjs(cacheAt).add(3, 'day')) > 0) { // <-- Cache Image 2 days
    storage.set(CacheKey.FastImageCacheTime, dayjs().toString());
    RNFastImage.clearDiskCache();
    RNFastImage.clearMemoryCache();
}

const FastImage = (props: FastImageProps) => {
    const [isLoading, setLoading] = useState(true);

    function onLoadStart() {
        setLoading(true);
    }
    function onLoadEnd() {
        setLoading(false);
    }

    function onProgress(e: OnProgressEvent) {
        console.log('Loading Progress ' + e.nativeEvent.loaded / e.nativeEvent.total);
    }
    return (
        <View>
            <RNFastImage
                {...props}
                onLoadStart={onLoadStart}
                onProgress={onProgress}
                onLoadEnd={onLoadEnd}
                // defaultSource={images.search_icon} // <-- defaultSource is show image if image loading
            />
            {isLoading && <ActivityIndicator style={styles.loading} />}
        </View>
    );
};

export default FastImage;

const styles = StyleSheet.create({
    loading: { position: 'absolute', left: '40%', bottom: '40%' },
});
