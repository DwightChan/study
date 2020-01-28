const topData = require('../data/top.json');
const sheihuiData = require('../data/sheihui.json');
const guoneiData = require('../data/guonei.json');
const guojiData = require('../data/guoji.json');
const yuleData = require('../data/yule.json');
const tiyuData = require('../data/tiyu.json');
const kejiData = require('../data/keji.json');
// // 获取头条列表数据
exports.getTopNews = (req,res) => {
	console.log()
    res.json(topData.result.data);
}

// 获取社会列表数据
exports.getSheHuiNews = (req,res) => {
	
    res.json(sheihuiData.result.data);
}

// 获取国内列表数据
exports.getGuoNeiNews = (req,res) => {
	
    res.json(guoneiData.result.data);
}

// 获取国际列表数据
exports.getGuoJiNews = (req,res) => {
	
    res.json(guojiData.result.data);
}


// 获取娱乐列表数据
exports.getYuLeNews = (req,res) => {
	
    res.json(yuleData.result.data);
}

// 获取体育列表数据
exports.getTiYuNews = (req,res) => {
	
    res.json(tiyuData.result.data);
}

// 获取科技列表数据
exports.getKeJiNews = (req,res) => {
	
    res.json(kejiData.result.data);
}
