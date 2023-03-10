const express = require('express');
const router = express.Router();

router.get('/getEntries', function(req, resp) {
    resp.status(200).send({entries: ["entry1", "entry2", "entry3", "entry4"]});
});

module.exports = router;
