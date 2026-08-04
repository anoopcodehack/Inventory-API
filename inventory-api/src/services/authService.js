const supabase = require("../config/supabase");

async function register(full_name, email, password) {
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (error) throw error;

    // Insert profile
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert({
            id: data.user.id,
            full_name,
            role: "staff",
        })
        .select()
        .single();

    if (profileError) {
        console.error("PROFILE ERROR:", profileError);
        throw profileError;
    }

    return {
        user: data.user,
        profile,
    };
}

async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;

    return data;
}

module.exports = {
    register,
    login,
};