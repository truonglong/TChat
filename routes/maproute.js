exports.mapRoute = function (app) {
    
    var room = require('../controllers/room');
    app.get('/room/list', room.list);
    app.post('/room', room.update);
    app.post('/room/setting', room.updateSetting);
    app.post('/room/add', room.add);
    app.post('/room/delete/:id', room.delete);
    
    var member = require('../controllers/member');
    app.get('/member/list/:id', member.list);
    app.get('/member/listall', member.listall);
    app.get('/member', member.get);
    app.post('/member/update', member.update);
    
    var message = require('../controllers/message');
    app.get('/message/list/:id/:time', message.list);
    app.post('/message', message.insert);
    app.put('/message/update', message.update);
    app.put('/message/delete', message.cdelete);
    
    var chat = require('../controllers/chat');
    app.get('/chat/list/:conversationId/:time', chat.list);
    app.get('/chat/conversation/:idReceiver', chat.conversation);
    app.get('/chat/conversation/info/:id', chat.getConversation);
    app.post('/chat', chat.insert);
    
    var emoticon = require('../controllers/emoticon');
    app.get('/emoticon/:groupId', emoticon.list);
    app.get('/emoticongroup', emoticon.groupList);

    var notification = require('../controllers/notification');
    app.get('/notification', notification.get);
    app.post('/notification/add', notification.add);
    
    var session = require('../controllers/session');
    app.delete('/logout', session.logout);

    //========== APIs ===========
    // login
    var session = require('../controllers/session');
    app.post('/api/login', session.loginApi);
    app.delete('/api/logout', session.logout);
    app.get('/api/room/list', room.listApi);
    app.get('/api/member/list/:id', member.listApi);
    app.get('/api/message/list/:id/:time', message.list);

};