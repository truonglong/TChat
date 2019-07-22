var Sequelize = require('../node_modules/sequelize');
var sequelize = new Sequelize('tchat_long2', 'root', '123456', {
    host: '192.168.17.23',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var chat = sequelize.define("chat", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: Sequelize.TEXT,
    time: Sequelize.BIGINT
}, {
    timestamps: false,
    tableName: 'chat'
});

var conversation = sequelize.define("conversation", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    isPersonal: Sequelize.BOOLEAN
}, {
    timestamps: false,
    tableName: 'conversation'
});

var conversationmember = sequelize.define("conversationmember", {

}, {
    timestamps: false,
    tableName: 'conversationmember'
});

var emoticon = sequelize.define("emoticon", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'emoticon'
});

var emoticongroup = sequelize.define("emoticongroup", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(45),
    type: Sequelize.BOOLEAN
}, {
    timestamps: false,
    tableName: 'emoticongroup'
});

var emoticonmember = sequelize.define("emoticonmember", {

}, {
    timestamps: false,
    tableName: 'emoticonmember'
});

var feedback = sequelize.define("feedback", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: Sequelize.TEXT
}, {
    timestamps: false,
    tableName: 'feedback'
});

var group = sequelize.define("group", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'group'
});

var groupmember = sequelize.define("groupmember", {

}, {
    timestamps: false,
    tableName: 'groupmember'
});

var member = sequelize.define("member", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    dateOfBirth: Sequelize.BIGINT,
    username: Sequelize.STRING(45),
    avatar: Sequelize.STRING,
    status: Sequelize.BOOLEAN
}, {
    timestamps: false,
    tableName: 'member'
});

var memberreadtime = sequelize.define("memberreadtime", {
    lastReadMessageTime: Sequelize.BIGINT
}, {
    timestamps: false,
    tableName: 'memberreadtime'
});

var message = sequelize.define("message", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    time: Sequelize.BIGINT,
    body: Sequelize.TEXT,
    attachment: Sequelize.STRING,
    attachmentFileName: Sequelize.STRING,
}, {
    timestamps: false,
    tableName: 'message'
});

var messagereply = sequelize.define("messagereply", {
    messageId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    time: Sequelize.BIGINT,
    body: Sequelize.TEXT,
    attachment: Sequelize.STRING,
    attachmentFileName: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'messagereply'
});

var messagetype = sequelize.define("messagetype", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'messagetype'
});

var notification = sequelize.define("notification", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: Sequelize.TEXT
}, {
    timestamps: false,
    tableName: 'notification'
});

var notificationmember = sequelize.define("notificationmember", {
}, {
    timestamps: false,
    tableName: 'notificationmember'
});

var position = sequelize.define("position", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'position'
});

var positionrole = sequelize.define("positionrole", {
}, {
    timestamps: false,
    tableName: 'positionrole'
});

var project = sequelize.define("project", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    startDate: Sequelize.BIGINT,
    endDate: Sequelize.BIGINT
}, {
    timestamps: false,
    tableName: 'project'
});

var projectmember = sequelize.define("projectmember", {
}, {
    timestamps: false,
    tableName: 'projectmember'
});

var role = sequelize.define("role", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'role'
});

var room = sequelize.define("room", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    lastMessageTime: Sequelize.BIGINT,
    priority: Sequelize.INTEGER,
    isAnonymous: Sequelize.BOOLEAN
}, {
    timestamps: false,
    tableName: 'room'
});

var roommember = sequelize.define("roommember", {
    isAdmin: Sequelize.BOOLEAN,
    isNotify: Sequelize.BOOLEAN,
    isVisible: Sequelize.BOOLEAN,
    note: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'roommember'
});

var user = sequelize.define("user", {
    username: {
        type: Sequelize.STRING(45),
        primaryKey: true,
    },
    password: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'user'
});

//user.hasOne(member);

chat.belongsTo(emoticon);emoticon.hasMany(chat);
chat.belongsTo(messagetype);messagetype.hasMany(chat);
chat.belongsTo(conversation);conversation.hasMany(chat);
chat.belongsTo(member);member.hasMany(chat);

conversation.belongsToMany(member, { through: conversationmember });
member.belongsToMany(conversation, { through: conversationmember });

emoticon.belongsTo(emoticongroup);emoticongroup.hasMany(emoticon);

emoticongroup.belongsTo(member);member.hasMany(emoticongroup);

emoticon.belongsToMany(member, { through: emoticonmember });
member.belongsToMany(emoticon, { through: emoticonmember });

// group

group.belongsToMany(member, { through: groupmember });
member.belongsToMany(group, { through: groupmember });

message.belongsTo(emoticon);emoticon.hasMany(message);
message.belongsTo(messagetype);messagetype.hasMany(message);
message.belongsTo(room);room.hasMany(message);
message.belongsTo(member);member.hasMany(message);
message.hasOne(messagereply);

messagereply.belongsTo(emoticon);emoticon.hasMany(messagereply);
messagereply.belongsTo(messagetype);messagetype.hasMany(messagereply);
messagereply.belongsTo(room);room.hasMany(messagereply);
messagereply.belongsTo(member);member.hasMany(messagereply);
messagereply.belongsTo(message);

notification.belongsTo(member);member.hasMany(notification);

position.belongsToMany(role, { through: positionrole });
role.belongsToMany(position, { through: positionrole });

project.belongsToMany(member, { through: projectmember });
member.belongsToMany(project, { through: projectmember });

room.belongsToMany(member, { through: roommember });
member.belongsToMany(room, { through: roommember });

member.belongsTo(position);position.hasMany(member);

sequelize.sync().done(function() {
  // this is where we continue ...
});

exports.chat = chat;
exports.conversation = conversation;
exports.conversationmember = conversationmember;
exports.emoticon = emoticon;
exports.emoticongroup = emoticongroup;
exports.emoticonmember = emoticonmember;
exports.feedback = feedback;
exports.group = group;
exports.groupmember = groupmember;
exports.member = member;
exports.memberreadtime = memberreadtime;
exports.message = message;
exports.messagereply = messagereply;
exports.messagetype = messagetype;
exports.notification = notification;
exports.notificationmember = notificationmember;
exports.position = position;
exports.positionrole = positionrole;
exports.project = project;
exports.projectmember = projectmember;
exports.role = role;
exports.room = room;
exports.roommember = roommember;
exports.user = user;
exports.sequelize = sequelize;