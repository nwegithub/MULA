import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const DatePicker = ({ open, setOpen, date, setDate, setDob }) => {


    const onChangeDate = (event, selectedDate) => {

        const currentDate = selectedDate || date;
        setOpen(Platform.OS === 'ios');
        setDate(currentDate);


        let tempDate = new Date(currentDate);
        let fDate = tempDate.toISOString().split('T')[0];
        setDob(fDate);


    };

    const picker = () => {
        return (
            <DateTimePicker

                maximumDate={new Date()}
                value={date}
                display={Platform.OS === 'android' ? 'default' : 'inline'}
                onChange={onChangeDate}
                textColor="#000"
                themeVariant="light"
            />
        );
    };

    return (
        <>
            {open &&
                <>
                    {Platform.OS === 'android'
                        ? picker()
                        :
                        <Modal
                            transparent
                            onRequestClose={() => setOpen(false)}>
                            <View style={styles.iosDatePicker}>
                                <View style={{
                                    backgroundColor: '#fff',
                                    padding: 10,
                                    marginHorizontal: 20,
                                    borderRadius: 33,
                                }}>
                                    {picker()}
                                    <TouchableOpacity
                                        onPress={() => setOpen(false)}
                                        style={{
                                            marginBottom: 20,

                                            backgroundColor: '#064cd6',
                                            height: 40,
                                            width: '50%',
                                            alignSelf: 'center',
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{ color: '#fff' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    }
                </>
            }
        </>
    );
};

const styles = StyleSheet.create({
    iosDatePicker: {
        flex: 1,
        justifyContent: 'center',

    },
});

export default DatePicker;
