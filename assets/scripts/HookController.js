const GameData = require("GameData");

cc.Class({
    extends: cc.Component,

    properties: {
        mSpeed: 350,
        mMoveToPos: {
            default: cc.v2(0, 0),
            visible: false
        },
        mIsMoving: {
            default: false,
            visible: false
        },
        mEnableTouch: {
            default: false,
            visible: false
        },
        mCanvas: {
            default: null,
            type: cc.Node,
        },
        mHook: {
            default: null,
            type: cc.Node,
        }
    },

    enableTouch() {
        if (this.mEnableTouch) {
            return;
        }
        this.mCanvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.mCanvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.mCanvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.mCanvas.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.mEnableTouch = true;
    },

    disableTouch() {
        if (!this.mEnableTouch) {
            return;
        }
        this.mCanvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.mCanvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.mCanvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.mCanvas.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.mEnableTouch = false;
    },

    onTouchStart(event) {
        let touches = event.getTouches();
        let touchLoc = touches[0].getLocation();
        this.mIsMoving = true;
        this.mNoveToPos = this.node.parent.convertToNodeSpaceAR(touchLoc);
    },

    onTouchMove(event) {
        var touches = event.getTouches();
        var touchLoc = touches[0].getLocation();
        this.mMoveToPos = this.node.parent.convertToNodeSpaceAR(touchLoc);
    },

    onTouchEnd(event) {
        this.mIsMoving = false;
    },

    onCollisionEnter(other, mime) {
        other.node.color = cc.Color.RED;
        let pHook = this.mHook.getComponent("Hook");
        pHook.RegainLine();
        other.node.stopAllActions();
        other.node.group = "default";
        other.node.parent = this.node;
        other.node.setPosition(cc.v2(0, 0));
        other.node.runAction(cc.repeatForever(cc.sequence(
            cc.rotateTo(0.5, -60 * other.node.scaleX),
            cc.rotateTo(0.5, -30 * other.node.scaleX),
        )));
        GameData.instance.score += 10;
    },

    // onLoad () {},

    start() {
        this.enableTouch();
    },

    update (dt) {
        if (!this.mIsMoving) {
            return;
        }
        let oldPos = this.node.position;
        let direction = this.mMoveToPos.sub(oldPos).normalize();
        direction.y = 0;
        let newPos = oldPos.add(direction.mul(this.mSpeed * dt));
        this.node.setPosition(newPos);
    },
});