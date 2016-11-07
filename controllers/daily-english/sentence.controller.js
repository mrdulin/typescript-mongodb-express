var express = require('express'),
    router = express.Router(),
    sentence = require(__base + '/models/daily-english/sentence.model');

router
    .post('/create', function(req, res, next) {
        var enText = req.body.enText,
            cnText = req.body.cnText;

        sentence.create(enText, cnText, function(err, result) {
            if(err) next(err);
            res.redirect('/daily-english');
        })
    })
    .post('/remove', function(req, res, next) {
        var id = req.body.id;
        sentence.remove(id, function(err, result) {
            if(err) next(err);
            console.log(result, req.get('referer'));
            res.redirect('/daily-english');
        })  
    })

module.exports = router;
