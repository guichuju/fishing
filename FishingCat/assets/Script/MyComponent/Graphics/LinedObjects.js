// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var LinedObjects = cc.Class({
    extends: cc.Graphics,

    editor: CC_EDITOR && {
        menu: '自定义组件/渲染组件/节点连线',
    },

    properties: {
        mNodeA : {default : null, type : cc.Node, displayName : "线段端点节点"},
        mNodeB : {default : null, type : cc.Node, displayName : "线段端点节点"},
        mPointsCount : {default : 0, visible : false},
        mUseCurve : {default : false, displayName : "是否使用二次贝塞尔曲线"},
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    drawGraphics(location) {
        this._drawGraphics(location);
    },

    _drawGraphics(location) {
        let point = this.node.convertToNodeSpaceAR(location);
      
        if (this.mPointsCount % 2 === 0) {
            this.moveTo(point.x, point.y);
            this.mPointsCount++;
            return;
        }

        if (point.x === 0 && point.y === 0) {
            return;
        }
        
        if (this.mUseCurve) {
            this.quadraticCurveTo(point.x / 2, point.y / 2, point.x, point.y);
        }
        else {
            this.lineTo(point.x, point.y);
        }
        
        this.stroke();
        this.mPointsCount++;
    },

    update (dt) {
        if (CC_EDITOR) return;
        if (this.mNodeA.active === false || this.mNodeB.active === false) return;
        this.clear(false);
        this.drawGraphics(this.mNodeA.parent.convertToWorldSpaceAR(this.mNodeA.position));
        this.drawGraphics(this.mNodeB.parent.convertToWorldSpaceAR(this.mNodeB.position));
    },
});

cc.Class.Attr.setClassAttr(LinedObjects, 'miterLimit', 'visible', false);

module.exports = LinedObjects;