var db = require('./databaseModel');

exports.insert = function (chatData, success) {
    db.chat.create(chatData).then(function(message){
        if(success){
            success(message);
        }
    });
};

exports.createConversation = function (conversationData, success) {
    db.conversation.create(conversationData).then(function(message){
        if(success){
            success(message);
        }
    });
};

exports.insertConversationMember = function (conversationMemberData, success, error) {
    db.conversationmember.create(conversationMemberData).then(function(conversationMember){
        if(success){
            success(conversationMember);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.getConversationByMember = function (memberId, success, error) {
    db.conversationmember.all({where: {memberId: memberId}}).then(function(conversationMemberList){
        if(success){
            success(conversationMemberList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.getConversation = function (idSender, idReceiver, success, error) {
    var queryString = 'SELECT id, name, isPersonal FROM conversation WHERE isPersonal=1 AND  id in (SELECT a.conversationId FROM conversationmember a, conversationmember b WHERE a.conversationId = b.conversationId AND a.memberId = ' + idSender + ' AND b.memberId = ' + idReceiver + ' group by a.conversationId)';
    db.sequelize.query(queryString).then(function(conversation){
        if(success){
            success(conversation);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.getConversationById = function (conversationId, success, error) {
    db.conversationmember.all({where: {conversationId: conversationId}}).then(function(conversationMemberList){
        if(success){
            success(conversationMemberList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.list = function (conversationId, startTime, success, error) {
    db.chat.findAll({where: {
                        conversationId: conversationId,
                        time: {$lte: startTime}},
                        order: 'time DESC',
                        limit: 40,
                        include: [db.emoticon, db.member]}).then(function(messageList){
        if(success){
            success(messageList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.listMember = function (conversationId, success, error) {
    db.conversationmember.findAll({where: {conversationId: conversationId}}).then(function(chatList){
        if(success){
            success(chatList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.get = function (id, success, error) {
    db.chat.find({where: {id: id}, include: [db.emoticon, db.member, db.conversation]}).then(function(message){
        if(success){
            success(message);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.getConversationInfo = function (id, success, error) {
    db.conversation.find({where: {id: id}}).then(function(message){
        if(success){
            success(message);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};