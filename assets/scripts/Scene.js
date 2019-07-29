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
    },

    // onLoad () {},

    start () {

    },

    update (dt) {
        let depth = Math.floor(Math.abs(this.mHook.y) / 100);
        let data = this.mSceneData.json[this.mIndex];
        if (depth - this.mDepth > 0) {
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
});
