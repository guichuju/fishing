cc.Class({
    extends: cc.Component,

    properties: {
    },

    Hide() {
        this.node.active = false;
    },

    Show() {
        this.node.active = true;
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
