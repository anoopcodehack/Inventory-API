const supabase = require("../config/supabase");
const { Parser } = require("json2csv");

async function productsCSV() {

    const { data, error } = await supabase
        .from("products")
        .select("*");

    if (error) throw error;

    const parser = new Parser();

    return parser.parse(data);
}

async function transactionsCSV() {

    const { data, error } = await supabase
        .from("transactions")
        .select("*");

    if (error) throw error;

    const parser = new Parser();

    return parser.parse(data);
}

module.exports = {
    productsCSV,
    transactionsCSV
};