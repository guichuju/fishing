const GameData = require("GameData");
const MessageCenter = require("MessageCenter");

cc.Class({
    extends: cc.Component,

    properties: {
        mScoreLabel: cc.RichText,
        mDepthLabel: cc.RichText,
    },

    onLoad() {
        MessageCenter.instance.on('EndUI-Show', this.Show.bind(this));
        MessageCenter.instance.on('EndUI-Hide', this.Hide.bind(this));
    },

    start() {
    },

    Show() {
        this.node.position = cc.v2(0, 0);
        this.mScoreLabel.string = "<color=#ffd700>" + GameData.instance.score + "</c>";
        this.mDepthLabel.string = "<color=#00ff00>深度:" + GameData.instance.depth.toFixed(2) + "</c>";
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
            return;
        }
        // wx.postMessage({
        //     message: "UploadGameData",
        //     score: GameData.instance.score,
        //     depth: GameData.instance.depth.toFixed(2),
        // });
    },

    Hide() {
        this.node.position = cc.v2(2000, 0);
    }

    // update (dt) {},
});
