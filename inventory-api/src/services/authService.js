const supabase = require("../config/supabase");

async function register(full_name, email, password) {
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (error) throw error;

    // Insert into public.users
    const { data: profile, error: profileError } = await supabase
        .from("users")
        .insert({
            id: data.user.id,
            full_name,
            email,
            role: "STAFF",
            is_active: true,
        })
        .select()
        .single();

    if (profileError) throw profileError;

    return profile;
}

async function login(email, password) {
    // Login using Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;

    console.log("=================================");
    console.log("AUTH USER ID:", data.user.id);
    console.log("AUTH EMAIL:", data.user.email);

    // Fetch user from public.users
    const { data: users, error: dbError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id);

    console.log("PUBLIC USERS:", users);
    console.log("DB ERROR:", dbError);
    console.log("=================================");

    if (dbError) throw dbError;

    if (!users || users.length === 0) {
        throw new Error("User not found in public.users");
    }

    return {
        session: data.session,
        user: users[0],
    };
}

module.exports = {
    register,
    login,
};