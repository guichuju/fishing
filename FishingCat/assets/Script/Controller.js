// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Hook = require("Hook");
var GameData = require("GameData");

cc.Class({
    extends: cc.Component,

    properties: {
        mHook : {
            default : null,
            type : cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onCollisionEnter: function (other , self) {
        other.node.color = cc.Color.RED;
        var pHook = this.mHook.getComponent(Hook);
        pHook.RegainLine();//鱼钩收杆

        other.node.stopAllActions();
        other.node.group = "default";//设置碰撞分组，没必要继续判断和鱼钩的碰撞了
        other.node.parent = this.node;//钓到的鱼挂在鱼钩上
        other.node.setPosition(cc.v2(0,0));
        other.node.runAction(cc.repeatForever(cc.sequence(
            cc.rotateTo(0.5 , -60 * other.node.scaleX),
            cc.rotateTo(0.5 , -30 * other.node.scaleX)
        )));//钓到的鱼挣扎动作

        GameData.instance.score = GameData.instance.score + 10;//每条鱼加10分
    }
});
