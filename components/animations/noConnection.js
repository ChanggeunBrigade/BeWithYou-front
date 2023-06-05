import Lottie from "lottie-react-native";
import LottieView from "lottie-react-native";

export default function NoConnection() {
  return (
    <LottieView
      style={{ width: 230, height: 230 }}
      autoPlay
      source={require("../../assets/animation/noConnection.json")}
    ></LottieView>
  );
}
