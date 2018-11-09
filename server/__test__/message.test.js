const expect = require('expect');

const {generateMessage} = require('../utils/message');


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