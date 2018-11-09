const expect = require('expect');

const {generateMessage ,generateLocationMessage} = require('../utils/message');


describe('generateMessage', ()=>{
    it('should generate correct message object' , ()=>{
        const from = 'phuc';
        const text = 'it work for me';

        const response = generateMessage(from ,text);
        expect(typeof response.createdAt).toBe('number');
        expect(response.from).toBe(from);
        expect(response.text).toBe(text);
    })
})

describe('generateLocationMessage' , ()=>{
    it('should generate correct location object',()=>{
        const from = 'Bushjdo';
        const latitude = 15;
        const longtitude = 10;
        const url = 'https://www.google.com/maps?q=15,10'

        const message = generateLocationMessage(from , latitude , longtitude);

        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(typeof message.createdAt).toBe('number')
    })
})