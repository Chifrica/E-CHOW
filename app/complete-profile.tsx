import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { useGlobalContext } from "../lib/global-provider";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";

type Role = "buyer" | "vendor" | "rider";

const CompleteProfile = () => {
  const router = useRouter();
  const { user, refetch } = useGlobalContext();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Initialize avatar from user metadata if available
  React.useEffect(() => {
    if (user?.avatar) {
      setAvatarUrl(user.avatar);
    }
  }, [user]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      // Upload immediately or just set state to upload on save?
      // Better to upload on save or separate function. For simplicity, let's just set local URI
      // But Supabase needs upload. Let's upload immediately for better UX feedback or do it in save.
      // Let's do it in handleSaveProfile or a helper.
      // For now, save the asset base64 or uri to state.
      // Actually, let's keep it simple: Select -> Upload -> Get URL -> Save Profile.
      // But uploading immediately shows progress better.
      uploadImage(asset);
    }
  };

  const uploadImage = async (asset: ImagePicker.ImagePickerAsset) => {
    try {
      setUploading(true);
      if (!asset.base64) {
        throw new Error("No image data");
      }

      const fileExt = asset.uri.split(".").pop()?.toLowerCase() ?? "jpg";
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-picture")
        .upload(filePath, decode(asset.base64), {
          contentType: asset.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("profile-picture").getPublicUrl(filePath);
      
      setAvatarUrl(data.publicUrl);
      Alert.alert("Success", "Image uploaded successfully");

    } catch (error: any) {
        console.error("Upload error:", error);
        Alert.alert("Error", "Failed to upload image. " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!selectedRole) {
      Alert.alert("Error", "Please select a role to continue.");
      return;
    }

    if (!address) {
      Alert.alert("Error", "Please enter your address.");
      return;
    }

    if (!user) {
        Alert.alert("Error", "No user found. Please login again.");
        router.replace("/(auth)/login/savedNumber");
        return;
    }

    setLoading(true);

    try {
      // 1. Update user metadata (optional, but good for quick access)
      const { error: updateError } = await supabase.auth.updateUser({
        data: { role: selectedRole, address },
      });

      if (updateError) throw updateError;

      // 2. Insert/Update into profile table (Preferred for relational data)
      const { error: profileError } = await supabase
        .from("profile")
        .upsert({
          id: user.id,
          role: selectedRole,
          full_name: user.name,
          phone_number: user.phone ? user.phone.replace(/\D/g, "") : null,
          email: user.email,
          avatar_url: avatarUrl || user.avatar,
          address: address,
          username: user.name, // Using full name as default username for now
          updated_at: new Date(),
        });

      if (profileError) {
          console.error("Profile creation error:", profileError);
          // Fallback if table doesn't exist? Or just warn user.
          // For now, throw to catch block but check if it's a 404 (table missing)
          // Actually, we'll assume user ran the SQL.
          throw profileError;
      }

      // 3. Refresh global context to get new role/data
      await refetch();

      Alert.alert("Success", "Profile completed successfully!");
      router.replace("/welcomePage");

    } catch (error: any) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save profile. " + (error.message || ""));
    } finally {
      setLoading(false);
    }
  };

  const RoleCard = ({ role, title, icon, description }: { role: Role, title: string, icon: any, description: string }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selectedRole === role && styles.cardSelected,
      ]}
      onPress={() => setSelectedRole(role)}
    >
        <View style={styles.iconContainer}>
            <Ionicons name={icon} size={30} color={selectedRole === role ? "#E58945" : "#666"} />
        </View>
        <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, selectedRole === role && styles.textSelected]}>{title}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
        </View>
        <View style={styles.radio}>
            {selectedRole === role && <View style={styles.radioSelected} />}
        </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Complete Profile</Text>
        <Text style={styles.subtitle}>Select how you want to use E-CHOW</Text>
      </View>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={pickImage} disabled={uploading} style={styles.avatarContainer}>
            {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
                <View style={styles.avatarPlaceholder}>
                    <Ionicons name="camera" size={40} color="#999" />
                    <Text style={styles.avatarText}>Upload Photo</Text>
                </View>
            )}
            {uploading && (
                <View style={styles.uploadOverlay}>
                    <ActivityIndicator color="#fff" />
                </View>
            )}
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g 123 Main St, Lagos"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.content}>
        <RoleCard 
            role="buyer" 
            title="Buyer" 
            icon="cart-outline" 
            description="I want to order food and groceries." 
        />
        <RoleCard 
            role="vendor" 
            title="Vendor" 
            icon="restaurant-outline" 
            description="I want to sell food and manage my store." 
        />
        <RoleCard 
            role="rider" 
            title="Rider" 
            icon="bicycle-outline" 
            description="I want to deliver orders and earn money." 
        />
      </View>
      <View style={{ height: 40 }} />

      <TouchableOpacity
        style={[styles.button, (!selectedRole || loading) && styles.buttonDisabled]}
        onPress={handleSaveProfile}
        disabled={!selectedRole || loading}
      >
        {loading ? (
            <ActivityIndicator color="#fff" />
        ) : (
            <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F9FAFB",
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    gap: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 16,
  },
  cardSelected: {
    borderColor: "#E58945",
    backgroundColor: "#FFF8F3",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  textSelected: {
    color: "#E58945",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E58945",
  },
  button: {
    backgroundColor: "#E58945",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#FDBA74",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#6B7280",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E1E1",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E58945",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatarPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
  },
  uploadOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CompleteProfile;
