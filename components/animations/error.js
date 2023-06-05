import Lottie from "lottie-react-native";
import LottieView from "lottie-react-native";

export default function Error() {
  return (
    <LottieView
      loop={false}
      style={{ width: 220, height: 220 }}
      autoPlay
      source={require("../../assets/animation/error.json")}
    ></LottieView>
  );
}