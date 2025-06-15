const { get } = require('mongoose');
const author = require('./../model/author.model');

const getAllAuthors = async (req, res) => {}
const getAuthorById = async (req, res) => {}
const createAuthor=async(req, res) => {}
const updateAuthor = async (req, res) => {}
const deleteAuthor = async (req, res) => {}
const getAuthorByName = async (req, res) => {}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthorByName
    };