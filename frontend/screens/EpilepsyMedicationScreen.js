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

const EpilepsyMedicationScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.categoryHeaderText}>
            Epilepsy Medication Suggestion
          </Text>
          <View style={styles.category}>
            <Text style={styles.categoryText}>
              Pre-seizure (Prodrome or Aura)
            </Text>
            <Text>
              Awareness and Preparation: For those who experience auras or
              prodromal symptoms, recognizing these signs can allow them to
              prepare for a potential seizure. This might include moving to a
              safe location or alerting someone. Rescue Medications: Some
              patients may have rescue medications prescribed, such as
              benzodiazepines (e.g., diazepam or lorazepam), which can sometimes
              abort an impending seizure if taken during the aura phase. Regular
              Antiepileptic Drugs (AEDs): Continuous medication adherence is
              crucial to prevent seizures.
            </Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>Ictal Phase</Text>
            <Text>
              Emergency Medication: If a seizure lasts for an extended period
              (usually more than 5 minutes), emergency medication may be needed.
              This is often a form of a benzodiazepine. Safety Measures:
              Ensuring the person's safety during a seizure is crucial. This
              involves moving them away from harmful objects, placing them on
              their side, and not trying to restrain them or put anything in
              their mouth. Medical Attention: Prolonged seizures (status
              epilepticus) require immediate medical attention.
            </Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>Postictal Phase:</Text>
            <Text>
              Rest and Recovery: The postictal phase can involve confusion,
              fatigue, headache, and other symptoms. Rest is important during
              this time. Adjustment of AEDs: Depending on the frequency and
              severity of seizures, a healthcare provider might adjust the
              dosage or type of AEDs. Evaluation and Monitoring: If seizures are
              frequent or severe, further evaluation might be needed to assess
              the effectiveness of the current treatment plan.
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
    color: "white",
  },
  betweenCategories: {
    marginBottom: 150,
  },
});

export default EpilepsyMedicationScreen;
