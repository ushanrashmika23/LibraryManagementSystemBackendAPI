const member = require('./../model/member.model');

const getAllMembers = async (req, res) => { }
const getMemberById = async (req, res) => {
    try {
        const memberId = req.params.id;
        const memberData = await member.findById(memberId).populate('borrowed_books');
        if (!memberData) {
            return res.status(404).json({ code: 404, message: "Member not found", data: null });
        }
        return res.status(200).json({ code: 200, message: "Member retrieved successfully", data: memberData });
    } catch (err) {
        console.error('Error retrieving member:', err);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: err.message });
    }
}
const createMember = async (req, res) => {
    try {
        const { name, email, phone, address, membership_id } = req.body;
        if (!name || !email || !phone || !address) {
            return res.status(400).json({
                code: 400,
                message: "Bad Request",
                data: "Name, Email, Phone, Address, and Membership ID fields are required"
            });
        }

        const members = await member.find();
        const newMember = await member.create({
            name,
            email,
            phone,
            address,
            membership_id: `M${members.length + 1}`,
            is_active: req.body.is_active || false,
            is_verified: req.body.is_verified || false
        });

        return res.status(201).json({ code: 201, message: "Member created successfully", data: newMember });
    } catch (error) {
        console.error('Error creating member:', error);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: error.message });
    }
}
const updateMember = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.address || !req.body.membership_id) {
        return res.status(400).json({ code: 400, message: "Bad Request", data: "Name, Email, Phone, Address, and Membership ID fields are required" });
    }

    try {
        const updatedMember = await member.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMember) {
            return res.status(404).json({ code: 404, message: "Member not found", data: null });
        }
        return res.status(200).json({ code: 200, message: "Member updated successfully", data: updatedMember });
    } catch (err) {
        console.error('Error updating member:', err);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: err.message });
    }
}
const deleteMember = async (req, res) => {
    try {
        const deletedMember = await member.findByIdAndDelete(req.params.id);
        if (!deletedMember) {
            return res.status(404).json({ code: 404, message: "Member not found", data: null });
        }
        return res.status(200).json({ code: 200, message: "Member deleted successfully", data: deletedMember });
    } catch (err) {
        console.error('Error deleting member:', err);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: err.message });
    }
}
const searchMember = async (req, res) => {
    const { name, email, phone, id, page = 1, limit = 10 } = req.query;
    const query = {};

    if (id) {
        query._id = id;
    }
    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }
    if (email) {
        query.email = { $regex: email, $options: 'i' };
    }
    if (phone) {
        query.phone = { $regex: phone, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    try {
        const members = await member.find(query).skip(skip).limit(parseInt(limit));
        const total = await member.countDocuments(query);
        return res.status(200).json({
            code: 200,
            message: "Members fetched successfully",
            data: members,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        console.error('Error searching members:', err);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: err.message });
    }
}

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    searchMember
};