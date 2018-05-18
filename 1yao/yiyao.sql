-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 05 月 18 日 03:52
-- 服务器版本: 5.5.8
-- PHP 版本: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `yiyao`
--
CREATE DATABASE `yiyao` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `yiyao`;

-- --------------------------------------------------------

--
-- 表的结构 `classify`
--

CREATE TABLE IF NOT EXISTS `classify` (
  `classifyid` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `classifyname` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`classifyid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `classify`
--

INSERT INTO `classify` (`classifyid`, `classifyname`) VALUES
(1, '中西药品'),
(2, '滋补保健'),
(3, '维生素钙'),
(4, '隐形眼镜'),
(5, '医疗器械、健康电器'),
(6, '药妆个护'),
(7, '成人用品'),
(8, '母婴专区'),
(9, '参茸花茶、休闲零食'),
(10, '体检、口腔诊疗');

-- --------------------------------------------------------

--
-- 表的结构 `ggimg`
--

CREATE TABLE IF NOT EXISTS `ggimg` (
  `ggimgid` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `ggimggoods` tinyint(4) unsigned DEFAULT NULL,
  `ggimg` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `classify` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`ggimgid`),
  KEY `goodsid` (`ggimggoods`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `ggimg`
--

INSERT INTO `ggimg` (`ggimgid`, `ggimggoods`, `ggimg`, `classify`) VALUES
(1, 1, 'https://p1.maiyaole.com/img/item/1526292592857673.jpg', 1),
(2, 2, 'https://p1.maiyaole.com/img/item/1526292546469669.jpg', 1),
(3, 3, 'https://p2.maiyaole.com/img/item/1526292630457677.jpg', 1),
(4, 4, 'https://p1.maiyaole.com/img/item/1526292665310681.jpg', 1),
(5, 5, 'https://p1.maiyaole.com/img/item/1523859898541249.jpg', 2),
(6, 6, 'https://p1.maiyaole.com/img/item/1511495559831107.jpg', 2),
(7, 1, 'https://p1.maiyaole.com/img/item/1526292592857673.jpg', 1);

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE IF NOT EXISTS `goods` (
  `goodsid` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `goodsname` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `classify` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `js` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `imgid` tinyint(4) unsigned DEFAULT NULL,
  `ggimg` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`goodsid`),
  KEY `imgid` (`imgid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`goodsid`, `goodsname`, `classify`, `price`, `js`, `imgid`, `ggimg`) VALUES
(1, '达克宁 硝酸咪康唑乳膏 20g', '中西药品 ', '15.50', '治疗脚气股癣，用于真菌感染、阴道感染和继发性感染，杀真菌，治脚气，配合达克宁散剂防复发', 1, 'https://p1.maiyaole.com/img/201502/03/org_20150203095742920.JPG?v=1'),
(2, '罗氏 活力型血糖仪（含50片试纸）', '医疗器械、健康电器 ', '238.00', '中文界面大屏幕显示，爸妈也能看得清，大品牌血糖测试误差小，独特采血笔，无痛微创面采血', 2, 'https://p3.maiyaole.com/img/item/201804/17/org_20180417145114644.jpg'),
(3, '东阿阿胶 复方阿胶浆（无蔗糖） 20ml*48支', '中西药品 ', '499.00', '补气补血，全年适用。用于头晕目眩、心悸失眠、食欲不振及贫血【此商品属于易碎商品，签收前务必开箱验货】', 3, 'https://p1.maiyaole.com/img/item/201802/23/org_20180223144727899.jpg'),
(4, '江中初元 复合肽营养饮品礼盒（I型） 100ml*8瓶 术后', ' 滋补保健', '138.00', '复合肽营养饮品I型，适合手术患者，帮助术后康复，提升病人体质', 4, 'https://p3.maiyaole.com/img/item/201805/02/org_20180502142607663.jpg'),
(5, '康缘 桂枝茯苓胶囊 0.31g*100粒', '中西药品 ', '52.00', '用于子宫肌瘤、盆腔炎性疾病、痛经、子宫内膜异位症、卵巢囊肿；也可用于女性乳腺囊性增生病；或用于前列增生', 5, 'https://p4.maiyaole.com/img/item/201803/13/org_20180313100010550.jpg'),
(6, '维力青 恩替卡韦分散片 0.5mg*7片', ' 中西药品 ', '90.00', NULL, 6, 'https://p1.maiyaole.com/img/201502/03/org_20150203095742920.JPG?v=1'),
(7, '达克宁 硝酸咪康唑乳膏 20g', '中西药品 ', '15.50', '治疗脚气股癣，用于真菌感染、阴道感染和继发性感染，杀真菌，治脚气，配合达克宁散剂防复发', 1, 'https://p1.maiyaole.com/img/201502/03/org_20150203095742920.JPG?v=1');

-- --------------------------------------------------------

--
-- 表的结构 `goodsimg`
--

CREATE TABLE IF NOT EXISTS `goodsimg` (
  `imgid` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `img1` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `img2` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `img3` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `img4` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `img5` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `img6` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `goodsid` tinyint(4) unsigned DEFAULT NULL,
  PRIMARY KEY (`imgid`),
  KEY `imggoodsid` (`goodsid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `goodsimg`
--

INSERT INTO `goodsimg` (`imgid`, `img1`, `img2`, `img3`, `img4`, `img5`, `img6`, `goodsid`) VALUES
(1, 'https://p1.maiyaole.com/img/201502/03/org_20150203095742920.JPG?v=1', 'https://p3.maiyaole.com/img/201502/03/org_20150203095747718.JPG?v=1', 'https://p1.maiyaole.com/img/201502/03/org_20150203095746231.JPG?v=1', 'https://p1.maiyaole.com/img/201502/03/org_20150203095744578.JPG?v=1', 'https://p3.maiyaole.com/img/201502/03/org_20150203095750105.JPG?v=1', NULL, 1),
(2, 'https://p3.maiyaole.com/img/item/201804/17/org_20180417145114644.jpg', 'https://p2.maiyaole.com/img/201604/07/org_20160407171744162.jpg', 'https://p2.maiyaole.com/img/201604/07/org_20160407171744992.jpg', 'https://p3.maiyaole.com/img/201604/07/org_20160407171747188.jpg', 'https://p1.maiyaole.com/img/201604/07/org_20160407171746436.jpg', 'https://p2.maiyaole.com/img/201604/07/org_20160407171745737.jpg', 2),
(3, 'https://p1.maiyaole.com/img/item/201802/23/org_20180223144727899.jpg', 'https://p1.maiyaole.com/img/2659/2659077/org_org.jpg?v=1', 'https://p1.maiyaole.com/img/201512/02/org_20151202100214977.jpg?v=1', 'https://p2.maiyaole.com/img/201512/02/org_2015120209361826.jpg?v=1', 'https://p2.maiyaole.com/img/201512/02/org_20151202093420773.jpg?v=1', 'https://p2.maiyaole.com/img/201512/02/org_20151202093417341.jpg?v=1', 3),
(4, 'https://p3.maiyaole.com/img/item/201805/02/org_20180502142607663.jpg', 'https://p2.maiyaole.com/img/item/201804/08/org_20180408162632290.jpg', 'https://p1.maiyaole.com/img/item/201804/08/org_20180408162636927.jpg', 'https://p2.maiyaole.com/img/item/201804/08/org_20180408162640889.jpg', 'https://p2.maiyaole.com/img/item/201804/08/org_20180408162641947.jpg', NULL, 4),
(5, 'https://p4.maiyaole.com/img/item/201803/13/org_20180313100010550.jpg', 'https://p2.maiyaole.com/img/201511/25/org_2015112521461640.jpg?v=1', 'https://p1.maiyaole.com/img/item/201803/13/org_20180313100012341.jpg', 'https://p4.maiyaole.com/img/item/201803/13/org_20180313100013622.jpg', 'https://p3.maiyaole.com/img/item/201803/13/org_20180313100015214.jpg', NULL, 5),
(6, 'https://p1.maiyaole.com/img/201502/03/org_20150203095742920.JPG?v=1', 'https://p3.maiyaole.com/img/201502/03/org_20150203095747718.JPG?v=1', 'https://p1.maiyaole.com/img/201502/03/org_20150203095746231.JPG?v=1', 'https://p1.maiyaole.com/img/201502/03/org_20150203095744578.JPG?v=1', 'https://p3.maiyaole.com/img/201502/03/org_20150203095750105.JPG?v=1', NULL, 6),
(7, 'https://p1.maiyaole.com/img/201502/03/org_20150203095742920.JPG?v=1', 'https://p3.maiyaole.com/img/201502/03/org_20150203095747718.JPG?v=1', 'https://p1.maiyaole.com/img/201502/03/org_20150203095746231.JPG?v=1', 'https://p1.maiyaole.com/img/201502/03/org_20150203095744578.JPG?v=1', 'https://p3.maiyaole.com/img/201502/03/org_20150203095750105.JPG?v=1', NULL, 7);

-- --------------------------------------------------------

--
-- 表的结构 `twoclassify`
--

CREATE TABLE IF NOT EXISTS `twoclassify` (
  `classifyid` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `classifyname` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `oneclassifyid` tinyint(2) unsigned DEFAULT NULL,
  PRIMARY KEY (`classifyid`),
  KEY `oneclassifyid` (`oneclassifyid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `twoclassify`
--

INSERT INTO `twoclassify` (`classifyid`, `classifyname`, `oneclassifyid`) VALUES
(1, '男科疾病', 1),
(2, '滋补调养', 1),
(3, '心脑血管', 1),
(4, '神经系统', 1),
(5, '内分泌科', 1),
(6, '风湿骨科', 1),
(7, '皮肤病', 1),
(8, '呼吸道疾病', 1),
(9, '肝病科', 1),
(10, '消化系统疾病', 1),
(11, '五官科疾病', 1),
(12, '妇科疾病', 1),
(13, '肿瘤科', 1);

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userid` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `phone` varchar(11) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`userid`, `password`, `phone`) VALUES
(7, 'e7ef181d030a43b0eb5e46bdc85c9313', '17858959612'),
(8, '52bbe0ea14ccb672becb1a9501ae01fe', '17858959613'),
(9, '1603c76fc3c9d0085c99d644fbfd60d8', '17858959614'),
(10, 'd5f3599f4945d98f9e651424d74834cf', '17858959615');

--
-- 限制导出的表
--

--
-- 限制表 `ggimg`
--
ALTER TABLE `ggimg`
  ADD CONSTRAINT `goodsid` FOREIGN KEY (`ggimggoods`) REFERENCES `goods` (`goodsid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `goodsimg`
--
ALTER TABLE `goodsimg`
  ADD CONSTRAINT `imggoodsid` FOREIGN KEY (`goodsid`) REFERENCES `goods` (`goodsid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `twoclassify`
--
ALTER TABLE `twoclassify`
  ADD CONSTRAINT `oneclassifyid` FOREIGN KEY (`oneclassifyid`) REFERENCES `classify` (`classifyid`) ON DELETE CASCADE ON UPDATE CASCADE;
