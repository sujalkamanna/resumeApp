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

// Simplified skill interface without levels and years
interface Skill {
  name: string;
  certified?: boolean;
}

interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: "code",
    color: "#3B82F6",
    skills: [
      { name: "Python", certified: true },
      { name: "Java (Core)" },
      { name: "C/C++", certified: true },
      { name: "SQL" },
      { name: "HTML/CSS" },
      { name: "Django" },
      { name: "OOP" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    icon: "layers",
    color: "#10B981",
    skills: [
      { name: "Django" },
      { name: "HTML/CSS" },
      { name: "Bootstrap" },
      { name: "Pandas", certified: true },
      { name: "NumPy", certified: true },
      { name: "Streamlit" },
    ],
  },
  {
    category: "Tools",
    icon: "build",
    color: "#8B5CF6",
    skills: [
      { name: "MS-Office" },
      { name: "VS Code" },
      { name: "Eclipse" },
      { name: "Pycharm" },
      { name: "Git", certified: true },
      { name: "GitHub", certified: true },
      { name: "Bootstrap" },
      { name: "PIP" },
      { name: "CMD" },
      { name: "Linux" },
      { name: "Windows" },
      { name: "SDLC" },
      { name: "Agile" },
      { name: "Versioning" },
      { name: "Version Controlling" },
      { name: "Excel", certified: true },
      { name: "Power Query" },
      { name: "Power Pivot" },
      { name: "Power BI", certified: true },
    ],
  },
  {
    category: "Soft Skills",
    icon: "people",
    color: "#EF4444",
    skills: [
      { name: "Professionalism" },
      { name: "Problem Solving" },
      { name: "Communication", certified: true },
      { name: "Presentation", certified: true },
      { name: "Team Collaboration" },
      { name: "Adaptability" },
      { name: "Time Management" },
      { name: "Social Media Management" },
      { name: "Project Management" },
      { name: "Tech Support" },
      { name: "IT Support" },
      { name: "Consulting" },
      { name: "Data Analysis", certified: true },
      { name: "Dashboard Creation" },
      { name: "Management" },
      { name: "Talent Acquisition" },
      { name: "Technical Recruitment" },
      { name: "Data Entry" },
      { name: "Data Management" },
      { name: "Customer Service", certified: true },
      { name: "Client Support" },
      { name: "Document Preparation" },
      { name: "Editing" },
      { name: "Presentations" },
    ],
  },
  {
    category: "Languages",
    icon: "language",
    color: "#06B6D4",
    skills: [
      { name: "English (Fluent)" },
      { name: "Hindi (Fluent)" },
      { name: "Marathi (Fluent)" },
      { name: "Kannada (Fluent)" },
      { name: "German (Basic)" },
    ],
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview");

  const totalSkills = skillCategories.reduce(
    (sum, cat) => sum + cat.skills.length,
    0
  );
  const certifiedSkills = skillCategories.reduce(
    (sum, cat) => sum + cat.skills.filter((skill) => skill.certified).length,
    0
  );
  const totalCategories = skillCategories.length;

  return (
    <View style={styles.container}>
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="psychology" size={22} color="#6366F1" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Technical Skills</Text>
            <Text style={styles.subtitle}>
              Expertise & Proficiency Overview
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewToggle}
          onPress={() =>
            setViewMode(viewMode === "overview" ? "detailed" : "overview")
          }
        >
          <MaterialIcons
            name={viewMode === "overview" ? "view-list" : "view-module"}
            size={18}
            color="#6366F1"
          />
          <Text style={styles.viewToggleText}>
            {viewMode === "overview" ? "Detailed" : "Overview"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Decorative Accent */}
      <View style={styles.accentLine} />

      {/* Skills Overview Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialIcons name="code" size={20} color="#3B82F6" />
          <Text style={styles.statLabel}>Total Skills</Text>
          <Text style={styles.statValue}>{totalSkills}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <MaterialIcons name="verified" size={20} color="#10B981" />
          <Text style={styles.statLabel}>Certified</Text>
          <Text style={styles.statValue}>{certifiedSkills}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <MaterialIcons name="category" size={20} color="#EF4444" />
          <Text style={styles.statLabel}>Categories</Text>
          <Text style={styles.statValue}>{totalCategories}</Text>
        </View>
      </View>

      {/* Category Navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryNav}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            selectedCategory === null && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text
            style={[
              styles.categoryChipText,
              selectedCategory === null && styles.categoryChipTextActive,
            ]}
          >
            All Categories
          </Text>
        </TouchableOpacity>
        {skillCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryChip,
              selectedCategory === category.category &&
                styles.categoryChipActive,
              selectedCategory === category.category && {
                backgroundColor: `${category.color}20`,
              },
            ]}
            onPress={() => setSelectedCategory(category.category)}
          >
            <MaterialIcons
              name={category.icon as any}
              size={14}
              color={
                selectedCategory === category.category
                  ? category.color
                  : "#6B7280"
              }
            />
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category.category && {
                  color: category.color,
                },
              ]}
            >
              {category.category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Skills Display */}
      <ScrollView
        style={styles.skillsContainer}
        showsVerticalScrollIndicator={false}
      >
        {skillCategories
          .filter(
            (cat) => !selectedCategory || cat.category === selectedCategory
          )
          .map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.categorySection}>
              {/* Category Header */}
              <View
                style={[
                  styles.categoryHeader,
                  { borderLeftColor: category.color },
                ]}
              >
                <View style={styles.categoryTitleSection}>
                  <View
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: `${category.color}20` },
                    ]}
                  >
                    <MaterialIcons
                      name={category.icon as any}
                      size={20}
                      color={category.color}
                    />
                  </View>
                  <View>
                    <Text style={styles.categoryTitle}>
                      {category.category}
                    </Text>
                    <Text style={styles.categorySubtitle}>
                      {category.skills.length} skills
                    </Text>
                  </View>
                </View>
                <View style={styles.categoryStats}>
                  <Text style={styles.categoryStatsText}>
                    {category.skills.filter((s) => s.certified).length}{" "}
                    certified
                  </Text>
                </View>
              </View>

              {/* Skills Grid/List */}
              <View
                style={
                  viewMode === "overview"
                    ? styles.skillsGrid
                    : styles.skillsList
                }
              >
                {category.skills.map((skill, skillIndex) => (
                  <View
                    key={skillIndex}
                    style={
                      viewMode === "overview"
                        ? styles.skillChip
                        : styles.skillCard
                    }
                  >
                    {viewMode === "overview" ? (
                      // Overview Mode - Compact Chips
                      <>
                        <Text style={styles.skillName}>{skill.name}</Text>
                        {skill.certified && (
                          <MaterialIcons
                            name="verified"
                            size={12}
                            color="#10B981"
                          />
                        )}
                      </>
                    ) : (
                      // Detailed Mode - Full Cards
                      <>
                        <View style={styles.skillCardHeader}>
                          <Text style={styles.skillCardName}>{skill.name}</Text>
                          {skill.certified && (
                            <View style={styles.certifiedBadge}>
                              <MaterialIcons
                                name="verified"
                                size={12}
                                color="#10B981"
                              />
                              <Text style={styles.certifiedText}>
                                Certified
                              </Text>
                            </View>
                          )}
                        </View>
                      </>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
      </ScrollView>
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
  viewToggle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  viewToggleText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6366F1",
    marginLeft: 6,
  },
  accentLine: {
    height: 4,
    width: 80,
    backgroundColor: "#6366F1",
    borderRadius: 4,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 11,
    color: "#64748B",
    marginBottom: 4,
    marginTop: 6,
    textAlign: "center",
    fontWeight: "500",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 12,
  },
  categoryNav: {
    marginBottom: 20,
  },
  categoryChip: {
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
  categoryChipActive: {
    backgroundColor: "#EEF2FF",
    borderColor: "#C7D2FE",
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    marginLeft: 4,
  },
  categoryChipTextActive: {
    color: "#6366F1",
    fontWeight: "600",
  },
  skillsContainer: {
    maxHeight: 500,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  categoryTitleSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  categorySubtitle: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  categoryStats: {
    alignItems: "flex-end",
  },
  categoryStatsText: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillsList: {
    flexDirection: "column",
    gap: 8,
  },
  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginRight: 8,
    marginBottom: 8,
  },
  skillName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    marginRight: 6,
  },
  skillCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  skillCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skillCardName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  certifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  certifiedText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#10B981",
    marginLeft: 4,
  },
});
