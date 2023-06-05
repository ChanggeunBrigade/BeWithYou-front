import Lottie from "lottie-react-native";
import LottieView from "lottie-react-native";

export default function Wave() {
  return (
    <LottieView
      style={{ height: 190 }}
      autoPlay
      source={require("../../assets/animation/wave.json")}
    ></LottieView>
  );
}
