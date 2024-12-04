import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Instructions = () => {
  return (
    <View style={styles.instructionsContainer}>
      <Text style={styles.instructionsTitle}>How to Play</Text>
      <Text style={styles.instructionsText}>
        1. The game is played on a grid that's 3 squares by 3 squares.
      </Text>
      <Text style={styles.instructionsText}>
        2. Player X and Player O take turns filling the grid.
      </Text>
      <Text style={styles.instructionsText}>
        3. The first player to get 3 of their marks in a row (vertically,
        horizontally, or diagonally) wins the game!
      </Text>
      <Text style={styles.instructionsText}>
        4. If all 9 squares are filled without a winner, the game is a draw.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  instructionsContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#89A8B2",
    shadowColor: "#333",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  instructionsText: {
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
});

export default Instructions;
