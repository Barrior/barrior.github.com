"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 将多维数组转化成单维数组
 * @param  {Array}	aData
 * @return {Array}
 */
var toSingle = function toSingle(aData) {
    var arr = [];
    var isArray = Array.isArray;
    if (isArray(aData)) {
        aData.forEach(function (v) {
            isArray(v) ? arr = arr.concat(toSingle(v)) : arr.push(v);
        });
    }
    return arr;
};

/**
 * 将数组去重，效率优化算法
 * @param  {Array}	aData
 * @return {Array}
 */
var unique = function unique(aData) {
    var arr = [];
    var hash = {};
    if (Array.isArray(aData)) {
        aData.forEach(function (v) {
            if (!hash[v]) {
                hash[v] = [v];
                arr.push(v);
            } else if (hash[v].indexOf(v) == -1) {
                hash[v].push(v);
                arr.push(v);
            }
        });
    }
    return arr;
};

//export let unique = unique;

exports.unique = unique;
exports.toSingle = toSingle;
