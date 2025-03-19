import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingScreen from "@/app/(root)/onBoarding";
import { LocationProvider } from "./(root)/src/context/locationContext";
import CurrentLocation from "./(root)/src/location/currentLocation";

export default function index() {
  
  return (
    <SafeAreaView>
      <LocationProvider>
        <CurrentLocation />
      </LocationProvider>
      <OnboardingScreen />
    </SafeAreaView>
  );
}
