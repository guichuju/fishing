const GameData = cc.Class({
    extends: cc.Component,

    statics: {
        instance: null,
    },

    properties: {
        score: 0,
        depth: 0,
    },

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});

GameData.instance = new GameData();
module.exports = GameData;