import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

interface PublicationEntry {
  title: string;
  linkText: string;
  linkUrl: string;
  source: string;
  date: string;
  description: string;
  type: "journal" | "conference" | "preprint" | "book";
  status: "published" | "accepted" | "under-review" | "draft";
  impact?: "high" | "medium" | "low";
  citations?: number;
  doi?: string;
  keywords?: string[];
}
const publications: PublicationEntry[] = [
  {
    title:
      "Decentralized Funding Solutions: A Blockchain Approach to Crowdfunding",
    linkText: "View Paper",
    linkUrl:
      "https://www.irjmets.com/uploadedfiles/paper//issue_1_january_2025/66020/final/fin_irjmets1736786511.pdf",
    source:
      "International Research Journal of Modernization in Engineering Technology and Science",
    date: "January 2025",
    type: "journal",
    status: "published",
    impact: "medium",
    citations: 0,
    doi: " https://www.doi.org/10.56726/IRJMETS79409",
    keywords: [
      "Blockchain",
      "Crowdfunding",
      "Smart Contracts",
      "Decentralization",
    ],
    description:
      "The paper explores how blockchain can address issues in traditional crowdfunding, proposing decentralized platforms and smart contracts to reduce fees, increase transparency, and enhance security and efficiency.",
  },
  {
    title: "CROWDFUNDING USING BLOCKCHAIN TECHNOLOGY: A DECENTRALIZED APPROACH",
    linkText: "View Paper",
    linkUrl:
      "https://www.irjmets.com/upload_newfiles/irjmets70600103632/paper_file/irjmets70600103632.pdf",
    source:
      "International Research Journal of Modernization in Engineering Technology and Science",
    date: "June 2025",
    type: "journal",
    status: "published",
    impact: "high",
    citations: 0,
    doi: "https://www.doi.org/10.56726/IRJMETS66020",
    keywords: ["CrowdFunding", "Fintech", "Block Chain"],
    description:
      "This paper investigates Decentralized crowdfunding system leveraging blockchain and smart contracts to enhance transparency, security, and trust in online fundraising",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "journal":
      return { name: "article" as const, color: "#3B82F6" };
    case "conference":
      return { name: "event" as const, color: "#10B981" };
    case "preprint":
      return { name: "description" as const, color: "#F59E0B" };
    case "book":
      return { name: "menu-book" as const, color: "#8B5CF6" };
    default:
      return { name: "description" as const, color: "#6B7280" };
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "#10B981";
    case "accepted":
      return "#3B82F6";
    case "under-review":
      return "#F59E0B";
    case "draft":
      return "#6B7280";
    default:
      return "#6B7280";
  }
};

const getImpactColor = (impact?: string) => {
  switch (impact) {
    case "high":
      return "#EF4444";
    case "medium":
      return "#F59E0B";
    case "low":
      return "#10B981";
    default:
      return "#6B7280";
  }
};

export default function Publications() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const openLink = async (url: string, title: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open the link");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open the publication");
    }
  };

  const publishedCount = publications.filter(
    (p) => p.status === "published"
  ).length;
  const totalCitations = publications.reduce(
    (sum, p) => sum + (p.citations || 0),
    0
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="library-books" size={22} color="#6366F1" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Research Publications</Text>
            <Text style={styles.subtitle}>
              Academic Contributions & Research
            </Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {publications.length} Publication
            {publications.length !== 1 ? "s" : ""}
          </Text>
        </View>
      </View>

      <View style={styles.accentLine} />

      {/* Publications List */}
      <View style={styles.publicationsContainer}>
        {publications.map((pub, index) => {
          const typeIcon = getTypeIcon(pub.type);
          const isExpanded = expandedIndex === index;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.publicationCard,
                isExpanded && styles.publicationCardExpanded,
              ]}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.7}
            >
              {/* Header */}
              <View style={styles.publicationHeader}>
                <View style={styles.publicationTitleSection}>
                  <View
                    style={[
                      styles.typeIcon,
                      { backgroundColor: `${typeIcon.color}20` },
                    ]}
                  >
                    <MaterialIcons
                      name={typeIcon.name}
                      size={18}
                      color={typeIcon.color}
                    />
                  </View>
                  <View style={styles.titleInfo}>
                    <Text
                      style={styles.publicationTitle}
                      numberOfLines={isExpanded ? 0 : 3}
                    >
                      {pub.title}
                    </Text>
                    <View style={styles.publicationMeta}>
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor: `${getStatusColor(pub.status)}20`,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            { color: getStatusColor(pub.status) },
                          ]}
                        >
                          {pub.status.replace("-", " ").toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.typeText}>
                        {pub.type.toUpperCase()}
                      </Text>
                      {pub.impact && (
                        <View
                          style={[
                            styles.impactBadge,
                            {
                              backgroundColor: `${getImpactColor(
                                pub.impact
                              )}20`,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.impactText,
                              { color: getImpactColor(pub.impact) },
                            ]}
                          >
                            {pub.impact.toUpperCase()} IMPACT
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.dateSection}>
                  <Text style={styles.date}>{pub.date}</Text>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#6B7280"
                  />
                </View>
              </View>

              {/* Source */}
              <View style={styles.sourceContainer}>
                <MaterialIcons name="business" size={14} color="#6B7280" />
                <Text style={styles.source} numberOfLines={isExpanded ? 0 : 2}>
                  {pub.source}
                </Text>
              </View>

              {/* Description */}
              <Text
                style={styles.description}
                numberOfLines={isExpanded ? 0 : 3}
              >
                {pub.description}
              </Text>

              {/* Keywords */}
              {pub.keywords && (
                <View style={styles.keywordsSection}>
                  <Text style={styles.keywordsLabel}>Keywords:</Text>
                  <View style={styles.keywordsContainer}>
                    {pub.keywords
                      .slice(0, isExpanded ? pub.keywords.length : 3)
                      .map((keyword, keywordIndex) => (
                        <View key={keywordIndex} style={styles.keywordTag}>
                          <Text style={styles.keywordText}>{keyword}</Text>
                        </View>
                      ))}
                    {!isExpanded && pub.keywords.length > 3 && (
                      <View style={styles.moreKeywordsTag}>
                        <Text style={styles.moreKeywordsText}>
                          +{pub.keywords.length - 3}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}

              {/* Expanded Content */}
              {isExpanded && (
                <View style={styles.expandedContent}>
                  <View style={styles.metricsContainer}>
                    {pub.citations !== undefined && (
                      <View style={styles.metric}>
                        <MaterialIcons
                          name="format-quote"
                          size={16}
                          color="#6366F1"
                        />
                        <Text style={styles.metricLabel}>Citations</Text>
                        <Text style={styles.metricValue}>{pub.citations}</Text>
                      </View>
                    )}
                    {pub.doi && (
                      <View style={styles.metric}>
                        <MaterialIcons
                          name="fingerprint"
                          size={16}
                          color="#10B981"
                        />
                        <Text style={styles.metricLabel}>DOI Available</Text>
                        <MaterialIcons
                          name="check-circle"
                          size={16}
                          color="#10B981"
                        />
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => openLink(pub.linkUrl, pub.title)}
                  >
                    <MaterialIcons name="open-in-new" size={18} color="white" />
                    <Text style={styles.primaryButtonText}>{pub.linkText}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialIcons name="publish" size={20} color="#10B981" />
          <Text style={styles.statLabel}>Published</Text>
          <Text style={styles.statValue}>{publishedCount}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <MaterialIcons name="format-quote" size={20} color="#6366F1" />
          <Text style={styles.statLabel}>Citations</Text>
          <Text style={styles.statValue}>{totalCitations}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <MaterialIcons name="trending-up" size={20} color="#F59E0B" />
          <Text style={styles.statLabel}>H-Index</Text>
          <Text style={styles.statValue}>1</Text>
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
  publicationsContainer: {
    marginBottom: 24,
  },
  publicationCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  publicationCardExpanded: {
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
  publicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  publicationTitleSection: {
    flexDirection: "row",
    flex: 1,
    marginRight: 12,
  },
  typeIcon: {
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
  publicationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "SF Pro Text" : "Roboto",
  },
  publicationMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  typeText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#6B7280",
  },
  impactBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 9,
    fontWeight: "700",
  },
  dateSection: {
    alignItems: "flex-end",
  },
  date: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
    fontStyle: "italic",
  },
  sourceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingLeft: 2,
  },
  source: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#4B5563",
    marginLeft: 8,
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "SF Pro Text" : "Roboto",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4B5563",
    marginBottom: 16,
    textAlign: "left",
  },
  keywordsSection: {
    marginBottom: 12,
  },
  keywordsLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  keywordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  keywordTag: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  keywordText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#6366F1",
  },
  moreKeywordsTag: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  moreKeywordsText: {
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
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  metric: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metricLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
    marginLeft: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginLeft: 4,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#6366F1",
    flex: 1,
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginLeft: 8,
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
