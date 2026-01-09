import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "./supabase";
import { User, Session } from "@supabase/supabase-js";

interface CustomUser {
  id: string;
  name: string | null;
  email: string | null;
  avatar: string | null;
  phone: string | null;
  role: string | null;
  address?: string | null;
  username?: string | null;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: CustomUser | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
        return;
      }
      setProfile(data);
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
      setProfile(null);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await fetchProfile(currentUser.id);
      }

      setLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isLoggedIn = !!session && !!user;

  const formattedUser: CustomUser | null = user
    ? {
        id: user.id,
        name:
          profile?.full_name ||
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          null,
        email: profile?.email || user.email || null,
        avatar: profile?.avatar_url || user.user_metadata?.avatar_url || null,
        phone: profile?.phone_number || user.phone || null,
        role: profile?.role || user.user_metadata?.role || null,
        address: profile?.address || null,
        username: profile?.username || null,
      }
    : null;

  const refetch = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user: formattedUser,
        loading,
        refetch,
      }}
    >
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
