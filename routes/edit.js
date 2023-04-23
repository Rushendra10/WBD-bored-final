const path = require("path");
const express = require("express");
const router = express.Router();

const {editUser} = require('../controllers/userActions');


    

router.get("/edit", (req, res) =>{

    if (req.session.loggeduser==undefined){

        res.redirect("/login");
    }

    else {
        res.render("edit", {user: req.session.loggeduser});
   
    }
});

/**
 * @swagger
 * /edit:
 *   post:
 *     summary: This will will send the new details of the users that will replace the old details
 *     responses:
 *       200:
 *         description: The user informations has been updated
 *         content:
 *           application/json:
 *             schema:  
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.post("/edit", editUser);

module.exports = router;