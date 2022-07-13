import React, {useLayoutEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {EditProductScreenProps, useAppNavigation} from "../../navigation/types";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../UI/CustomHeaderButton";

type EditProductPropsType = {

}

export const EditProduct = ({route}: EditProductScreenProps) => {
    const productID = route.params?.productID
    const editedProducts = useAppSelector(state => state.productsReducer.userProducts.find((product) => product.id === productID))

    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerTitle: productID ? "Edit Product" : "Add Product",
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title={"Save"} iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
                              onPress={() => {
                              }}/>
                        {/*onPress={submit}/>*/}
                    </HeaderButtons>
                )
            });
        // }, [navigation, dispatch, productID, title, description, imageUrl, isTitleValid, price]);
    }, [navigation, dispatch, productID]);


 return (
       <View style={styles.container}>

        </View>
    );
};

const styles = StyleSheet.create({
  container: {

  }
});
