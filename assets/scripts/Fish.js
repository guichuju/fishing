cc.Class({
    extends: cc.Component,

    properties: {
        mSpeed: {
            default: 1,
            type: cc.Float,
            tooltip: "鱼的速度,默认正常速度为1，最小值为0.1，最大值为10",
            min: 0.1,
        }
    },

    // onLoad () {},

    start () {
        let x = this.node.x;
        let duration = 5 - (this.node.x + 320) / 640 * 5;
        let sqeAction = cc.sequence(
            cc.moveTo(duration, cc.v2(320, this.node.y)),
            cc.flipX(true),
            cc.moveTo(duration, cc.v2(x, this.node.y)),
            cc.moveTo(5 - duration, cc.v2(-320, this.node.y)),
            cc.flipX(false),
            cc.moveTo(5 - duration, cc.v2(x, this.node.y)),
        );
        let action = cc.speed(cc.repeatForever(sqeAction), this.mSpeed);
        this.node.runAction(action);
    },

    // update (dt) {},
});
