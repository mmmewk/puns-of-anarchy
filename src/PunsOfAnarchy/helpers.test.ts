import { dealHands, discard, draw, drawFrom, generatePlayerIds, generatePlayerMap } from "./helpers";

describe('generatePlayerIds', () => {
    it('Returns an empty array when asked for 0 players', () => {
        expect(generatePlayerIds(0)).toEqual([]);
    });

    it('Returns a string array with a value for every player ID', () => {
        expect(generatePlayerIds(3)).toEqual(['0','1','2']);
    });
});

describe('generatePlayerMap', () => {
    it('Returns an empty hash when supplied 0 players', () => {
        expect(generatePlayerMap(0, (id) => id)).toEqual({});
    });

    it('Runs the generator function for each player', () => {
        expect(generatePlayerMap(3, (id) => Number(id) * 2)).toEqual({ '0': 0, '1': 2, '2': 4 });
    });
});

describe('drawFrom', () => {
    it('Draws the top card from the deck', () => {
        const cards = { deck: ['1','2','3'], discard: [] };

        expect(drawFrom(cards)).toEqual('1');
        expect(cards.deck).toEqual(['2','3']);
    });

    it('Shuffles the discard into the deck if the deck is empty', () => {
        const cards = { deck: [], discard: ['1','2','3'] };

        expect(drawFrom(cards)).toBeTruthy();
        expect(cards.deck.length).toEqual(2);
        expect(cards.discard.length).toEqual(0);
    });

    it('Returns undefined if the deck and discard are both empty', () => {
        expect(drawFrom({ deck: [], discard: [] })).toBeUndefined();
    });

    it('Can be used repeatedly to draw different cards', () => {
        const cards = { deck: ['3','2'], discard: ['1'] };
        
        expect(drawFrom(cards)).toEqual('3');
        expect(drawFrom(cards)).toEqual('2');
        expect(drawFrom(cards)).toEqual('1');
        expect(drawFrom(cards)).toBeUndefined();
        expect(cards).toEqual({ deck: [], discard: [] });
    });
});

describe('draw', () => {
    it('Does nothing if the hand is full', () => {
        const hand = ['1','2','3'];
        const cards = { deck: ['4','5','6'], discard: [] };

        draw(hand, cards);

        expect(hand).toEqual(['1','2','3']);
        expect(cards).toEqual({ deck: ['4','5','6'], discard: [] });
    });

    it('Does nothing if cards are empty', () => {
        const hand = ['1','2'];
        const cards = { deck: [], discard: [] };

        draw(hand, cards);

        expect(hand).toEqual(['1','2']);
        expect(cards).toEqual({ deck: [], discard: [] });
    });

    it('Draws the top card off the deck', () => {
        const hand = ['1','2'];
        const cards = { deck: ['3','4'], discard: [] };

        draw(hand, cards);

        expect(hand).toEqual(['1','2','3']);
        expect(cards).toEqual({ deck: ['4'], discard: [] });
    });

    it('Shuffles the discard into the deck then draws it', () => {
        const hand = ['1','2'];
        const cards = { deck: [], discard: ['3'] };

        draw(hand, cards);

        expect(hand).toEqual(['1','2','3']);
        expect(cards).toEqual({ deck: [], discard: [] });
    });

    it('Can be used repeatedly to draw different cards', () => {
        const hand : string[] = [];
        const cards = { deck: ['1','2'], discard: ['3'] };

        draw(hand, cards);

        expect(hand).toEqual(['1']);
        expect(cards).toEqual({ deck: ['2'], discard: ['3'] });

        draw(hand, cards);

        expect(hand).toEqual(['1','2']);
        expect(cards).toEqual({ deck: [], discard: ['3'] });

        draw(hand, cards);

        expect(hand).toEqual(['1','2','3']);
        expect(cards).toEqual({ deck: [], discard: [] });
    });
});

describe('dealHands', () => {
    it('deals in a circle until all players have a full hand', () => {
        const cards = { deck: '123456789'.split(''), discard: [] };
        const hands = dealHands(3, cards);
        expect(hands).toEqual({
            '0': ['1','4','7'],
            '1': ['2', '5', '8'],
            '2': ['3', '6', '9'],
        });
    });

    it('stops dealing when the deck runs out of cards', () => {
        const cards = { deck: '1234567'.split(''), discard: [] };
        const hands = dealHands(3, cards);
        expect(hands).toEqual({
            '0': ['1','4','7'],
            '1': ['2', '5'],
            '2': ['3', '6'],
        });
    });

    it('refreshes the deck from the discard pile', () => {
        const cards = { deck: '1234567'.split(''), discard: ['8'] };
        const hands = dealHands(3, cards);
        expect(hands).toEqual({
            '0': ['1','4','7'],
            '1': ['2', '5', '8'],
            '2': ['3', '6'],
        });
    });
})

describe('discard', () => {
    it('discards an entire hand into a discard pile', () => {
        const hand = ['1','2','3'];
        const cards = { deck: ['4', '5'], discard: ['6', '7'] };
        discard(hand, cards);

        expect(hand.length).toEqual(0);
        expect(cards).toEqual({ deck: ['4', '5'], discard: ['6', '7','3','2','1'] })
    });
});