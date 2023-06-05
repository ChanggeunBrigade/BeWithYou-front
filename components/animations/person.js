import Lottie from "lottie-react-native";
import LottieView from "lottie-react-native";

export default function Person() {
  return (
    <LottieView
      style={{ width: 79, height: 79 }}
      autoPlay
      source={require("../../assets/animation/person.json")}
    ></LottieView>
  );
}