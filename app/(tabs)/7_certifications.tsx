import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

// Enhanced certification interface
interface CertificationEntry {
  name: string;
  provider: string;
  category: "technical" | "soft-skills" | "analytics" | "management";
  level: "beginner" | "intermediate" | "advanced";
  year?: string;
  verified?: boolean;
  credentialId?: string;
}

const certifications: CertificationEntry[] = [
  {
    name: "Introduction to Machine Learning",
    provider: "NPTEL",
    category: "technical",
    level: "intermediate",
    year: "2024",
    verified: true,
    credentialId: "NPTEL-ML-2024",
  },
  {
    name: "Python for Data Science",
    provider: "NPTEL",
    category: "technical",
    level: "intermediate",
    year: "2024",
    verified: true,
    credentialId: "NPTEL-PY-2024",
  },
  {
    name: "Data Analytics Using Power BI",
    provider: "TechA",
    category: "analytics",
    level: "advanced",
    year: "2024",
    verified: true,
  },
  {
    name: "C/C++ Programming",
    provider: "Programming Institute",
    category: "technical",
    level: "intermediate",
    year: "2023",
    verified: true,
  },
  {
    name: "Git and Github Bootcamp",
    provider: "Development Academy",
    category: "technical",
    level: "beginner",
    year: "2023",
    verified: true,
  },
  {
    name: "Human Resource Management - HR Metrics",
    provider: "HR Institute",
    category: "management",
    level: "intermediate",
    year: "2024",
    verified: true,
  },
  {
    name: "Business Analyst and Project Manager Collaboration",
    provider: "Business Academy",
    category: "management",
    level: "advanced",
    year: "2024",
    verified: true,
  },
  {
    name: "Introduction to Soft Skills",
    provider: "TCS Ion",
    category: "soft-skills",
    level: "beginner",
    year: "2023",
    verified: true,
  },
  {
    name: "Basics of Customer Services",
    provider: "TCS Ion",
    category: "soft-skills",
    level: "beginner",
    year: "2023",
    verified: true,
  },
  {
    name: "Microsoft Excel and Advanced Excel",
    provider: "Microsoft",
    category: "analytics",
    level: "advanced",
    year: "2023",
    verified: true,
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "technical":
      return { name: "code" as const, color: "#3B82F6" };
    case "analytics":
      return { name: "analytics" as const, color: "#10B981" };
    case "management":
      return { name: "business" as const, color: "#8B5CF6" };
    case "soft-skills":
      return { name: "people" as const, color: "#F59E0B" };
    default:
      return { name: "school" as const, color: "#6B7280" };
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "beginner":
      return "#10B981";
    case "intermediate":
      return "#F59E0B";
    case "advanced":
      return "#EF4444";
    default:
      return "#6B7280";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "technical":
      return "#3B82F6";
    case "analytics":
      return "#10B981";
    case "management":
      return "#8B5CF6";
    case "soft-skills":
      return "#F59E0B";
    default:
      return "#6B7280";
  }
};

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["technical", "analytics", "management", "soft-skills"];
  const filteredCertifications = selectedCategory
    ? certifications.filter((cert) => cert.category === selectedCategory)
    : certifications;

  const categoryStats = categories.map((category) => ({
    name: category,
    count: certifications.filter((cert) => cert.category === category).length,
    color: getCategoryColor(category),
  }));

  return (
    <View style={styles.container}>
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="verified" size={22} color="#6366F1" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Professional Certifications</Text>
            <Text style={styles.subtitle}>
              Skills Validation & Continuous Learning
            </Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {certifications.length} Certificates
          </Text>
        </View>
      </View>

      {/* Decorative Accent */}
      <View style={styles.accentLine} />

      {/* Category Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filter by Category:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedCategory === null && styles.filterChipActive,
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedCategory === null && styles.filterChipTextActive,
              ]}
            >
              All ({certifications.length})
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.filterChipActive,
                selectedCategory === category && {
                  backgroundColor: `${getCategoryColor(category)}20`,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <MaterialIcons
                name={getCategoryIcon(category).name}
                size={14}
                color={
                  selectedCategory === category
                    ? getCategoryColor(category)
                    : "#6B7280"
                }
              />
              <Text
                style={[
                  styles.filterChipText,
                  selectedCategory === category && {
                    color: getCategoryColor(category),
                  },
                ]}
              >
                {category.replace("-", " ")} (
                {certifications.filter((c) => c.category === category).length})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* View Mode Toggle */}
      <View style={styles.viewModeContainer}>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === "grid" && styles.viewModeButtonActive,
          ]}
          onPress={() => setViewMode("grid")}
        >
          <MaterialIcons
            name="grid-view"
            size={16}
            color={viewMode === "grid" ? "#6366F1" : "#6B7280"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewModeButton,
            viewMode === "list" && styles.viewModeButtonActive,
          ]}
          onPress={() => setViewMode("list")}
        >
          <MaterialIcons
            name="view-list"
            size={16}
            color={viewMode === "list" ? "#6366F1" : "#6B7280"}
          />
        </TouchableOpacity>
      </View>

      {/* Certifications Display */}
      <ScrollView
        style={styles.certificationsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={
            viewMode === "grid" ? styles.gridContainer : styles.listContainer
          }
        >
          {filteredCertifications.map((cert, index) => {
            const categoryIcon = getCategoryIcon(cert.category);

            return (
              <View
                key={index}
                style={[
                  viewMode === "grid"
                    ? styles.certificationCardGrid
                    : styles.certificationCardList,
                  { borderLeftColor: getCategoryColor(cert.category) },
                ]}
              >
                {/* Certificate Header */}
                <View style={styles.certHeader}>
                  <View
                    style={[
                      styles.categoryIconContainer,
                      { backgroundColor: `${categoryIcon.color}20` },
                    ]}
                  >
                    <MaterialIcons
                      name={categoryIcon.name}
                      size={16}
                      color={categoryIcon.color}
                    />
                  </View>
                  {cert.verified && (
                    <View style={styles.verifiedBadge}>
                      <MaterialIcons
                        name="verified"
                        size={12}
                        color="#10B981"
                      />
                    </View>
                  )}
                </View>

                {/* Certificate Content */}
                <View style={styles.certContent}>
                  <Text
                    style={styles.certName}
                    numberOfLines={viewMode === "grid" ? 2 : 1}
                  >
                    {cert.name}
                  </Text>
                  <Text style={styles.certProvider}>{cert.provider}</Text>

                  <View style={styles.certMeta}>
                    <View
                      style={[
                        styles.levelBadge,
                        { backgroundColor: `${getLevelColor(cert.level)}20` },
                      ]}
                    >
                      <Text
                        style={[
                          styles.levelText,
                          { color: getLevelColor(cert.level) },
                        ]}
                      >
                        {cert.level.toUpperCase()}
                      </Text>
                    </View>
                    {cert.year && (
                      <Text style={styles.certYear}>{cert.year}</Text>
                    )}
                  </View>

                  {cert.credentialId && (
                    <View style={styles.credentialContainer}>
                      <MaterialIcons
                        name="fingerprint"
                        size={12}
                        color="#6B7280"
                      />
                      <Text style={styles.credentialId}>
                        ID: {cert.credentialId}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Statistics Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statsHeader}>
          <Text style={styles.statsTitle}>Certification Overview</Text>
        </View>
        <View style={styles.statsGrid}>
          {categoryStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: `${stat.color}20` },
                ]}
              >
                <MaterialIcons
                  name={getCategoryIcon(stat.name).name}
                  size={16}
                  color={stat.color}
                />
              </View>
              <Text style={styles.statLabel}>
                {stat.name.replace("-", " ")}
              </Text>
              <Text style={styles.statValue}>{stat.count}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
        shadowColor: "#3F3D56",
      },
    }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    backgroundColor: "#EEF2FF",
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    letterSpacing: 0.25,
    fontFamily: Platform.OS === "ios" ? "SF Pro Display" : "Roboto",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "SF Pro Text" : "Roboto",
  },
  badge: {
    backgroundColor: "#F0F9FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0284C7",
  },
  accentLine: {
    height: 4,
    width: 80,
    backgroundColor: "#6366F1",
    borderRadius: 4,
    marginBottom: 24,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  filterScroll: {
    flexDirection: "row",
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterChipActive: {
    backgroundColor: "#EEF2FF",
    borderColor: "#C7D2FE",
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    marginLeft: 4,
  },
  filterChipTextActive: {
    color: "#6366F1",
    fontWeight: "600",
  },
  viewModeContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginBottom: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 2,
  },
  viewModeButton: {
    padding: 8,
    borderRadius: 6,
  },
  viewModeButtonActive: {
    backgroundColor: "#FFFFFF",
  },
  certificationsContainer: {
    maxHeight: 400,
    marginBottom: 24,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  listContainer: {
    flexDirection: "column",
  },
  certificationCardGrid: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderLeftWidth: 4,
  },
  certificationCardList: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderLeftWidth: 4,
  },
  certHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  verifiedBadge: {
    backgroundColor: "#ECFDF5",
    borderRadius: 10,
    padding: 4,
  },
  certContent: {
    flex: 1,
  },
  certName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "SF Pro Text" : "Roboto",
  },
  certProvider: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
    fontWeight: "500",
  },
  certMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  levelBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 9,
    fontWeight: "700",
  },
  certYear: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  credentialContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  credentialId: {
    fontSize: 10,
    color: "#6B7280",
    marginLeft: 4,
    fontFamily: "monospace",
  },
  statsContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statsHeader: {
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    color: "#64748B",
    marginBottom: 4,
    textAlign: "center",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
    textAlign: "center",
  },
});
