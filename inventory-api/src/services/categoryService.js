const supabase = require("../config/supabase");

// ==============================
// CREATE CATEGORY
// ==============================
async function create(categoryData) {

    const { data, error } = await supabase
        .from("categories")
        .insert([categoryData])
        .select()
        .single();

    if (error) throw error;

    return data;
}

// ==============================
// GET ALL CATEGORIES
// ==============================
async function getAll() {

    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
}

// ==============================
// GET CATEGORY BY ID
// ==============================
async function getById(id) {

    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}

// ==============================
// UPDATE CATEGORY
// ==============================
async function update(id, body) {

    const { data, error } = await supabase
        .from("categories")
        .update(body)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

// ==============================
// DELETE CATEGORY
// ==============================
async function remove(id) {

    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

    if (error) throw error;

    return true;
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};