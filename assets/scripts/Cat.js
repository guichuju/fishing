cc.Class({
    extends: cc.Component,

    properties: {
        mHook: cc.Node,
    },

    // onLoad () {},

    start () {

    },

    startAnim () {
        let anim = this.node.getComponent(cc.Animation);
        anim.play('cat');
    },

    onAnimEnd() {
        let pHook = this.mHook.getComponent('Hook');
        pHook.StartLine();
    }

    // update (dt) {},
});
