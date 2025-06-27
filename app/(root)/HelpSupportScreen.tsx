import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	ScrollView,
} from "react-native";

// Icon components (you can replace these with your preferred icon library)
const HeadphoneIcon = () => <Text style={styles.iconText}>🎧</Text>;

const PhoneIcon = () => <Text style={styles.iconText}>📞</Text>;

const QuestionIcon = () => <Text style={styles.iconText}>❓</Text>;

const ChevronIcon = () => <Text style={styles.chevronText}>{">"}</Text>;

const CloseIcon = () => <Text style={styles.closeText}>✕</Text>;

const HelpSupportScreen = () => {
	const [chatModalVisible, setChatModalVisible] = useState(false);
	const [contactModalVisible, setContactModalVisible] = useState(false);
	const [faqModalVisible, setFaqModalVisible] = useState(false);
	const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

	// Contact form expanded states
	const [emailExpanded, setEmailExpanded] = useState(false);
	const [phoneExpanded, setPhoneExpanded] = useState(false);

	const faqData = [
		{
			question: "Will I get a refund when delivery goes wrong?",
			answer:
				"Yes, we offer full refunds for orders that are not delivered successfully due to our error. Please contact our support team within 24 hours of the expected delivery time to process your refund request.",
		},
		{
			question: "When is your opening hours",
			answer: "Our opening hours is 5 - 6 am",
		},
	];

	const contactData = {
		email: "Support@echow.gmail.com",
		phone: "08075869025",
	};

	const handleBack = () => {
		router.back();
	};

	const MenuItem = ({
		icon,
		title,
		onPress,
	}: {
		icon: React.ReactNode;
		title: string;
		onPress: () => void;
	}) => (
		<TouchableOpacity
			style={styles.menuItem}
			onPress={onPress}>
			<View style={styles.menuItemLeft}>
				{icon}
				<Text style={styles.menuItemText}>{title}</Text>
			</View>
			<ChevronIcon />
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle="dark-content"
				backgroundColor="#f8f8f8"
			/>

			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					onPress={handleBack}
					style={styles.backButton}>
					<Ionicons
						name="chevron-back"
						size={24}
						color="#000"
					/>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Help and Support</Text>
			</View>

			{/* Menu Items */}
			<View style={styles.menuContainer}>
				<MenuItem
					icon={<HeadphoneIcon />}
					title="Chat with our customer support"
					onPress={() => setChatModalVisible(true)}
				/>
				<MenuItem
					icon={<PhoneIcon />}
					title="Contact Us"
					onPress={() => setContactModalVisible(true)}
				/>
				<MenuItem
					icon={<QuestionIcon />}
					title="FAQ"
					onPress={() => setFaqModalVisible(true)}
				/>
			</View>

			{/* Chat Modal (Placeholder) */}
			<Modal
				visible={chatModalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setChatModalVisible(false)}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Chat Support</Text>
							<TouchableOpacity onPress={() => setChatModalVisible(false)}>
								<CloseIcon />
							</TouchableOpacity>
						</View>
						<View style={styles.modalContent}>
							<Text style={styles.placeholderText}>
								Chat support feature coming soon!
							</Text>
						</View>
					</View>
				</View>
			</Modal>

			{/* Contact Us Modal */}
			<Modal
				visible={contactModalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setContactModalVisible(false)}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Contact Us</Text>
							<TouchableOpacity onPress={() => setContactModalVisible(false)}>
								<CloseIcon />
							</TouchableOpacity>
						</View>
						<View style={styles.modalContent}>
							{/* Email Field */}
							<View style={styles.contactField}>
								<TouchableOpacity
									style={styles.fieldHeader}
									onPress={() => setEmailExpanded(!emailExpanded)}>
									<Text style={styles.fieldLabel}>Email Address</Text>
									<Ionicons
										name={emailExpanded ? "chevron-up" : "chevron-down"}
										size={16}
										color="#666"
									/>
								</TouchableOpacity>
								{emailExpanded && (
									<Text style={styles.fieldValue}>{contactData.email}</Text>
								)}
							</View>

							{/* Phone Field */}
							<View style={styles.contactField}>
								<TouchableOpacity
									style={styles.fieldHeader}
									onPress={() => setPhoneExpanded(!phoneExpanded)}>
									<Text style={styles.fieldLabel}>Phone number</Text>
									<Ionicons
										name={phoneExpanded ? "chevron-up" : "chevron-down"}
										size={16}
										color="#666"
									/>
								</TouchableOpacity>
								{phoneExpanded && (
									<Text style={styles.fieldValue}>{contactData.phone}</Text>
								)}
							</View>
						</View>
					</View>
				</View>
			</Modal>

			{/* FAQ Modal */}
			<Modal
				visible={faqModalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setFaqModalVisible(false)}>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>FAQ</Text>
							<TouchableOpacity onPress={() => setFaqModalVisible(false)}>
								<CloseIcon />
							</TouchableOpacity>
						</View>
						<ScrollView style={styles.modalContent}>
							{faqData.map((faq, index) => (
								<View
									key={index}
									style={styles.faqItem}>
									<TouchableOpacity
										style={styles.faqQuestion}
										onPress={() =>
											setExpandedFaq(expandedFaq === index ? null : index)
										}>
										<Text style={styles.faqQuestionText}>{faq.question}</Text>
										<Ionicons
											name={
												expandedFaq === index ? "chevron-up" : "chevron-down"
											}
											size={16}
											color="#666"
										/>
									</TouchableOpacity>
									{expandedFaq === index && faq.answer && (
										<Text style={styles.faqAnswer}>{faq.answer}</Text>
									)}
								</View>
							))}
						</ScrollView>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f8f8",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "#f8f8f8",
	},
	backButton: {
		marginRight: 16,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
	},
	menuContainer: {
		backgroundColor: "#fff",
		marginTop: 8,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	menuItemLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	menuItemText: {
		fontSize: 16,
		color: "#000",
		marginLeft: 12,
	},
	iconText: {
		fontSize: 20,
	},
	chevronText: {
		fontSize: 16,
		color: "#666",
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},
	modalContainer: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		maxHeight: "80%",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
	},
	closeText: {
		fontSize: 18,
		color: "#666",
	},
	modalContent: {
		padding: 20,
	},
	placeholderText: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		paddingVertical: 40,
	},
	contactField: {
		marginBottom: 20,
	},
	fieldHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: "#f8f8f8",
		borderRadius: 8,
	},
	fieldLabel: {
		fontSize: 16,
		color: "#666",
	},
	fieldValue: {
		fontSize: 16,
		color: "#000",
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	faqItem: {
		marginBottom: 16,
	},
	faqQuestion: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: "#f8f8f8",
		borderRadius: 8,
	},
	faqQuestionText: {
		fontSize: 16,
		color: "#000",
		flex: 1,
	},
	faqAnswer: {
		fontSize: 16,
		color: "#666",
		paddingHorizontal: 16,
		paddingTop: 8,
	},
});

export default HelpSupportScreen;
