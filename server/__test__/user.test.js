const expect = require('expect');

const { Users } = require('../utils/user')




describe('Users' , ()=>{
    let users;
    beforeEach(()=>{
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Bushjdo',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Phuc',
                room: 'Node Course'
            },
            {
                id: '3',
                name: 'Joker',
                room: 'ReactJS Course'
            },
        ]
    })
    it('should add new user' , ()=>{
        const test_users = new Users();
        const user = {
            id: '123',
            name: 'Joker',
            room: 'The Office fans'
        };
        const resUser = test_users.addUser(user.id , user.name , user.room);
        //console.log(test_users)
        expect(test_users.users).toEqual([user])
    })

    it('should remove user from list' , ()=>{
        const userID = '1'
        const user = users.removeUser(userID);

        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2)
        
    })

    it('should not remove user from list' , ()=>{
        const userID = '99'
        const user = users.removeUser(userID);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3)
        
    })

    it('should find user' , ()=>{
        const userID = '2';
        const user = users.getUser(userID);

        expect(user.id).toBe(userID)
    })

    it('should not find user' , ()=>{
        const userID = '99';
        const user = users.getUser(userID);

        expect(user).toBeFalsy()
    })
    it('should return names for node course' , ()=>{
        const userList = users.getUserList('Node Course');

        expect(userList.length).toBe(2);
        expect(userList).toEqual(['Bushjdo','Phuc'])
    })
    it('should return names for ReactJS Course' , ()=>{
        const userList = users.getUserList('ReactJS Course');

        expect(userList.length).toBe(1);
        expect(userList).toEqual(['Joker'])
    })
})