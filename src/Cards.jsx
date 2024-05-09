import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import './Cards.css';

function Cards() {
    let [card, setCard] = useState(null);
    let [deck, setDeck] = useState(null);

    useEffect(function fetchDeckWhenMounted() {
        async function fetchDeck() {
            const deckResult = await axios.get(
                "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
            );
            setDeck(deckResult);
        }
        fetchDeck();
    }, []);

    async function drawCard() {
        try {
            let cardResult = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`);
            console.log(cardResult.data.remaining);
            if (cardResult.data.remaining === 0) throw new Error("No more cards in deck"); 
            setCard(cardResult);
        }
        catch(err) {
            alert(err);
        }
    }

    async function shuffleDeck() {
        const deckResult = await axios.get(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        setCard(null);
        setDeck(deckResult);
    }

    return (
        <div>
            {deck ? <div> <button onClick={drawCard}>Draw a card</button> <button onClick={shuffleDeck}>Shuffle Deck</button> </div>: <i>(loading)</i>}
            {card ? <img src={card.data.cards[0].image}/> : <p></p>}
        </div>
    )
} 

export default Cards