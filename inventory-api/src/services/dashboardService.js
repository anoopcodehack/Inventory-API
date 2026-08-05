const supabase = require("../config/supabase");

async function getDashboard() {

    // Products
    const { data: products, error: productError } =
        await supabase
            .from("products")
            .select("*");

    if (productError) throw productError;

    // Categories
    const { data: categories, error: categoryError } =
        await supabase
            .from("categories")
            .select("*");

    if (categoryError) throw categoryError;

    // Transactions
    const { data: transactions, error: transactionError } =
        await supabase
            .from("transactions")
            .select("*");

    if (transactionError) throw transactionError;

    const totalProducts = products.length;

    const totalCategories = categories.length;

    const totalTransactions = transactions.length;

    const lowStock = products.filter(
        p => p.quantity <= p.minimum_stock
    ).length;

    const totalInventoryValue = products.reduce(
        (sum, p) => sum + (p.price * p.quantity),
        0
    );

    return {

        totalProducts,

        totalCategories,

        totalTransactions,

        lowStockProducts: lowStock,

        totalInventoryValue

    };

}

module.exports = {
    getDashboard
};