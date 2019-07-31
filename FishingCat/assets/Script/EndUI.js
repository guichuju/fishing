// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var GameData = require("GameData");
var MessageCenter = require("MessageCenter");

cc.Class({
    extends: cc.Component,

    properties: {
        mScoreLabel : cc.RichText,
        mDepthLabel : cc.RichText
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        MessageCenter.on('EndUI-Show', this.Show.bind(this));
        MessageCenter.on('EndUI-Hide', this.Hide.bind(this));
    },

    start () {
        
    },

    Hide () {
        this.node.position = cc.v2(2000,0);
    },

    Show () {
        this.node.position = cc.v2(0,0);
        this.mScoreLabel.string = "<color=#ffd700>" + GameData.instance.score + "</c>";
        this.mDepthLabel.string = "<color=#00ff00>深度:" + GameData.instance.depth.toFixed(2) + "</c>";
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) return;
        wx.postMessage({
            message :   "UploadGameData",
            score : GameData.instance.score,
            depth : GameData.instance.depth.toFixed(2)
        });
    }

    // update (dt) {},
});
