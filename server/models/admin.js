const mongoose = require("mongoose");
const { eventSchema } = require("./event");

const adminSchema = new mongoose.Schema(
    {
        admin_id: {
            type: String,
            required: true,  // Fixed the typo here
        },
        email: {
            type: String,
            unique: true,
        },
        pass: {
            type: String,
        },
        name: {
            type: String,
        },
        eventCreated: [],

        expireAt: {
            type: Date,
            default: Date.now,
            index: { expires: "2592000s" },
        },
    },
    { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

const test_credential = new Admin({
    admin_id: "hqwkufywealufyewf.weiugbfre654wegreg",
    email: "invite.testing@gmail.com",
    name: "test",
    pass: "invite123",
});

// Find an admin by admin_id
Admin.find({ admin_id: "hqwkufywealufyewf.weiugbfre654wegreg" }, async function (err, docs) {
    if (err) {
        console.error("Error finding admin:", err);
        return;  // Exit early on error
    }
    
    if (docs.length === 0) {
        // Save new admin credentials if none found
        test_credential.save((error, success) => {
            if (error) console.log("Error saving test credentials:", error);
            else
                console.log("Saved::Admin::test credentials", test_credential);
        });
    }
});

module.exports = Admin;
