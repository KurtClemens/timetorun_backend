const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

// router.get('/dashboard', (req, res) => {
//     res.send('Dashboard')
// })

//@desc Adding new user
//@route POST /adduser
router.post('/adduser', actions.addNew)

router.put('/addimage', actions.addImage)

//@desc Authenticate a user
//@route POST /authenticate
router.post('/authenticate', actions.authenticate)

//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo)

//@desc Adding new run
//@route POST /addrun
router.post('/addrun', actions.addRun)

//@desc Get all runs
//@route GET /getruns
router.get('/getruns', actions.getAllRuns)

module.exports = router