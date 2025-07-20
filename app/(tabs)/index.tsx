import React, { useRef, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  View,
  Text,
  ScrollView,
  ViewStyle,
  TextStyle,
} from "react-native";

// Component imports
import Name_Social from "./1_name_social";
import Education from "./2_education";
import Profile_Summary from "./3_ps";
import Professional_Experience from "./4_pe";
import Projects from "./5_projects";
import Publication from "./6_publications";
import Certification from "./7_certifications";
import Skills from "./8_skills";

// Types
type SectionComponent = React.ReactElement;

interface SectionProps {
  component: SectionComponent;
  isHeader?: boolean;
  title?: string;
}

interface AnimatedCardProps {
  children: React.ReactNode;
  index: number;
  isHeader?: boolean;
  title?: string;
}

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const sections: SectionProps[] = [
    { component: <Name_Social />, isHeader: true },
    { component: <Profile_Summary />, title: 'Profile Summary' },
    { component: <Education />, title: 'Education' },
    { component: <Professional_Experience />, title: 'Professional Experience' },
    { component: <Projects />, title: 'Projects' },
    { component: <Publication />, title: 'Publications' },
    { component: <Certification />, title: 'Certifications' },
    { component: <Skills />, title: 'Skills' },
  ];

  const AnimatedCard: React.FC<AnimatedCardProps> = ({
    children,
    index,
    isHeader = false,
    title,
  }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, [index]);

    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0],
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        style={[
          styles.cardWrapper,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <View
          style={[
            styles.card,
            isHeader ? styles.headerCard : styles.standardCard,
          ]}
        >
          {!isHeader && title && (
            <View style={styles.sectionHeader}>
              <View style={styles.titleBar} />
              <Text style={styles.sectionTitle}>{title}</Text>
            </View>
          )}
          <View style={isHeader ? styles.headerContent : styles.cardContent}>
            {children}
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <View style={styles.backgroundDecoration}>
        <View style={styles.decorationCircle1} />
        <View style={styles.decorationCircle2} />
      </View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {sections.map((section, index) => (
            <AnimatedCard
              key={index}
              index={index}
              isHeader={section.isHeader}
              title={section.title}
            >
              {section.component}
            </AnimatedCard>
          ))}

          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 • Built with React Native</Text>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

// Styles
interface Styles {
  container: ViewStyle;
  backgroundDecoration: ViewStyle;
  decorationCircle1: ViewStyle;
  decorationCircle2: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  contentContainer: ViewStyle;
  cardWrapper: ViewStyle;
  card: ViewStyle;
  headerCard: ViewStyle;
  standardCard: ViewStyle;
  sectionHeader: ViewStyle;
  titleBar: ViewStyle;
  headerContent: ViewStyle;
  cardContent: ViewStyle;
  footer: ViewStyle;
  sectionTitle: TextStyle;
  footerText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backgroundDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    overflow: 'hidden',
  },
  decorationCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(26, 115, 232, 0.05)',
    top: -50,
    right: -50,
  },
  decorationCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(26, 115, 232, 0.03)',
    top: 100,
    left: -30,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(26, 115, 232, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#1a73e8',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  standardCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  titleBar: {
    width: 4,
    height: 24,
    backgroundColor: '#1a73e8',
    borderRadius: 2,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    letterSpacing: -0.3,
  },
  headerContent: {
    padding: 24,
  },
  cardContent: {
    padding: 24,
    paddingTop: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    letterSpacing: 0.5,
  },
});
