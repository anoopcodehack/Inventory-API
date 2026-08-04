const supabase = require("../config/supabase");

// ==============================
// CREATE PRODUCT
// ==============================
async function create(productData) {
    const { data, error } = await supabase
        .from("products")
        .insert([productData])
        .select()
        .single();

    if (error) throw error;

    return data;
}

// ==============================
// GET ALL PRODUCTS
// ==============================
async function getAll(query) {
    let request = supabase
        .from("products")
        .select(`
            *,
            categories(name)
        `);

    // Search by product name
    if (query.search) {
        request = request.ilike("name", `%${query.search}%`);
    }

    // Filter by category
    if (query.category_id) {
        request = request.eq("category_id", query.category_id);
    }

    // Pagination
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    request = request.range(from, to);

    const { data, error } = await request.order("created_at", {
        ascending: false,
    });

    if (error) throw error;

    return data;
}

// ==============================
// GET PRODUCT BY ID
// ==============================
async function getById(id) {
    const { data, error } = await supabase
        .from("products")
        .select(`
            *,
            categories(name)
        `)
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}

// ==============================
// UPDATE PRODUCT
// ==============================
async function update(id, productData) {
    const { data, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

// ==============================
// DELETE PRODUCT
// ==============================
async function remove(id) {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) throw error;

    return true;
}

// ==============================
// LOW STOCK PRODUCTS
// ==============================
async function getLowStock() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .filter("quantity", "lte", "minimum_stock");

    if (error) throw error;

    return data;
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    getLowStock,
};