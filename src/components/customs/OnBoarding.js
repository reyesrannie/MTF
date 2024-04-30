import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import slides from "../../utilities/constants/slides";
import NextButton from "./NextButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setOnboarding } from "../../utilities/redux/slice/setupSlice";
import { onBoardingDone } from "../../utilities/functions/storeData";

const OnBoarding = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewableItemsChange = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const currentSlideIndex = viewableItems[0].index;
      setCurrentIndex(currentSlideIndex);
    }
  };

  const { height } = useWindowDimensions();

  const scrollTo = () => {
    if (currentIndex < slides?.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      hasBoarded();
    }
  };

  const hasBoarded = async () => {
    try {
      dispatch(setOnboarding(true));
      onBoardingDone("onboarding.txt", "true");
      navigation.navigate("selection");
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          contentContainerStyle={{ height }}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemsChange}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton
        percentage={(currentIndex + 1) * (100 / slides.length)}
        scrollTo={scrollTo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OnBoarding;
