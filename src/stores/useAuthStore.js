import { create } from 'zustand'
import { supabase } from '../lib/supabasePoint'

export const useAuthStore = create((set) => ({
    user: null,
    session: null,
    loading: true,
    initialize: async () => {
        const { data: { session } } = await supabase.auth.getSession()
        set({ session, user: session?.user ?? null, loading: false })

        supabase.auth.onAuthStateChange((_event, session) => {
            set({ session, user: session?.user ?? null })
        })
    },

    signUp: async (email, password, fullName) => {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName }
            }
        })
    },

    signIn: async (email, password) => {
        return await supabase.auth.signInWithPassword({ email, password })
    },

    signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, session: null })
    }
}))
