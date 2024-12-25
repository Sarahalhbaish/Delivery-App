import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function RestaurantScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Restaurant Header */}
      <View style={styles.restaurantHeader}>
        <Image
          source={{ uri: restaurant.image }}
          style={styles.restaurantImage}
          resizeMode="cover"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.restaurantDetails}>
            <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
            <Text style={styles.deliveryTime}>
              🕒 {restaurant.deliveryTime}
            </Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Menu</Text>
        {restaurant.menuItems.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.menuItemImage}
              resizeMode="cover"
            />
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    addToCart(item);
                    navigation.navigate("CartScreen", {
                      cartItems: [...cartItems, item],
                    });
                  }}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  restaurantHeader: {
    padding: 15,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  headerInfo: {
    marginTop: 15,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  restaurantDetails: {
    flexDirection: "row",
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    marginRight: 15,
    color: "#666",
  },
  deliveryTime: {
    fontSize: 16,
    color: "#666",
  },
  menuSection: {
    padding: 15,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  menuItem: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 12,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  menuItemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
