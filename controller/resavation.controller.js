const resavation = require('./../model/resavation.model');
const member = require('./../model/member.model');
const book = require('./../model/book.model');

const getAllResavations = async (req, res) => { }
const getResavationById = async (req, res) => { }
const createResavation = async (req, res) => {
    const { userId, bookId, status } = req.body;
    if (!userId || !bookId || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const memebrData = await member.findById(userId);
        if (!memebrData) {
            return res.status(404).json({ message: 'Member not found' });
        }
        const bookData = await book.findById(bookId);
        if (!bookData) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (bookData.status !== 'Reserved') {
            return res.status(400).json({ message: 'Book is not available for reservation' });
        }
        if (memebrData.reservation >= 1) {
            return res.status(400).json({ message: 'Member has reached the maximum reservation limit' });
        }
        const newResavation = new resavation({
            userId,
            bookId,
            status
        });
        await newResavation.save();
        res.status(201).json(newResavation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating resavation', error });
    }
}
const updateResavation = async (req, res) => { }
const deleteResavation = async (req, res) => {
    const resavationId = req.params.id;
    try {
        const resavationData = await resavation.findByIdAndDelete(resavationId);
        if (!resavationData) {
            return res.status(404).json({ message: 'Resavation not found' });
        }
        res.status(200).json({ message: 'Resavation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resavation', error });
    }
}
const searchResevation = async (req, res) => {
    const { userId, bookId, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (userId) {
        query.userId = userId;
    }
    if (bookId) {
        query.bookId = bookId;
    }
    if (status) {
        query.status = status;
    }

    try {
        const resavations = await resavation.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate('userId', 'name email')
            .populate('bookId', 'title author');

        const totalCount = await resavation.countDocuments(query);
        res.status(200).json({
            code: 200,
            message: "Resavations retrieved successfully",
            data: resavations,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        });
    } catch (error) {
        console.error('Error searching resavations:', error);
        res.status(500).json({ code: 500, message: "Internal Server Error", data: error.message });
    }
}

module.exports = {
    getAllResavations,
    getResavationById,
    createResavation,
    updateResavation,
    deleteResavation,
    searchResevation
};