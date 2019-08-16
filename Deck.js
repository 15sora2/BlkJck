import {Card} from "./card.js"

export class Deck{
     constructor(){
        this.deck = [];

        let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];

        let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine',
                'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three',
                'Two', 'One'];
       
        suits.forEach(suit =>
                values.forEach(value =>
                        this.deck.push(new Card(suit, value))
                ));
        
        //return this.deck;  
            //This was causing problems. Constructors will never return ANY value
        }

        shuffleDeck(){
                let deck = this.deck;
                for (let i = 0; i < deck.length; i++){
                        let swapIdx = Math.trunc(Math.random() * deck.length);
                        let tmp = deck[swapIdx];
                        deck[swapIdx] = deck[i];
                        deck[i] = tmp;
                }
                return this;
        }

        getNextCardFromDeck(){
                return this.deck.shift();
        }
     
}