import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#2a7fc7",
    paddingHorizontal: 16,
    paddingTop: 12,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    marginTop: 30
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
  bellWrapper: {
    position: "relative",
    width: 44,
    height: 44,
    backgroundColor: "#c47d2e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  bellIcon: {
    fontSize: 22,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#e53e3e",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
  },
 
  
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 25,
    paddingHorizontal: 14,
    marginBottom: 16,
    height: 46,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  searchIcon: {
    fontSize: 18,
    opacity: 0.8,
  },
 
  
  cityCard: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 0,
    overflow: "hidden",
  },
  cityLabel: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  checkBox: {
    width: 52,
    height: "100%",
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 0,
  },
  checkBoxSelected: {
    backgroundColor: "#2ecc71",
  },
  checkMark: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
})