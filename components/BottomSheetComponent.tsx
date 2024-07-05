import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface BottomSheetComponentProps {
    onCreateAccount: (text: string) => void;
    bottomSheetModalRef: any;
    error: boolean;
    onDismiss: () => void
}

export default function BottomSheetComponent({ onCreateAccount, bottomSheetModalRef, error, onDismiss }: BottomSheetComponentProps) {
    const [email, setEmail] = useState('');

    const snapPoints = useMemo(() => ['25%', '30%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.wrapperButtonContainer}>
                <Pressable onPress={handlePresentModalPress} style={styles.buttonOpenModal}>
                    <Text style={styles.buttonTextOpenModal}>Siapkan akun anda</Text>
                    <Ionicons name='arrow-forward-circle-outline' size={27} color={Colors.dark.primary} />
                </Pressable>
            </View>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onDismiss={onDismiss}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <View style={styles.wrapperFormInput}>
                        <View style={{ width: '100%', rowGap: 5 }}>
                            {error ?
                                <Text style={{ color: '#dc2626', textAlign: 'center' }}>
                                    Harap masukan email!
                                </Text>
                                :
                                <Text style={{ color: Colors.dark.primary, textAlign: 'center' }}>
                                    Masukan Email
                                </Text>
                            }
                            <View style={[styles.wrapperFormInputContainer, { borderColor: error ? '#dc2626' : Colors.dark.primary }]}>
                                <TextInput value={email} placeholder='Masukan email' inputMode='email' onChangeText={(e) => setEmail(e)} style={styles.inputText} />
                            </View>
                        </View>
                        <Pressable onPress={() => onCreateAccount(email)} style={styles.button}>
                            <Text style={styles.buttonText}>Lanjutkan</Text>
                            <Ionicons name='log-in-outline' size={27} color={Colors.dark.text} />
                        </Pressable>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', alignItems: 'center', width: '100%'
    },
    wrapperButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    wrapperFormInput: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
        rowGap: 20,
        marginTop: 15
    },
    wrapperFormInputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },
    buttonTextOpenModal: {
        color: Colors.dark.primary,
        fontSize: 15,
        fontWeight: '500'
    },
    buttonText: {
        color: Colors.dark.text,
        fontSize: 15,
        fontWeight: '500'
    },
    buttonOpenModal: {
        backgroundColor: Colors.dark.text,
        borderRadius: 20,
        height: 42,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 10
    },
    button: {
        backgroundColor: Colors.dark.primary,
        borderRadius: 20,
        height: 42,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 10
    },
    inputText: {
        backgroundColor: '#FFFFFF',
        height: 35,
        borderRadius: 5,
        width: '100%',
        color: Colors.dark.background,
        padding: 5
    },

});