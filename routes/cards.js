const express = require('express');
const router = express.Router();
const data = require('../data/flashcarddata.json').data;
const cards = data.cards;

router.get('/', (req, res) => {
    const randomNumber = Math.floor(Math.random() * cards.length);
    res.redirect(`/cards/${randomNumber}`);
});



router.get('/:id', (req, res) => {
    const side = req.query.side;
    const id = req.params.id;

    if (!side) {
        res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const hint = cards[id].hint;

    const templateData = { id, text, name};

    if (side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }

    res.render('card', templateData);
});

module.exports = router;