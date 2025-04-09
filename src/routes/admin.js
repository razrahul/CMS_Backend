const express = require('express');
const {getAllRoles, getAllRolesActive, getAllCompaanys, getAllCompaanysActive, updateCompaanysActivity, updateROleActivity} = require('../controller/admin/adminController');

const router = express.Router();

router.get('/roles', getAllRoles);
router.get('/roles-active', getAllRolesActive);
router.get('/companies', getAllCompaanys);
router.get('/companies-active', getAllCompaanysActive);
router.put('/roles/:id', updateROleActivity);
router.put('/companies/:id', updateCompaanysActivity);

module.exports = router;