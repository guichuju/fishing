cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {},

    start () {
        this.node.runAction(cc.repeatForever(cc.moveBy(5, cc.p(0, -100))));
    },

    update (dt) {},
});
