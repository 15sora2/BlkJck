export class Card{
    constructor(suit, value){
            this.suit = suit;
            this.value = value;
    }
    getCardString(card){
        return `${card.suit} of ${this.value}`;
    }
}