import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import restaurantCategories from "../Datas/restaurantCategories";
import restaurants from "../Datas/restaurants";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

export default function HomePage({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const filteredRestaurants = selectedCategory
    ? restaurants.filter(
        (restaurant) => restaurant.category === selectedCategory
      )
    : restaurants;

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/Logo.webp")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerText}>
            <Text style={styles.title}>FreshGo</Text>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate("CartScreen", { cartItems })}
          >
            <Ionicons name="cart-outline" size={24} color="#6B3CE9" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartItems.reduce(
                  (total, item) => total + (item?.quantity || 0),
                  0
                )}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.sectionTitle}>
          {selectedCategory
            ? `${selectedCategory} Restaurants`
            : "All Restaurants"}
        </Text>
        {filteredRestaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.restaurantCard}
            onPress={() => {
              navigation.navigate("RestaurantScreen", {
                restaurant,
                cartItems,
                addToCart: addToCart,
                setCartItems: setCartItems,
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F6FF",
    padding: 20,
  },
  welcomeSection: {
    marginTop: 40,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 30,
    shadowColor: "#6B3CE9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#6B3CE9",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#8A63EC",
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoryCard: {
    marginRight: 15,
    alignItems: "center",
    width: 100,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    shadowColor: "#6B3CE9",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#F0EEFF",
  },
  categoryName: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#6B3CE9",
    textAlign: "center",
  },
  restaurantsSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#6B3CE9",
    marginBottom: 15,
  },
  restaurantCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    padding: 12,
    shadowColor: "#6B3CE9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#F0EEFF",
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#4A2B9E",
    marginBottom: 6,
  },
  restaurantDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#8A63EC",
    marginRight: 12,
  },
  deliveryTime: {
    fontSize: 14,
    color: "#8A63EC",
  },
  cartButton: {
    padding: 8,
    position: "relative",
    backgroundColor: "#F0EEFF",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#FF4B4B",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  selectedCategoryCard: {
    backgroundColor: "#6B3CE9",
    borderColor: "#6B3CE9",
  },
  selectedCategoryName: {
    color: "#fff",
  },
});
