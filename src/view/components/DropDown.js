import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

// let fruits=[{ id:1, name:'Mango'}, {id:2, name:'Mango2'}, {id:3, name:'Mango3'}]

const DropDown = ({
    data = [],
    value = {},
    onSelect = () => { },
    placeholder
}) => {
    console.log(' Selected Value:  ', !!value)
    const [showOption, setShowOpetion] = React.useState(false)

    const onSeletedItem = (val) =>{ 
        setShowOpetion(false)
        onSelect(val)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.DropDown}
                activeOpacity={0.8}
                onPress={() => setShowOpetion(!showOption)}
            >
                <Text style={{
                    color: '#11c4a0',
                    paddingHorizontal: 10,
                    fontSize: 15,
                }}>
                    {!!value ? value.name : placeholder}
                </Text>
                <Image source={require('../../assets/images/dropdown.png')}
                    style={{
                        height: 15,
                        width: 15,
                        transform: [
                            { rotate: showOption ? '180deg' : '0deg' }
                        ]
                    }}
                />
            </TouchableOpacity>
            {showOption && (<View style={{paddingHorizontal:20,}}>
                {data.map((val, index) => {
                    return (
                        <TouchableOpacity onPress={() => onSeletedItem(val)}>
                            <Text style={{
                                // marginLeft: 20,
                                fontSize: 13,
                                minHeight:30,
                                padding:10,
                                backgroundColor:'#11c4a0',
                                color:'white'
                            }} key={String(index)}>{val.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            )}

        </View>
    )
}

export default DropDown

const styles = StyleSheet.create({
    DropDown: {
        // backgroundColor:'#ccc',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        padding: 20,
        borderRadius: 20,
        minHeight: 42,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})