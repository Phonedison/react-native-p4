import { StyleSheet } from "react-native";

const whiteColor: string = "#fff";

const cardBorderColor: string = "rgba(217, 217, 217, 0.55)";
const backgroundColor: string = "rgb(5, 102, 141)";

const cardAlertBackgroundColor: string = "rgba(204, 88, 3,0.8)";
const cardBackgroundColor: string = "rgba(217, 217, 217, 0.13)";

export const styles = StyleSheet.create({
  header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginBottom: 16,
},
   backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backArrow: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "300",
  },
  backText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: backgroundColor,
    gap: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },

  notification: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },

  iconeContainer: {
    padding: 16,
    backgroundColor: cardAlertBackgroundColor,
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "flex-end",
  },

  
  card: {
    backgroundColor: cardBackgroundColor,
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    borderColor: cardBorderColor,
    borderRadius: 16,
    borderWidth: 1,
  },

  cardPrincipal: {
    maxHeight: 300,
    padding: 16,
    justifyContent: "center",
  },

  cardsFavoritos: {
    maxHeight: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },

 

  text: { letterSpacing: 0.3, textAlign: "center", color: whiteColor },

  local: { fontWeight: "600", fontSize: 16 },
  description: { opacity: 0.9, fontWeight: "200", fontSize: 13 },
  temperature: { fontWeight: "900", fontSize: 90 },
  subInfoText: { fontWeight: "600", fontSize: 16 },
  observation: { fontWeight: "400", fontSize: 13 },

  
  iconTemperature: { width: 80, height: 80 },
  iconSubInfo: { width: 30, height: 30 },

  
  containerCard: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },

  infoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.34)",
    
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  emptyText: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: 24,
    fontSize: 14,
  },
  
    checkWrapper: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkWrapperSelected: {
    backgroundColor: "#2ecc71",
  },
  checkIcon: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
 
  resultItem: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "rgba(255,255,255,0.15)",
  borderRadius: 14,
  paddingVertical: 12,
  paddingHorizontal: 16,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.2)",
  minHeight: 56,
  alignSelf: "stretch", 
},
  resultItemSelected: {
    backgroundColor: "rgba(255,255,255,0.22)",
    borderColor: "rgba(255,255,255,0.45)",
  },
  resultTextWrapper: {
    flex: 1,
  },
  resultName: {
  color: "#ffffff",
  fontSize: 15,
  fontWeight: "600",
},
resultSub: {
  color: "rgba(255,255,255,0.75)",
  fontSize: 12,
  marginTop: 2,
},


});
