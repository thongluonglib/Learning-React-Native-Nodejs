import { Button, Text, View } from "react-native";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeepLinkConfig from "./src/DeepLinkConfig";
function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button title="Go to Profile" onPress={() => navigation.navigate("Profile", { id: 1 })} />
		</View>
	);
}

function NotificationsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button title="Go to Settings" onPress={() => navigation.navigate("Settings")} />
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

const ProfileScreen = ({ route, navigation }) => {
	const {
		params: { id },
	} = route;
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			{id != 1 && <Text style={{ }}>Deeplink id = {id}</Text>}
			<Button title="Go to Notifications" onPress={() => navigation.navigate("Notifications")} />
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
};

function SettingsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button title="Go back" onPress={() => navigation.goBack()} />
			<Button title="Go Linking Buttons" onPress={() => navigation.navigate("LinkingButton")} />
		</View>
	);
}

const Stack = createNativeStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Notifications" component={NotificationsScreen} />
			<Stack.Screen name="Profile" component={ProfileScreen} />
			<Stack.Screen name="Settings" component={SettingsScreen} />
		</Stack.Navigator>
	);
}
export default function App() {
	return (
		<NavigationContainer linking={DeepLinkConfig} fallback={<Text>Loading...</Text>}>
			<MyStack />
		</NavigationContainer>
	);
}