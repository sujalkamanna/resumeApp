import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

// Define a type for the experience object
interface Experience {
  title: string;
  location: string;
  company: string;
  duration: string;
  description: string;
  type: "internship" | "fulltime" | "contract";
  skills: string[];
}

const experiences: Experience[] = [
  {
    title: "Web Developer Intern Python-Django",
    location: "Pune, Maharashtra",
    company: "Elite Softwares",
    duration: "Dec 2023 – Jan 2024",
    type: "internship",
    skills: ["Python", "Django", "Web Development", "Performance Optimization"],
    description:
      "Developed Django web apps, optimizing performance and delivering impactful solutions. Collaborated with senior developers to enhance teamwork and launch successful websites.",
  },
  {
    title: "Data Visualization Intern",
    location: "Pune, Maharashtra",
    company: "Infosys",
    duration: "Feb 2025 - Mar 2025",
    type: "internship",
    skills: ["Data Analysis", "Visualization", "AQI", "Springboard"],
    description:
      "Successfully completed a project-based internship at Infosys Springboard on Air Quality Index (AQI) Visualization, involving data analysis, visualization techniques, and interpretation of AQI trends.",
  },
];

// Fixed icon names - using valid MaterialIcons names
const getCompanyIcon = (company: string) => {
  switch (company.toLowerCase()) {
    case "infosys":
      return { name: "business" as const, color: "#0066CC" };
    case "elite softwares":
      return { name: "computer" as const, color: "#7C3AED" };
    default:
      return { name: "work" as const, color: "#6366F1" };
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "internship":
      return "#F59E0B";
    case "fulltime":
      return "#10B981";
    case "contract":
      return "#8B5CF6";
    default:
      return "#6B7280";
  }
};

export default function ProfessionalExperience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="work" size={22} color="#6366F1" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Professional Experience</Text>
            <Text style={styles.subtitle}>Career Journey & Achievements</Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{experiences.length} Positions</Text>
        </View>
      </View>

      {/* Decorative Accent */}
      <View style={styles.accentLine} />

      {/* Experience Timeline */}
      <View style={styles.timeline}>
        {experiences.map((exp, index) => {
          const companyIcon = getCompanyIcon(exp.company);
          const isExpanded = expandedIndex === index;

          return (
            <TouchableOpacity
              key={index}
              style={styles.experienceContainer}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.7}
            >
              {/* Timeline Connector */}
              <View style={styles.timelineConnector}>
                <View
                  style={[
                    styles.timelineNode,
                    { backgroundColor: companyIcon.color },
                  ]}
                >
                  <MaterialIcons
                    name={companyIcon.name}
                    size={16}
                    color="white"
                  />
                </View>
                {index !== experiences.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              {/* Experience Card */}
              <View
                style={[
                  styles.experienceCard,
                  isExpanded && styles.experienceCardExpanded,
                ]}
              >
                {/* Header Section */}
                <View style={styles.cardHeader}>
                  <View style={styles.titleSection}>
                    <Text
                      style={styles.jobTitle}
                      numberOfLines={isExpanded ? 0 : 2}
                    >
                      {exp.title}
                    </Text>
                    <View style={styles.companyInfo}>
                      <MaterialIcons
                        name="business"
                        size={14}
                        color="#6B7280"
                      />
                      <Text style={styles.company}>{exp.company}</Text>
                      <View
                        style={[
                          styles.typeBadge,
                          { backgroundColor: `${getTypeColor(exp.type)}20` },
                        ]}
                      >
                        <Text
                          style={[
                            styles.typeText,
                            { color: getTypeColor(exp.type) },
                          ]}
                        >
                          {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.metaInfo}>
                    <View style={styles.locationContainer}>
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color="#6B7280"
                      />
                      <Text style={styles.location}>{exp.location}</Text>
                    </View>
                    <Text style={styles.duration}>{exp.duration}</Text>
                    <Ionicons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#6B7280"
                    />
                  </View>
                </View>

                {/* Description */}
                <Text
                  style={styles.description}
                  numberOfLines={isExpanded ? 0 : 3}
                >
                  {exp.description}
                </Text>

                {/* Skills Section */}
                <View style={styles.skillsSection}>
                  <Text style={styles.skillsLabel}>Key Skills:</Text>
                  <View style={styles.skillsContainer}>
                    {exp.skills
                      .slice(0, isExpanded ? exp.skills.length : 3)
                      .map((skill, skillIndex) => (
                        <View key={skillIndex} style={styles.skillTag}>
                          <Text style={styles.skillText}>{skill}</Text>
                        </View>
                      ))}
                    {!isExpanded && exp.skills.length > 3 && (
                      <View style={styles.moreSkillsTag}>
                        <Text style={styles.moreSkillsText}>
                          +{exp.skills.length - 3}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Expanded Content */}
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    <View style={styles.achievementContainer}>
                      <MaterialIcons name="star" size={16} color="#F59E0B" />
                      <Text style={styles.achievementText}>
                        {exp.type === "internship"
                          ? "Successfully completed internship with positive feedback"
                          : "Delivered exceptional results and exceeded expectations"}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Career Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <MaterialIcons name="schedule" size={20} color="#6366F1" />
          <Text style={styles.summaryLabel}>Total Experience</Text>
          <Text style={styles.summaryValue}>2+ Months</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <MaterialIcons name="trending-up" size={20} color="#10B981" />
          <Text style={styles.summaryLabel}>Career Growth</Text>
          <Text style={styles.summaryValue}>Rapid Learning</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <MaterialIcons name="verified" size={20} color="#F59E0B" />
          <Text style={styles.summaryLabel}>Specialization</Text>
          <Text style={styles.summaryValue}>Python & Data</Text>
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
  timeline: {
    marginBottom: 24,
  },
  experienceContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timelineConnector: {
    alignItems: "center",
    marginRight: 16,
    width: 32,
  },
  timelineNode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E5E7EB",
    minHeight: 60,
  },
  experienceCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  experienceCardExpanded: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    marginBottom: 12,
  },
  titleSection: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 6,
    fontFamily: Platform.OS === "ios" ? "SF Pro Text" : "Roboto",
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  company: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginLeft: 6,
    marginRight: 8,
  },
  typeBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  location: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 4,
  },
  duration: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
    marginBottom: 16,
    textAlign: "left",
  },
  skillsSection: {
    marginBottom: 12,
  },
  skillsLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillTag: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  skillText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#6366F1",
  },
  moreSkillsTag: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  moreSkillsText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#6B7280",
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  achievementContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEB",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  achievementText: {
    fontSize: 13,
    color: "#92400E",
    marginLeft: 8,
    flex: 1,
    fontStyle: "italic",
  },
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 11,
    color: "#64748B",
    marginBottom: 4,
    marginTop: 6,
    textAlign: "center",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    textAlign: "center",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 12,
  },
});
