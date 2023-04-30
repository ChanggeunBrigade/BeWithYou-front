import Lottie from "lottie-react-native";
import LottieView from "lottie-react-native";

export default function Ambulance() {
  return (
    <LottieView
      style={{ width: 230, height: 230 }}
      autoPlay
      source={require("../../assets/animation/ambulance.json")}
    ></LottieView>
  );
}
