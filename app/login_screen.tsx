import BottomSheetComponent from '@/components/BottomSheetComponent';
import CarouselComponent from '@/components/CarouselComponent';
import { ImageSource, ImageSourceSecond, ImageSourceThrid } from '@/constants/CarouselSource';
import { Colors } from '@/constants/Colors';
import { LoginAction } from '@/store/actions';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function LoginScreen() {
    const dispatch: any = useDispatch();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [error, setError] = useState<boolean>(false)

    const onCreateAccount = (email: string) => {
        if (email.length == 0) {
            setError(true)
            return;
        }
        dispatch(LoginAction(null, { email: email }));
        router.push('(tabs)');
        bottomSheetModalRef.current?.forceClose()
    }

    const onDismiss = () => {
        setError(false)
    }
    return (
        <View style={styles.container}>
            <View style={[styles.carouselWraper, {
                top: 148,
                transform: [{ rotateX: '48deg' }, { rotateZ: '23deg' }],
            }]}>
                <CarouselComponent data={ImageSource} />
            </View>
            <View style={[styles.carouselWraper, {
                top: 270,
                transform: [{ rotateX: '46deg' }, { rotateZ: '23deg' }],
            }]}>
                <CarouselComponent data={ImageSourceSecond} />
            </View>
            <View style={[styles.carouselWraper, {
                top: 395,
                transform: [{ rotateX: '46deg' }, { rotateZ: '24deg' }],
            }]}>
                <CarouselComponent data={ImageSourceThrid} />
            </View>
            <View style={styles.wrapperLogo}>
                <View style={styles.wrapperTextContainer}>
                    <Image style={styles.logo} source={require('@/assets/images/logo-watchstream-transparent.png')} />
                </View>
            </View>
            <View style={styles.wrapperButton}>
                <View style={styles.wrapperDescription}>
                    <View style={styles.badgeContainer}>
                        <View style={styles.badgeWrapper}>
                            <Text style={styles.badgeText}>
                                4K Quality
                            </Text>
                        </View>
                        <View style={styles.badgeWrapper}>
                            <Text style={styles.badgeText}>
                                2024 film
                            </Text>
                        </View>
                        <View style={styles.badgeWrapper}>
                            <Text style={styles.badgeText}>
                                1000+ film
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.descriptionText}>
                        Lebih dari 1000+ film favorit yang siap dinikmati bersama keluarga.
                    </Text>
                    <Text style={styles.textPrivasiInfo}>
                        Dengan masuk atau mendaftar, kamu menyetujui
                        Ketentuan Layanan dan Kebijakan Privasi kami.
                    </Text>
                </View>
                <BottomSheetComponent onDismiss={onDismiss} error={error} onCreateAccount={onCreateAccount} bottomSheetModalRef={bottomSheetModalRef} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark.primary,
        position: 'relative',
        paddingBottom: 70
    },
    descriptionText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 50
    },
    wrapperLogo: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        zIndex: 1
    },
    wrapperButton: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: 20
    },
    wrapperTextContainer: {
        borderWidth: 1,
        borderColor: Colors.dark.text,
        borderRadius: 14,
        paddingVertical: 5,
        paddingHorizontal: 4,
        backgroundColor: 'rgba(23, 37, 84, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 70,
        width: 140,
        resizeMode: 'contain'
    },
    wrapperButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    buttonText: {
        color: Colors.dark.primary,
        fontSize: 15,
        fontWeight: '500'
    },
    button: {
        backgroundColor: Colors.dark.text,
        borderRadius: 20,
        height: 42,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 10
    },
    wrapperDescription: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        marginBottom: 10
    },
    badgeWrapper: {
        borderWidth: 1,
        borderColor: '#FFFFFF',
        padding: 4,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 14,
        lineHeight: 17
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    carouselWraper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 0,
    },
    textPrivasiInfo: {
        color: Colors.dark.text,
        fontSize: 12
    }
})