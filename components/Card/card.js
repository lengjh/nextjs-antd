var areaCode = {
  '11': '北京市',
  '12': '天津市',
  '13': '河北省',
  '14': '山西省',
  '15': '内蒙古',
  '21': '辽宁省',
  '22': '吉林省',
  '23': '黑龙江省',
  '31': '上海市',
  '32': '江苏省',
  '33': '浙江省',
  '34': '安徽省',
  '35': '福建省',
  '36': '江西省',
  '37': '山东省',
  '41': '河南省',
  '42': '湖北省',
  '43': '湖南省',
  '44': '广东省',
  '45': '广西省',
  '46': '海南省',
  '50': '重庆市',
  '51': '四川省',
  '52': '贵州省',
  '53': '云南省',
  '54': '西藏自治区',
  '61': '陕西省',
  '62': '甘肃省',
  '63': '青海省',
  '64': '宁夏回族自治区',
  '65': '新疆',
};

/**删除左右两端的空格**/
function trim(str = '') {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**根据15位身份证或者18位身份证的前17位生成18位身份证号码*/
function getCheckID(_pid) {
  var arrVerifyCode = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  if (_pid.length != 15 && _pid.length != 17) return false;
  var ai = _pid.length == 17 ? _pid : _pid.substr(0, 6) + '19' + _pid.substr(6);
  if (!/^\d+$/.test(ai)) {
    alert(ai);
    return false;
  }
  var yyyy = ai.substr(6, 4),
    mm = ai.substr(10, 2) - 1,
    dd = ai.substr(12, 2);
  var d = new Date(yyyy, mm, dd),
    year = d.getFullYear(),
    mon = d.getMonth(),
    day = d.getDate(),
    now = new Date();
  if (year != yyyy || mon != mm || day != dd || d > now || now.getFullYear() - year > 140)
    return false;
  for (var i = 0, ret = 0; i < 17; i++) ret += ai.charAt(i) * wi[i];
  ai += arrVerifyCode[(ret %= 11)];
  return ai;
}

/**判断输入的15位或者18位身份证号码是否合法*/
function ParseID(pId) {
  var arrVerifyCode = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2];
  var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  if (pId.length != 15 && pId.length != 18) return '身份证号码只能是15位或18位!';
  var ai = pId.length == 18 ? pId.substr(0, 17) : pId.substr(0, 6) + '19' + pId.substr(6);
  if (!/^\d+$/.test(ai)) return '身份证除最后一位外，必须为数字！';
  var yyyy = ai.substr(6, 4),
    mm = ai.substr(10, 2) - 1,
    dd = ai.substr(12, 2);
  var d = new Date(yyyy, mm, dd),
    year = d.getFullYear(),
    mon = d.getMonth(),
    day = d.getDate(),
    now = new Date();
  if (year != yyyy || mon != mm || day != dd || d > now || now.getFullYear() - year > 140)
    return '身份证出生年月日输入错误！';
  for (var i = 0, ret = 0; i < 17; i++) ret += ai.charAt(i) * wi[i];
  ai += arrVerifyCode[(ret %= 11)];
  return pId.length == 18 && pId.toLowerCase() != ai
    ? '身份证输入错误，正确的为\n' + ai + '！'
    : ai;
}

/**根据身份证取 省份,生日，性别*/
function getInfo(pid) {
  _id = ParseID(pid);
  if (isNaN(_id.substr(0, 17))) return 0;
  var _id = String(_id),
    sex = _id.substr(16, 1) % 2 ? '男' : '女';
  prov = areaCode[_id.substr(0, 2)] || '无法确定';
  var birthday = new Date(
    _id.substr(6, 4),
    _id.substr(10, 2) - 1,
    _id.substr(12, 2)
  ).toLocaleDateString();
  return [prov, birthday, sex];
}

/**生成一定范围的随机数*/
function fRandomBy(under, over) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * under + 1);
    case 2:
      return parseInt(Math.random() * (over - under + 1) + under);
    default:
      return 0;
  }
}

/**随机生成一个身份证*/
function RandomCreateID() {
  function _RandomCreateID() {
    var aid = 0,
      ac = null,
      yyyy = 0,
      mm = 0,
      dd = 0,
      rnd = 0;
    aid = '' + document.getElementById('ar1').value;
    var Code = [
      '11',
      '12',
      '13',
      '14',
      '15',
      '21',
      '22',
      '23',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '50',
      '51',
      '52',
      '53',
      '54',
      '61',
      '62',
      '63',
      '64',
      '65',
    ];

    if (aid != '') {
      l = aid.length;
      for (i = 0; i < 6 - l; i++) {
        aid = '1' + aid;
      }
    } else {
      aid =
        '' +
        Code[fRandomBy(0, 31)] +
        fRandomBy(0, 9) +
        fRandomBy(0, 9) +
        fRandomBy(0, 9) +
        fRandomBy(0, 9);
    }
    //alert("aid:"+aid);
    (yyyy = fRandomBy(1960, 1990)), (mm = fRandomBy(1, 12)), (dd = fRandomBy(1, 31));
    rnd = '' + fRandomBy(0, 9) + fRandomBy(0, 9) + fRandomBy(0, 9);
    //alert("id0:"+ mm +"id0:"+ dd );
    //直接用mm后值会变成true或false,因为第二种写法的问题。
    //if ( (mm == 2) && (dd > 28) )   if ( mm == 2 && dd > 28 )
    if (mm == 2 && dd > 28) {
      dd = fRandomBy(1, 28);
    } else if ((mm == 4 || mm == 6 || mm == 9 || mm == 11) && dd == 31) {
      dd = dd - 1;
    }
    mm = mm < 10 ? '0' + mm : mm;
    dd = dd < 10 ? '0' + dd : dd;
    return '' + aid + yyyy + mm + dd + rnd;
  }

  var ff = false;
  var ct = 0;
  while (!ff) {
    ct++;
    ff = getCheckID(_RandomCreateID());
    if ((ct = 200)) {
      return ff;
    }
  }
  ct = 0;
  return ff;
}

/**批量生成身份证*/
export const createid = function(cnt) {
  var list = [];
  // cnt = trim(cnt);
  if (!isNaN(cnt)) {
    cnt = cnt < 0 ? (cnt = 10) : cnt;
    cnt = cnt > 100 ? (cnt = 100) : cnt;
    for (let ii = 0; ii < cnt; ii++) {
      var t = RandomCreateID();
      //alert(t);
      if (getInfo(t) == 0) {
        continue;
        ii--;
      } else {
        list.push({ t: t, a: getInfo(t) });
        // info.innerHTML += '<font color="#9900FF">' + t + '</font>= ' + getInfo(t) + '<br>';
      }
    }
  } else {
    // info1.innerHTML = '<font color="#FF0000">不是数字！</font>';
  }
  return list;
};
