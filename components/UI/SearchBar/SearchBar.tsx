import * as React from 'react';
import {Button, Keyboard, StyleSheet, TextInput, View} from 'react-native';
import {useState} from "react";

interface SearchBarProps {
    searchValue: string | undefined,
    setSearchValue: any,
    setSearchActive: any,
}

export default function SearchBar({ searchValue, setSearchValue, setSearchActive }: SearchBarProps) {
    const [clicked, setClicked] = useState<boolean>()
    return (
        <View style={styles.container}>
            <View style={!clicked ? styles.searchBar_unclicked : styles.searchBar_clicked}>
                <TextInput
                    style={styles.input}
                    onChangeText={setSearchValue}
                    value={searchValue}
                    placeholder="Search..."
                    onFocus={() => {
                        setClicked(true);
                    }}
                />
            </View>
            {
                clicked && (
                <View>
                <Button
                    title="Cancel"
                    onPress={() => {
                        Keyboard.dismiss();
                        setClicked(false);
                        setSearchActive(false)
                    }}
                />
            </View>)
            }
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
      },
      searchBar_unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
      },
      searchBar_clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
      },
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
      },
});
