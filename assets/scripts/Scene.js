const GameData = require('GameData');

cc.Class({
    extends: cc.Component,

    properties: {
        mPrefab: {
            default: null,
            type: cc.Prefab,
        },
        mFishPool: {
            default: null,
            type: cc.Node,
        },
        mHook: {
            default: null,
            type: cc.Node,
        },
        mDepth: {
            default: 0,
            type: cc.Float,
            visible: false,
        },
        mSceneData: {
            default: null,
            type: cc.JsonAsset,
        },
        mIndex: {
            default: 0,
            visible: false,
        },
        mController: {
            default: null,
            type: cc.Node,
        }
    },

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDrawBoundingBox = true;
        manager.enabledDebugDraw = true;
        let a = manager;
    },

    start () {

    },

    update (dt) {
        let depth = Math.floor(Math.abs(this.mHook.y) / 100);
        if (depth - this.mDepth > 0 && this.mSceneData.json.length > this.mIndex) {
            let data = this.mSceneData.json[this.mIndex];
            let fish = cc.instantiate(this.mPrefab);
            cc.loader.loadRes(data.res, cc.SpriteFrame, function (err, spriteFrame) {
                if (!err) {
                    fish.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            });
            fish.x = Math.random() * 640 - 320;
            fish.y = this.mHook.y - 480 - 100;
            this.mFishPool.addChild(fish);
            this.mIndex++;
        }
        this.mDepth = depth;
    },

    reset() {
        GameData.instance.depth = 0;
        GameData.instance.score = 0;
        this.mFishPool.removeAllChildren(true);
        this.mController.removeAllChildren(true);
    }
});
