import { createContext, ReactNode, useContext } from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";

interface User {
	id: string;
	name: string | null;
	email: string | null;
	avatar: string | null;
}

interface GlobalContextType {
	isLoggedIn: boolean;
	user: User | null;
	loading: boolean;
	refetch: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const { user, isLoaded, isSignedIn } = useUser();
	const { getToken } = useAuth(); // Optional, if you need JWT for APIs

	const isLoggedIn = !!isSignedIn && !!user;

	const formattedUser: User | null = user
		? {
				id: user.id,
				name: user.fullName,
				email: user.primaryEmailAddress?.emailAddress ?? null,
				avatar: user.imageUrl,
		  }
		: null;

	// Dummy refetch for now — Clerk doesn't need a refetch in most cases
	const refetch = async () => {
		// Optionally you can call user.reload() if you need updated data
	};

	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,
				user: formattedUser,
				loading: !isLoaded,
				refetch,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = (): GlobalContextType => {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}

	return context;
};

export default GlobalProvider;
