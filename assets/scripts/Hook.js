const GameData = require("GameData");
const MessageCenter = require("MessageCenter");

cc.Class({
    extends: cc.Component,

    properties: {
        RegainSpeed : 320,
        isRegaining : {
            default : false,
            visible : false
        }
    },

    onLoad () {},

    start () {
        // this.node.runAction(cc.repeatForever(cc.moveBy(5, cc.p(0, -100))));
    },

    startLine() {
        this.node.stopAllActions();
        this.node.runAction(cc.repeatForever(cc.moveBy(4, cc.v2(0, -100))));
        this.isRegaining = false;
    },

    RegainLine() {
        if (this.isRegaining) {
            return;
        }
        this.node.stopAllActions();
        let duration = Math.abs(this.node.y) / this.RegainSpeed;
        if (duration < 5) {
            duration = 5;
        }
        this.node.runAction(
            cc.sequence(
                cc.moveTo(duration, cc.v2(0, 0)).easing(cc.easeSineIn()),
                cc.callFunc(() => {
                    MessageCenter.instance.emit('EndUI-Show');
                })
            )
        );
        this.isRegaining = true;
    },

    update (dt) {
        if (Math.abs(this.node.y) / 100 > GameData.instance.depth) {
            GameData.instance.depth = Math.abs(this.node.y) / 100;
        }
    },
});
