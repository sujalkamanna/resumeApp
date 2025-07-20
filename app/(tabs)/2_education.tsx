import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  TouchableOpacity,
  Animated
} from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

// Define a type for education entry
interface EducationEntry {
  institution: string;
  location: string;
  details: string;
  year: string;
  degree: string;
  score: string;
  level: 'undergraduate' | 'secondary' | 'primary';
}

const educationEntries: EducationEntry[] = [
  {
    institution: "RMD Sinhgad Technical Institute Campus",
    location: "Pune, Maharashtra",
    details: "BE in Computer Science",
    degree: "Bachelor of Engineering",
    score: "CGPA: 8.06",
    year: "2021 - 2025",
    level: "undergraduate"
  },
  {
    institution: "Nirmal Bethany Jr College",
    location: "Pune, Maharashtra",
    details: "Higher Secondary Certificate",
    degree: "HSC",
    score: "87.33%",
    year: "2021",
    level: "secondary"
  },
  {
    institution: "Sanjeevan Public School",
    location: "Kolhapur, Maharashtra",
    details: "Secondary School Certificate",
    degree: "SSC",
    score: "86.80%",
    year: "2019",
    level: "primary"
  }
];

// Fixed icon names - using valid MaterialIcons names
const getLevelIcon = (level: string) => {
  switch (level) {
    case 'undergraduate':
      return { name: 'school' as const, color: '#6366F1' };
    case 'secondary':
      return { name: 'book' as const, color: '#8B5CF6' };
    case 'primary':
      return { name: 'menu-book' as const, color: '#06B6D4' };
    default:
      return { name: 'school' as const, color: '#6366F1' };
  }
};

const getScoreColor = (score: string) => {
  const numericScore = parseFloat(score.replace(/[^\d.]/g, ''));
  if (numericScore >= 8.0 || numericScore >= 85) return '#10B981';
  if (numericScore >= 7.0 || numericScore >= 75) return '#F59E0B';
  return '#6B7280';
};

export default function Education() {
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
            <MaterialIcons name="school" size={22} color="#6366F1" />
          </View>
          <Text style={styles.title}>Education</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>3 Qualifications</Text>
        </View>
      </View>

      {/* Decorative Timeline */}
      <View style={styles.timeline}>
        {educationEntries.map((entry, index) => {
          const levelIcon = getLevelIcon(entry.level);
          const isExpanded = expandedIndex === index;
          
          return (
            <TouchableOpacity
              key={index}
              style={styles.entryContainer}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.7}
            >
              {/* Timeline Connector */}
              <View style={styles.timelineConnector}>
                <View style={[styles.timelineNode, { backgroundColor: levelIcon.color }]}>
                  <MaterialIcons name={levelIcon.name} size={16} color="white" />
                </View>
                {index !== educationEntries.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              {/* Content Card */}
              <View style={[styles.entryCard, isExpanded && styles.entryCardExpanded]}>
                {/* Header Row */}
                <View style={styles.entryHeader}>
                  <View style={styles.institutionContainer}>
                    <Text style={styles.institution} numberOfLines={isExpanded ? 0 : 2}>
                      {entry.institution}
                    </Text>
                    <View style={styles.locationContainer}>
                      <Ionicons name="location-outline" size={14} color="#6B7280" />
                      <Text style={styles.location}>{entry.location}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.yearContainer}>
                    <Text style={styles.year}>{entry.year}</Text>
                    <Ionicons 
                      name={isExpanded ? "chevron-up" : "chevron-down"} 
                      size={16} 
                      color="#6B7280" 
                    />
                  </View>
                </View>

                {/* Details Row */}
                <View style={styles.entryDetails}>
                  <View style={styles.degreeContainer}>
                    <Text style={styles.degree}>{entry.degree}</Text>
                    <Text style={styles.details}>{entry.details}</Text>
                  </View>
                  
                  <View style={styles.scoreContainer}>
                    <View style={[styles.scoreBadge, { borderColor: getScoreColor(entry.score) }]}>
                      <Text style={[styles.score, { color: getScoreColor(entry.score) }]}>
                        {entry.score}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Expanded Content */}
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    <View style={styles.achievementContainer}>
                      <MaterialIcons name="star" size={16} color="#F59E0B" />
                      <Text style={styles.achievementText}>
                        {entry.level === 'undergraduate' 
                          ? 'Graduated with first Class and Distinction in Computer Science'
                          : `Achieved ${entry.score} in ${entry.degree}`
                        }
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Summary Footer */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Highest Qualification</Text>
          <Text style={styles.summaryValue}>BE Computer Science</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Academic Excellence</Text>
          <Text style={styles.summaryValue}>Consistent 85%+ Performance</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
        shadowColor: '#3F3D56',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#EEF2FF',
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 0.25,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  badge: {
    backgroundColor: '#F0F9FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0284C7',
  },
  timeline: {
    marginBottom: 20,
  },
  entryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineConnector: {
    alignItems: 'center',
    marginRight: 16,
    width: 32,
  },
  timelineNode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    minHeight: 40,
  },
  entryCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  entryCardExpanded: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  institutionContainer: {
    flex: 1,
    marginRight: 12,
  },
  institution: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  yearContainer: {
    alignItems: 'flex-end',
  },
  year: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  entryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  degreeContainer: {
    flex: 1,
  },
  degree: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 2,
  },
  details: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  score: {
    fontSize: 13,
    fontWeight: '600',
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  achievementText: {
    fontSize: 13,
    color: '#92400E',
    marginLeft: 8,
    flex: 1,
    fontStyle: 'italic',
  },
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
});