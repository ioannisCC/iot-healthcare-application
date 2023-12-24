import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
const SchizophreniaMedicationScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.categoryHeaderText}>
            Schizophrenia Medication Suggestion
          </Text>
          <View style={styles.category}>
            <Text style={styles.categoryText}>Prodromal Phase</Text>
            <Text>
              Medication: Usually, no antipsychotic medications are prescribed
              in this phase. Instead, treatment may focus on relieving specific
              symptoms. Psychosocial Interventions: Counseling, psychoeducation,
              and support for the individual and family. Monitoring: Regular
              monitoring by healthcare professionals to detect any progression
              of symptoms.
            </Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>Active Phase</Text>
            <Text>
              Medication: Antipsychotic medications are the cornerstone of
              treatment. Examples include risperidone, olanzapine, quetiapine,
              and clozapine. Psychosocial Treatments: Cognitive-behavioral
              therapy (CBT), supportive therapy, and rehabilitation programs.
              Hospitalization: May be necessary in severe cases for the safety
              of the patient and others.
            </Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>Residual Phase</Text>
            <Text>
              Medication: Continuation of antipsychotic medications, often at
              lower doses. Ongoing Psychosocial Support: Rehabilitation,
              psychotherapy, and community support to help maintain daily
              functioning. Family Therapy: To provide support and education to
              family members.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
    padding: 10,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#262626",
  },
  headerText: {
    color: "green",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 10,
  },
  searchInput: {
    height: 40,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  categoryHeaderText: {
    color: "white",
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  category: {
    // alignItems: "flex-start",
    // flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryText: {
    paddingBottom: 5,
    marginLeft: 10,
    fontSize: 18,
    color: "white", // White color for the text
  },
  betweenCategories: {
    marginBottom: 150,
  },
});

export default SchizophreniaMedicationScreen;
