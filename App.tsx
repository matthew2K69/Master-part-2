import{StatusBar} from 'expo-status-bar';
import {FlatList,Text,View,TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { SafeAreaView,TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

interface MenuDetails {
  dishName:string;
  description:string;
  dishType:string;
  price:number;
}

export default function App() {
  const [menudetails, setMenuDetails] = useState<MenuDetails[]>([]);
  const [dishName, setDishName] = useState<string>('')
  const [description,setDescription]= useState<string>('')
  const [dishType,setDishType]= useState<string>('')
  const [price,setPrice]= useState<string>('')
  const dishTypes = ['Appertiesers','Beverages','Desserts','Main Courses'];

  const handleSubmit = () => {
    if (dishName && description && dishType && price) {
      const newMenuDetails : MenuDetails = {
        dishName,
        description,
        dishType,
        price:parseInt(price),
      };

      setMenuDetails([...menudetails,newMenuDetails]);
      setDishName('')
      setDescription('')
      setDishType('')
      setPrice('')
    }
  };

  const handleRemoveItem = (index:number) => {
    setMenuDetails(menuDetails.filter((item,i) => i !==index));
  };


   const totalMenuItems = menuDetails.length;

   return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.headingContainer}>
            <Text style={styles.trackerName}>Chefs Kiss</Text>
        </View>
    
    <View style={styles.container}>
        <TextInput
        style={StyleSheet.input}
        placeholder="Dish Name"
     value={dishName}
     onChangeText={setDishName}
     />
     <TextInput
     style={StyleSheet.input}
     placeholder="Price"
     value={price}
     keyboardType="numeric"
     onChangeText={setPrice}
     />

     <Picker
     selectedValue={dishType}
     onValueChange={(itemValue:string)=> setDishType(itemValue)}
     style={StyleSheet.input}
     >
        {dishTypes.map((type) =>(
            <Picker.Item label={type} value={type} key={type} />
        ))}
     </Picker>

     <TextInput
     style= {StyleSheet.input}
     placeholder="Description"
     value={description}
     onChangeText={setDescription}
     />

     <TouchableOpacity style={StyleSheet.button} onPress={handleSubmit}>
      <Text style={StyleSheet.buttonText}>Add Item</Text>
     </TouchableOpacity>
     </View>

     <FlatList
     data = {menuDetails}
     keyExtractor={( item, index) => index.toString()}
     renderItem={({item,index}) => (
      <View style={StyleSheet.itemContainer}>
        <Text style={StyleSheet.itemText}>
          {item.dishName} - {item.description} - {item.dishType} - {item.price}
        </Text>
        <TouchableOpacity
        style={StyleSheet.removeItemButton}
        onPress={() => handleRemoveItem(index)}
        >
          <Text style={StyleSheet.removeItemText}>Remove</Text>
        </TouchableOpacity>
      </View>
      
     )}
     />

     <Text style={StyleSheet.totalMenuItems}>Total Menu Items:{totalMenuItems}</Text>
     </SafeAreaView> 
   );


}

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#ff6a6a'
    padding:20,
  },

  headingContainer:{
    marginBottom:20,
    alignItem:'center'
  },

  trackerName: {
    fontSize :24,
    fontWeight:'bold'
    color:'#e4e7f3'
  },

  input:{
    borderWidth:1,
    borderColor: '#000000',
    padding :10,
    borderRadius:5,
  },

  picker:{
    marginBottom:10,
  },

  button:{
    backgroundColor: '#04c4e8',
    padding: 10,
    borderRadius:5,
    alignItems:'center',
  },

  buttonText:{
    color:'white',
    fontWeight:'bold',
  },

  itemContainer: {
    padding:10,
    borderWidth:1,
    borderColor:'#000000',
  },

  itemText:{
    fontSize:16,
    color:'#f2efef',
  },

  removeItemButton: {
    backgroundColor:'#04c4e8',
    padding:5,
    alignItems: 'center',
  },

  removeItemText:{
    color:'white',
  }
}),