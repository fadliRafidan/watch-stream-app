import React from 'react'
import { Dimensions, Image, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
interface CarouselProps {
    data: string[]
}

const width = Dimensions.get('window').width;

export default function CarouselComponent({ data }: CarouselProps) {
    return (
        <Carousel
            width={110}
            height={150}
            style={styles.carousel}
            snapEnabled={false}
            pagingEnabled={false}
            loop
            autoPlay
            withAnimation={{
                type: "timing",
                config: {
                    duration: 10000,
                    easing: Easing.linear,
                },
            }}
            autoPlayInterval={0}
            data={data}
            renderItem={({ index, item }) => (
                <Animated.View
                    style={[
                        {
                            flexWrap: "wrap",
                            width: width,
                        },
                    ]}
                >
                    <Image
                        source={{ uri: item }}
                        style={{
                            height: 150,
                            width: 150,
                            objectFit: 'contain',
                        }}
                    />

                </Animated.View>
            )}
            enabled={false}
        />
    )
}

const styles = StyleSheet.create({
    carousel: {
        width: 600,
        justifyContent: 'center',
        alignItems: 'center',
    },
})