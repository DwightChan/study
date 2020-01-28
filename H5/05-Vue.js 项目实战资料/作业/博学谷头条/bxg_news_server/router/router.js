const express = require('express');
const router = express.Router();
const control = require('../control/control.js');
// 查询新闻列表
router.get('/top',control.getTopNews);
router.get('/shehui',control.getSheHuiNews);
router.get('/guonei',control.getGuoNeiNews);
router.get('/guoji',control.getGuoJiNews);
router.get('/yule',control.getYuLeNews);
router.get('/tiyu',control.getTiYuNews);
router.get('/keji',control.getKeJiNews);

module.exports = router;
