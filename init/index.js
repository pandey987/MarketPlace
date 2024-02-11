const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(res => {
        console.log("connection successful");
    })
    .catch(err => {
        console.log(err)
    });
async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    await mongoose.connect('mongodb+srv://pandeyprakash:X8BivFORm9RlLdhP@cluster0.k9tzurn.mongodb.net/?retryWrites=true&w=majority');
}

const initDB = async () =>{
    await Listing.deleteMany({});
    // initdata.data = initdata.data.map((obj) =>({...obj, owner :'65c6252ebee85a531d55685c',}) );
    // await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}

initDB();