const express = require('express');
const MemberController = require('./../controller/member.controller');

const router = express.Router();

router.post('/new-member', MemberController.createMember);
// router.get('/all-members', MemberController.getAllMembers);
router.get('/member/:id', MemberController.getMemberById);
router.put('/update-member/:id', MemberController.updateMember);
router.delete('/delete-member/:id', MemberController.deleteMember);
router.get('/search-member', MemberController.searchMember);


module.exports = router;