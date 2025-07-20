import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

// Define a type for project entry
interface ProjectEntry {
  title: string;
  description: string;
  technologies: string[];
  category: "web" | "data" | "mobile" | "desktop";
  status: "completed" | "in-progress" | "planned";
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const projects: ProjectEntry[] = [
  {
    title: "Django Employee Database",
    description:
      "Developed a Django-based Employee Management System to streamline and manage employee data within an organization, improving efficiency and data accessibility.",
    technologies: ["Django", "Python", "HTML/CSS"],
    category: "web",
    status: "completed",
    githubUrl: "https://github.com/username/django-employee-db",
    featured: true,
  },
  {
    title: "Blinkit Sales Analysis Power BI Dashboard",
    description:
      "Developed a Power BI dashboard to analyze sales data for Blinkit, enhancing decision-making by providing insightful visualizations and reports.",
    technologies: ["Power BI", "DAX", "Data Analysis", "SQL"],
    category: "data",
    status: "completed",
    featured: true,
  },
  {
    title: "Portfolio Website",
    description:
      "Developed a responsive portfolio website with HTML, CSS, and JavaScript, featuring smooth navigation, interactive project sections, and seamless performance across devices.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    category: "web",
    status: "completed",
    liveUrl: "https://sujalkamanna.interns-es2.in/",
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "web":
      return { name: "language" as const, color: "#3B82F6" };
    case "data":
      return { name: "analytics" as const, color: "#10B981" };
    case "mobile":
      return { name: "phone-android" as const, color: "#8B5CF6" };
    case "desktop":
      return { name: "computer" as const, color: "#F59E0B" };
    default:
      return { name: "code" as const, color: "#6B7280" };
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "#10B981";
    case "in-progress":
      return "#F59E0B";
    case "planned":
      return "#6B7280";
    default:
      return "#6B7280";
  }
};

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const completedProjects = projects.filter((p) => p.status === "completed");

  return (
    <View style={styles.container}>
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="folder-special" size={22} color="#6366F1" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Featured Projects</Text>
            <Text style={styles.subtitle}>
              Portfolio & Technical Achievements
            </Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{projects.length} Projects</Text>
        </View>
      </View>

      {/* Decorative Accent */}
      <View style={styles.accentLine} />

      {/* Projects Grid */}
      <View style={styles.projectsContainer}>
        {projects.map((project, index) => {
          const categoryIcon = getCategoryIcon(project.category);
          const isExpanded = expandedIndex === index;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.projectCard,
                isExpanded && styles.projectCardExpanded,
                project.featured && styles.featuredCard,
              ]}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.7}
            >
              {/* Featured Badge */}
              {project.featured && (
                <View style={styles.featuredBadge}>
                  <MaterialIcons name="star" size={12} color="#FFD700" />
                  <Text style={styles.featuredText}>Featured</Text>
                </View>
              )}

              {/* Project Header */}
              <View style={styles.projectHeader}>
                <View style={styles.projectTitleSection}>
                  <View
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: `${categoryIcon.color}20` },
                    ]}
                  >
                    <MaterialIcons
                      name={categoryIcon.name}
                      size={18}
                      color={categoryIcon.color}
                    />
                  </View>
                  <View style={styles.titleInfo}>
                    <Text
                      style={styles.projectTitle}
                      numberOfLines={isExpanded ? 0 : 2}
                    >
                      {project.title}
                    </Text>
                    <View style={styles.projectMeta}>
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor: `${getStatusColor(
                              project.status
                            )}20`,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            { color: getStatusColor(project.status) },
                          ]}
                        >
                          {project.status.replace("-", " ").toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.categoryText}>
                        {project.category.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>

                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B7280"
                />
              </View>

              {/* Project Description */}
              <Text
                style={styles.projectDescription}
                numberOfLines={isExpanded ? 0 : 3}
              >
                {project.description}
              </Text>

              {/* Technologies */}
              <View style={styles.technologiesSection}>
                <Text style={styles.techLabel}>Technologies:</Text>
                <View style={styles.techContainer}>
                  {project.technologies
                    .slice(0, isExpanded ? project.technologies.length : 3)
                    .map((tech, techIndex) => (
                      <View key={techIndex} style={styles.techTag}>
                        <Text style={styles.techText}>{tech}</Text>
                      </View>
                    ))}
                  {!isExpanded && project.technologies.length > 3 && (
                    <View style={styles.moreTechTag}>
                      <Text style={styles.moreTechText}>
                        +{project.technologies.length - 3}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Expanded Content - Action Buttons */}
              {isExpanded && (
                <View style={styles.expandedContent}>
                  <View style={styles.actionButtons}>
                    {project.githubUrl && (
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => openLink(project.githubUrl!)}
                      >
                        <MaterialIcons name="code" size={16} color="#6366F1" />
                        <Text style={styles.actionButtonText}>View Code</Text>
                      </TouchableOpacity>
                    )}
                    {project.liveUrl && (
                      <TouchableOpacity
                        style={[styles.actionButton, styles.primaryButton]}
                        onPress={() => openLink(project.liveUrl!)}
                      >
                        <MaterialIcons name="launch" size={16} color="white" />
                        <Text
                          style={[
                            styles.actionButtonText,
                            styles.primaryButtonText,
                          ]}
                        >
                          Live Demo
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Project Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialIcons name="check-circle" size={20} color="#10B981" />
          <Text style={styles.statLabel}>Completed</Text>
          <Text style={styles.statValue}>{completedProjects.length}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <MaterialIcons name="star" size={20} color="#FFD700" />
          <Text style={styles.statLabel}>Featured</Text>
          <Text style={styles.statValue}>{featuredProjects.length}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <MaterialIcons name="code" size={20} color="#6366F1" />
          <Text style={styles.statLabel}>Technologies</Text>
          <Text style={styles.statValue}>
            {new Set(projects.flatMap((p) => p.technologies)).size}
          </Text>
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
  projectsContainer: {
    marginBottom: 24,
  },
  projectCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    position: "relative",
  },
  projectCardExpanded: {
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
  featuredCard: {
    borderColor: "#FFD700",
    borderWidth: 2,
  },
  featuredBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEB",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  featuredText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#92400E",
    marginLeft: 4,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  projectTitleSection: {
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  titleInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 6,
    fontFamily: Platform.OS === "ios" ? "SF Pro Text" : "Roboto",
  },
  projectMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#6B7280",
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
    marginBottom: 16,
    textAlign: "left",
  },
  technologiesSection: {
    marginBottom: 12,
  },
  techLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  techContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  techTag: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  techText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#6366F1",
  },
  moreTechTag: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  moreTechText: {
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
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flex: 1,
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6366F1",
    marginLeft: 6,
  },
  primaryButtonText: {
    color: "white",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
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
});
