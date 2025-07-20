import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  TouchableOpacity,
  ScrollView,
  Animated,
  Pressable
} from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ProfileSummary() {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scaleValue = new Animated.Value(1);
  const fadeValue = new Animated.Value(1);

  const handleEditPress = () => {
    setIsEditing(!isEditing);
    
    // Subtle animation when toggling edit mode
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

  const handleHoverIn = () => {
    setIsHovered(true);
    Animated.spring(scaleValue, {
      toValue: 1.02,
      friction: 4,
      useNativeDriver: true
    }).start();
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true
    }).start();
  };

  return (
    <Animated.View 
      style={[
        styles.card, 
        { transform: [{ scale: scaleValue }] },
        isHovered && styles.cardHover
      ]}
    >
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="star" size={20} color="#FFD700" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Professional Summary</Text>
            <Text style={styles.subtitle}>Core Competencies & Expertise</Text>
          </View>
        </View>
        
        <Pressable
          onPress={handleEditPress}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.editButtonPressed,
            isHovered && styles.editButtonHover,
            isEditing && styles.editButtonActive
          ]}
        >
          <Ionicons 
            name={isEditing ? "close-circle" : "create-outline"} 
            size={18} 
            color={isEditing ? "#EF4444" : "#6366F1"} 
          />
          <Text style={[
            styles.editButtonText, 
            isEditing && styles.editButtonTextActive
          ]}>
            {isEditing ? "Cancel" : "Edit"}
          </Text>
        </Pressable>
      </View>

      {/* Decorative Accent */}
      <View style={styles.accentLine} />
      
      {/* Content Area */}
      <View style={styles.contentContainer}>
        {isEditing ? (
          <View style={styles.editMode}>
            <View style={styles.editHeader}>
              <MaterialIcons name="edit" size={16} color="#6366F1" />
              <Text style={styles.editTitle}>Edit Professional Summary</Text>
            </View>
            
            <View style={styles.textInputContainer}>
              <Text style={styles.bodyText}>
                <Text style={styles.highlight}>Python Developer</Text> with expertise in 
                <Text style={styles.highlight}> Data Analysis</Text> and scalable web
                development. Skilled in <Text style={styles.highlight}>Power BI</Text> visualization and 
                <Text style={styles.highlight}> Agile</Text> methodologies, with a strong ability 
                to collaborate on innovative software solutions.
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
              <Ionicons name="checkmark-circle" size={18} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.bodyText}>
                <Text style={styles.highlight}>Python Developer</Text> with expertise in 
                <Text style={styles.highlight}> Data Analysis</Text> and scalable web
                development. Skilled in <Text style={styles.highlight}>Power BI</Text> visualization and 
                <Text style={styles.highlight}> Agile</Text> methodologies, with a strong ability 
                to collaborate on innovative software solutions.
              </Text>
            </ScrollView>
            
            {/* Key Skills Tags */}
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsLabel}>Key Skills:</Text>
              <View style={styles.skillsTags}>
                {['Python', 'Data Analysis', 'Power BI', 'Agile', 'Web Development'].map((skill, index) => (
                  <View key={index} style={styles.skillTag}>
                    <Text style={styles.skillTagText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            {/* Professional Signature */}
            <View style={styles.signatureContainer}>
              <View style={styles.signatureContent}>
                <View style={styles.signatureLine} />
                <View style={styles.signatureInfo}>
                  <Text style={styles.signatureText}>Last Updated: July 2025</Text>
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="shield-checkmark" size={12} color="#10B981" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    marginHorizontal: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    ...Platform.select({
      ios: {
        shadowColor: '#3F3D56',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 16,
        shadowColor: '#3F3D56',
      },
    }),
  },
  cardHover: {
    ...Platform.select({
      web: {
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
      }
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 0.25,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  editButtonHover: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    ...Platform.select({
      web: {
        transform: [{ scale: 1.05 }],
      }
    }),
  },
  editButtonPressed: {
    backgroundColor: '#E0E7FF',
    transform: [{ scale: 0.95 }],
  },
  editButtonActive: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    marginLeft: 8,
  },
  editButtonTextActive: {
    color: '#EF4444',
  },
  accentLine: {
    height: 4,
    width: 80,
    backgroundColor: '#6366F1',
    borderRadius: 4,
    marginBottom: 24,
  },
  contentContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 24,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#4B5563',
    textAlign: 'left',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontWeight: '400',
  },
  highlight: {
    color: '#1F2937',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  skillsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  skillsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  skillsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  skillTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6366F1',
  },
  signatureContainer: {
    marginTop: 24,
  },
  signatureContent: {
    alignItems: 'flex-end',
  },
  signatureLine: {
    width: 140,
    height: 2,
    backgroundColor: '#D1D5DB',
    marginBottom: 8,
    borderRadius: 1,
  },
  signatureInfo: {
    alignItems: 'flex-end',
  },
  signatureText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    marginBottom: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#10B981',
    marginLeft: 4,
  },
  editMode: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  editHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  editTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  textInputContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
    minHeight: 120,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
    fontSize: 14,
  },
});