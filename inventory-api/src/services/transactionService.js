const supabase = require("../config/supabase");

// ====================================
// STOCK IN
// ====================================
async function stockIn(body) {
    const { product_id, quantity, notes } = body;

    if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
    }

    // Get product
    const { data: product, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", product_id)
        .single();

    if (productError) throw productError;

    const newQuantity = product.quantity + quantity;

    // Update product quantity
    const { error: updateError } = await supabase
        .from("products")
        .update({
            quantity: newQuantity
        })
        .eq("id", product_id);

    if (updateError) throw updateError;

    // Create transaction
    const { data, error } = await supabase
        .from("transactions")
        .insert({
            product_id,
            type: "IN",
            quantity,
            notes
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}

// ====================================
// STOCK OUT
// ====================================
async function stockOut(body) {
    const { product_id, quantity, notes } = body;

    if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
    }

    const { data: product, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", product_id)
        .single();

    if (productError) throw productError;

    if (product.quantity < quantity) {
        throw new Error("Insufficient stock");
    }

    const newQuantity = product.quantity - quantity;

    const { error: updateError } = await supabase
        .from("products")
        .update({
            quantity: newQuantity
        })
        .eq("id", product_id);

    if (updateError) throw updateError;

    const { data, error } = await supabase
        .from("transactions")
        .insert({
            product_id,
            type: "OUT",
            quantity,
            notes
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}

// ====================================
// GET ALL TRANSACTIONS
// ====================================
async function getAll() {
    const { data, error } = await supabase
        .from("transactions")
        .select(`
            *,
            products(name, sku)
        `)
        .order("created_at", {
            ascending: false
        });

    if (error) throw error;

    return data;
}

// ====================================
// GET TRANSACTION BY ID
// ====================================
async function getById(id) {
    const { data, error } = await supabase
        .from("transactions")
        .select(`
            *,
            products(name, sku)
        `)
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}

module.exports = {
    stockIn,
    stockOut,
    getAll,
    getById
};