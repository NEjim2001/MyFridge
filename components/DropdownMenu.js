import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../theme';

const data = [
  {label: 'Favorite', value: '0'},
  {label: 'To Read', value: '2'},
  {label: 'Reading', value: '3'},
  {label: 'Have Read', value: '4'},
];

export default function DropdownMenu() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={{padding: 16}}>
      <Dropdown
        style={{
          height: 50,
          borderColor: colors.main,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 8,
        }}
        data={data}
        dropdownPosition={'top'}
        showsVerticalScrollIndicator={false}
        maxHeight={300}
        containerStyle={{borderRadius: 15, padding: 10}}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Shelf' : '...'}
        placeholderStyle={{color: colors.main, fontSize: 16}}
        selectedTextStyle={{color: colors.main, fontSize: 16}}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
}
