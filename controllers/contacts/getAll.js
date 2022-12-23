const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            status: "success",
            data: {
                contacts,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getAll;
