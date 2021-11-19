var startTime = new Date().getTime();

var keys = [
  ['10', '11'],
  ['20', '21'],
  ['30', '31', '32']
];

var data = {
  '10;20;30;40': { price: 1, count: 0 },
  '10;20;31': { price: 2, count: 2 },
  '10;20;32': { price: 3, count: 3 },
  '11;20;30': { price: 4, count: 0 },
  '11;20;31': { price: 5, count: 5 },
  '11;20;32': { price: 6, count: 6 },
  '10;21;30': { price: 7, count: 0 },
  '10;21;31': { price: 8, count: 8 },
  '10;21;32': { price: 9, count: 0 },
  '11;21;30': { price: 10, count: 0 },
  '11;21;31': { price: 11, count: 11 },
  '11;21;32': { price: 12, count: 0 },
};

var SKUResult = {};

function getObjKeys(obj) {
  if (obj !== Object(obj)) throw new TypeError('Invalid object');
  var keys = [];
  for (var key in obj)
    if (Object.prototype.hasOwnProperty.call(obj, key))
      keys[keys.length] = key;
  return keys;
}

function addSKUResult(combArrItem, sku) {
  var key = combArrItem.join(';');
  if (SKUResult[key]) {//SKU信息key属性·
    SKUResult[key].count += sku.count;
    SKUResult[key].prices.push(sku.price);
  } else {
    SKUResult[key] = {
      count: sku.count,
      prices: [sku.price]
    };
  }
}

function initSKU() {
  var i, j, skuKeys = getObjKeys(data);
  for (i = 0; i < skuKeys.length; i++) {
    var skuKey = skuKeys[i];//一条SKU信息key
    var sku = data[skuKey];	//一条SKU信息value
    var skuKeyAttrs = skuKey.split(';'); //SKU信息key属性值数组
    skuKeyAttrs.sort(function(value1, value2) {
      return parseInt(value1) - parseInt(value2);
    });

    //对每个SKU信息key属性值进行拆分组合
    var combArr = combInArray(skuKeyAttrs);
    // console.log('combArr', combArr)
    for (j = 0; j < combArr.length; j++) {
      addSKUResult(combArr[j], sku);
    }

    //结果集接放入SKUResult
    SKUResult[skuKeyAttrs.join(';')] = {
      count: sku.count,
      prices: [sku.price]
    }
  }
}

function combInArray(aData) {
  if (!aData || !aData.length) {
    return [];
  }

  var len = aData.length;
  var aResult = [];

  for (var n = 1; n < len; n++) {
    var aaFlags = getCombFlags(len, n);
    while (aaFlags.length) {
      var aFlag = aaFlags.shift();
      var aComb = [];
      for (var i = 0; i < len; i++) {
        aFlag[i] && aComb.push(aData[i]);
      }
      aResult.push(aComb);
    }
  }

  return aResult;
}

function getCombFlags(m, n) {
  if (!n || n < 1) {
    return [];
  }

  var aResult = [];
  var aFlag = [];
  var bNext = true;
  var i, j, iCnt1;

  for (i = 0; i < m; i++) {
    aFlag[i] = i < n ? 1 : 0;
  }

  aResult.push(aFlag.concat());

  while (bNext) {
    iCnt1 = 0;
    for (i = 0; i < m - 1; i++) {
      if (aFlag[i] == 1 && aFlag[i + 1] == 0) {
        for (j = 0; j < i; j++) {
          aFlag[j] = j < iCnt1 ? 1 : 0;
        }
        aFlag[i] = 0;
        aFlag[i + 1] = 1;
        var aTmp = aFlag.concat();
        aResult.push(aTmp);
        if (aTmp.slice(-n).join('').indexOf('0') == -1) {
          bNext = false;
        }
        break;
      }
      aFlag[i] == 1 && iCnt1++;
    }
  }
  return aResult;
}

$(function() {
  initSKU();
  var endTime = new Date().getTime();
  $('#init_time').text('init sku time: ' + (endTime - startTime) + ' ms');
  $('.sku').each(function() {
    var self = $(this);
    var attr_id = self.attr('attr_id');
    if (!SKUResult[attr_id]) {
      self.attr('disabled', 'disabled');
    }
  }).click(function() {
    var self = $(this);

    //选中自己，兄弟节点取消选中
    self.toggleClass('bh-sku-selected').siblings().removeClass('bh-sku-selected');

    //已经选择的节点
     var selectedObjs = $('.bh-sku-selected');
    if (selectedObjs.length) {
      //获得组合key价格
      var selectedIds = [];
      selectedObjs.each(function() {
        selectedIds.push($(this).attr('attr_id'));
      });
      selectedIds.sort(function(value1, value2) {
        return parseInt(value1) - parseInt(value2);
      });
      var len = selectedIds.length;
     /*  var prices = SKUResult[selectedIds.join(';')].prices;
      var maxPrice = Math.max.apply(Math, prices);
      var minPrice = Math.min.apply(Math, prices);
      $('#price').text(maxPrice > minPrice ? minPrice + '-' + maxPrice : maxPrice); */

      //用已选中的节点验证待测试节点 underTestObjs
      $('.sku').not(selectedObjs).not(self).each(function() {
        var siblingsSelectedObj = $(this).siblings('.bh-sku-selected');
        var testAttrIds = [];//从选中节点中去掉选中的兄弟节点
        if (siblingsSelectedObj.length) {
          var siblingsSelectedObjId = siblingsSelectedObj.attr('attr_id');
          for (var i = 0; i < len; i++) {
            (selectedIds[i] != siblingsSelectedObjId) && testAttrIds.push(selectedIds[i]);
          }
        } else {
          testAttrIds = selectedIds.concat();
        }
        testAttrIds = testAttrIds.concat($(this).attr('attr_id'));
        testAttrIds.sort(function(value1, value2) {
          return parseInt(value1) - parseInt(value2);
        });
        var SKU = SKUResult[testAttrIds.join(';')]
        if (!SKU || SKU.count === 0) {
          $(this).attr('disabled', 'disabled').removeClass('bh-sku-selected');
        } else {
          $(this).removeAttr('disabled');
        }
      });
    } else {
      //设置默认价格
      $('#price').text('--');
      //设置属性状态
      $('.sku').each(function() {
        SKUResult[$(this).attr('attr_id')] ? $(this).removeAttr('disabled') : $(this).attr('disabled', 'disabled').removeClass('bh-sku-selected');
      })
    }
  });
});