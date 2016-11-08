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
            res.status(200).json({
                redirectUrl: req.get('referer'),
                msg: '删除成功'
            })
        })  
    })
    .post('/deleteAll', function(req, res, next) {
        sentence.deleteAll(function(err, result) {
            if(err) next(err);
            res.redirect('/daily-english');
        })
    })

module.exports = router;
