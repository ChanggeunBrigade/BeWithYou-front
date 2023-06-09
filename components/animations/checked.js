import Lottie from "lottie-react-native";
import LottieView from "lottie-react-native";

export default function Checked() {
  return (
    <LottieView
      loop={false}
      style={{ width: 340, height: 340 }}
      autoPlay
      source={require("../../assets/animation/checked.json")}
    ></LottieView>
  );
}
