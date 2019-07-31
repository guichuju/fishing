const MessageCenter = cc.Class({
    extends: cc.Component,

    statics: {
        instance: null,
    },

    properties: {
        bindFuncList: [],
        emitList: [],
    },

    on(key, cbFunc) {
        if (!this.bindFuncList[key]) {
            this.bindFuncList[key] = [];
        }
        this.bindFuncList[key].push(cbFunc);
    },

    emit(key, args) {
        let arr = this.bindFuncList[key];
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                arr[i](args);
            }
        } else {
            if (!this.emitList[key]) {
                this.emitList[key] = [];
            }
            this.emitList[key].push(args);
        }
    },

    emitAll() {
        let keys = Object.keys(this.emitList);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let emitArr = this.emitList[key];
            for (let j = 0; j < emitArr.length; j++) {
                let emitArg = emitArr[j];
                let funcArr = this.bindFuncList[key];
                if (funcArr) {
                    for (let k = 0; k < funcArr.length; k++) {
                        funcArr[k](emitArg);
                    }
                }
            }
        }
        this.emitList = [];
    },

    poolAll() {
        this.bindFuncList = [];
    }
})

MessageCenter.instance = new MessageCenter();
module.exports = MessageCenter;
