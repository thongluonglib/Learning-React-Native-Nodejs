import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { ENTRIES1 } from './data'
// Dimensions of the device's screen
const { width: screenWidth } = Dimensions.get('window');
const CarouselUI = () => {
    const [activeSlide, setActiveSlide] = useState(0)
    const [entries, setEtries] = useState(ENTRIES1)
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );
    function pagination() {
        return (
            <Pagination
                dotsLength={ENTRIES1.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)'
                }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }
    return (
        <View style={styles.container}>
            <Carousel
                data={ENTRIES1}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth * 0.75}
                pagingEnabled={true}
                // autoplay
                loop
                autoplayInterval={1000}
                style={{

                }}
                onSnapToItem={(index) => setActiveSlide(index)}
                // layout={'default'}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
            />
            {pagination()}
        </View>
    )
}

export default CarouselUI

const styles = StyleSheet.create({
    slider: {

    },
    sliderContentContainer: {},
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#eee',
        borderRadius: 8,
        height: 200,
        padding: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '75%',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        marginTop: 10,
    },
})