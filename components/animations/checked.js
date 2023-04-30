import Lottie from "lottie-react-native";
import LottieView from "lottie-react-native";

export default function Checked() {
  return (
    <LottieView
      loop={false}
      style={{ width: 280, height: 280 }}
      autoPlay
      source={require("../../assets/animation/checked.json")}
    ></LottieView>
  );
}
