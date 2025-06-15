const loan = require('./../model/loan.model');

const getAllLoans = async (req, res) => {}
const getLoanById = async (req, res) => {}
const createLoan = async (req, res) => {}
const updateLoan = async (req, res) => {}
const deleteLoan = async (req, res) => {}
const getLoanByUserId = async (req, res) => {}
const getLoanByBookId = async (req, res) => {}
const getLoanByStatus = async (req, res) => {}
module.exports = {
    getAllLoans,
    getLoanById,
    createLoan,
    updateLoan,
    deleteLoan,
    getLoanByUserId,
    getLoanByBookId,
    getLoanByStatus
};