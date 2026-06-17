import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a7fc7",
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    marginTop: 30,
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

  // ── Search bar ───────────────────────────────────────────
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 14,
    marginBottom: 16,
    height: 46,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
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

  // ── Lista de resultados ──────────────────────────────────
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  resultItemSelected: {
    backgroundColor: "rgba(255,255,255,0.22)",
    borderColor: "rgba(255,255,255,0.45)",
  },
  resultTextWrapper: {
    flex: 1,
  },
  resultName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  resultSub: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    marginTop: 2,
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

  // ── Empty state ──────────────────────────────────────────
  emptyText: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: 24,
    fontSize: 14,
  },
});