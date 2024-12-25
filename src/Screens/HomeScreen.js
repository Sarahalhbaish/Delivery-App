import { View, Image, StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity } from 'react-native';
import restaurantCategories from '../Datas/restaurantCategories';
import { useState } from 'react';
import restaurantData from '../Datas/restaurants';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require("../../assets/Logo.webp")} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brandName}>FreshGo</Text>
      </View>


      
       <ScrollView
       horizontal
       showsHorizontalScrollIndicator={false}
       style={styles.categoriesContainer}
     >
       {restaurantCategories.map((category) => (
         <TouchableOpacity
           key={category.id}
           style={[
             styles.categoryCard,
             selectedCategory === category.categoryName &&
               styles.selectedCategoryCard,
           ]}
           onPress={() => {
             setSelectedCategory(
               selectedCategory === category.categoryName
                 ? null
                 : category.categoryName
             );
           }}
         >
           <Image
             source={{ uri: category.categoryImage }}
             style={styles.categoryImage}
             resizeMode="cover"
           />
           <Text
             style={[
               styles.categoryName,
               selectedCategory === category.categoryName &&
                 styles.selectedCategoryName,
             ]}
           >
             {category.categoryName}
           </Text>
         </TouchableOpacity>
       ))}      
     </ScrollView>
     
      <View style={styles.restaurantsSection}>
        {restaurantData.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.restaurantCard}
            onPress={() => {
              navigation.navigate('RestaurantScreen', {
                restaurant,
              });
            }}
          >
            <Image
              source={{ uri: restaurant.image }}
              style={styles.restaurantImage}
              resizeMode="cover"
            />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <View style={styles.restaurantDetails}>
                <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
                <Text style={styles.deliveryTime}>
                  🕒 {restaurant.deliveryTime}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android shadow
  },
  brandName: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 12,
    color: '#2c3e50',
    letterSpacing: 0.5,
  },
  testText: {
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingVertical: 15,
    paddingLeft: 15,
  },
  categoryCard: {
    marginRight: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  selectedCategoryCard: {
    backgroundColor: '#FF4B3A',
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedCategoryName: {
    color: '#FFFFFF',
  },
  restaurantsSection: {
    padding: 15,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
  },
});
