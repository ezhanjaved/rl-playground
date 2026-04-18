import { create } from "zustand";
import { supabase } from "../lib/supabasePoint";

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  friendModel: null,
  setFriendModel: (value) => set({ friendModel: value }),
  initialize: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null, loading: false });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });
  },

  signUp: async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) return { data, error };

    const userId = data?.user?.id;
    if (userId) {
      await supabase.from("users").insert({
        id: userId,
        email: email,
        name: fullName,
        account_mode: "PUBLIC",
        friends_list: {},
        friend_req: {},
      });
    }

    return { data, error };
  },

  signIn: async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },
}));
