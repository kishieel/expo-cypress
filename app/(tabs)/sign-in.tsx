import { FormInput } from '@app/components/FormInput';
import { Button } from '@app/components/StyledButton';
import { View } from '@app/components/StyledView';
import Colors from '@app/constants/Colors';
import { SignInFormSchema, useSignInForm } from '@app/forms/useSignInForm';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function SignInScreen() {
    const { control, handleSubmit } = useSignInForm();

    const onSubmit = useCallback((data: SignInFormSchema) => {
        router.replace('/home');
        console.log({ data });
    }, []);

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContainer}>
            <View style={styles.contentWrapper}>
                <FormInput label="Email" name="email" placeholder="hello@happy-engineer.tech" control={control} />
                <FormInput label="Password" name="password" placeholder={'•'.repeat(8)} control={control} secure />
                <View style={styles.fill} />
                <Button title="SIGN IN" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: Colors.Twilight,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    contentWrapper: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
        gap: 16,
    },
    fill: {
        flex: 1,
    },
});
