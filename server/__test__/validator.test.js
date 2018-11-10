const expect = require('expect');
const { isRealString } = require('../utils/validation');


describe('isRealString' , ()=>{
    it('should validate' , ()=>{
        const str = 'hello my name is Joker';
        const result = isRealString(str);

        expect(result).toBe(true);
    })

    it('should not validate when get string with only spaces' , ()=>{
        const str = '  ';
        const result = isRealString(str);

        expect(result).toBe(false)
    })

    it('should not validate when get non-string values' , ()=>{
        const str = 123;
        const result = isRealString(str);

        expect(result).toBe(false)
    })
})