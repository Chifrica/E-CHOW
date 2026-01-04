import {
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
	StyleSheet,
	NativeSyntheticEvent,
	NativeScrollEvent,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { slides } from "../../constants/data";
import { SignInOutCard } from "../../components/signInOutCard";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
	const [imgActive, setImgActive] = useState(0);
	const scrollViewRef = useRef<ScrollView>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setImgActive((prevIndex) => {
				const nextIndex = (prevIndex + 1) % slides.length;
				scrollViewRef.current?.scrollTo({
					x: nextIndex * width,
					animated: true,
				});
				return nextIndex;
			});
		}, 5000);

		return () => clearInterval(interval);
	}, [imgActive]);

	const onchange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const currentIndex = Math.round(contentOffsetX / width);
		setImgActive(currentIndex);
	};

	return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView
          onScroll={onchange}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          ref={scrollViewRef}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
        >
          {slides.map((slide, index) => (
            <View
              key={index}
              style={{
                width,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                key={index}
                resizeMode="contain"
                source={slide.image}
                style={styles.slideImage}
              />

              <View style={styles.dotContainer}>
                {slides.map((_, dotIndex) => (
                  <Text
                    key={dotIndex}
                    style={
                      imgActive == dotIndex
                        ? styles.dotActive
                        : styles.dotInActive
                    }
                  >
                    ●
                  </Text>
                ))}
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                  {typeof slide.title == "string" ? (
                    slide.title
                  ) : (
                    <>{slide.title}</>
                  )}
                </Text>
                <Text style={styles.descriptionText}>
                  {Array.isArray(slide.description)
                    ? slide.description.map((part, index) =>
                        typeof part === "string" ? (
                          part
                        ) : (
                          <Text
                            key={index}
                            style={{
                              color: part.highlight ? "#E58945" : "#667085",
                            }}
                          >
                            {part.text}
                          </Text>
                        )
                      )
                    : slide.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomContainer}>
        <SignInOutCard />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  contentContainer: {
    flex: 3, // Takes 3/4 of the screen space
  },
  bottomContainer: {
    flex: 1, // Takes 1/4 of the screen space
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  slideImage: {
    width: width * 0.8,
    height: "50%", // Responsive height relative to slide container
    marginBottom: 20,
  },
  dotContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 15,
  },
  dotActive: {
    margin: 3,
    color: "#E58945",
    fontSize: 20,
  },
  dotInActive: {
    margin: 3,
    color: "#D6D6D6",
    fontSize: 20,
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  titleText: {
    fontWeight: "700",
    fontSize: 28,
    fontFamily: "sans",
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#667085",
    textAlign: "center",
    lineHeight: 24,
  },
});
