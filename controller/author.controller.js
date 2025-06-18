const { get } = require('mongoose');
const author = require('./../model/author.model');

const getAllAuthors = async (req, res) => {
    try {
        const authors = await author.find();
        return res.status(200).json({ code: 200, message: "Authors retrieved successfully", data: authors });
    } catch (error) {
        console.error('Error retrieving authors:', error);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: error.message });
    }
}
const getAuthorById = async (req, res) => {
    try {
        const authorData = await author.findById(req.params.id);
        if (!authorData) {
            return res.status(404).json({ code: 404, message: "Author not found", data: null });
        }
        return res.status(200).json({ code: 200, message: "Author retrieved successfully", data: authorData });
    } catch (error) {
        console.error('Error retrieving author:', error);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: error.message });
    }
}
const createAuthor = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ code: 400, message: "Bad Request", data: "Name field is required" });
    }
    try {
        const newAuthor = await author.create({
            name: req.body.name,
            bio: req.body.bio || '',
            birth_date: req.body.birth_date || null,
            nationality: req.body.nationality || ''
        });
        newAuthor.save();
        return res.status(201).json({ code: 201, message: "Author created successfully", data: newAuthor });
    } catch (err) {
        console.error('Error creating author:', err);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: err.message });
    }
}
const updateAuthor = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ code: 400, message: "Bad Request", data: "Name field is required" });
    }
    try {
        const updatedAuthor = await author.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            bio: req.body.bio || '',
            birth_date: req.body.birth_date || null,
            nationality: req.body.nationality || ''
        }, { new: true });
        if (!updatedAuthor) {
            return res.status(404).json({ code: 404, message: "Author not found", data: null });
        }
        return res.status(200).json({ code: 200, message: "Author updated successfully", data: updatedAuthor });
    } catch (err) {
        console.error('Error updating author:', err);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: err.message });
    }
}
const deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) {
            return res.status(404).json({ code: 404, message: "Author not found", data: null });
        }
        return res.status(200).json({ code: 200, message: "Author deleted successfully", data: deletedAuthor });
    } catch (err) {
        console.error('Error deleting author:', err);
        return res.status(500).json({ code: 500, message: "Internal Server Error", data: err.message });
    }
}
const getAuthorByName = async (req, res) => { }

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthorByName
};