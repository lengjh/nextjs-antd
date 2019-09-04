var POSSIBLE_CHARS = '0123456789';

export const backList = [
  { text: '中国建设银行', value: 'CCB' },
  { text: '中国工商银行', value: 'ICBC' },
  { text: '中国银行', value: 'BOC' },
  { text: '招商银行', value: 'CMB' },
  { text: '广发银行', value: 'GDB' },
  { text: '平安银行', value: 'PAB' },
  { text: '光大银行', value: 'CEB' },
  { text: '邮储银行', value: 'PSBC' },
  { text: '兴业银行', value: 'CIB' },
  { text: '中信银行', value: 'CITIC' },
  { text: '民生银行', value: 'CMBC' },
  { text: '交通银行', value: 'BCOM' },
  { text: '农业银行', value: 'ABC' },
  { text: '华夏银行', value: 'HXB' },
  { text: '浦发银行', value: 'SPDB' },
];

function StringBuilder() {
  this.init();
}
//初始化StringBuilder类
StringBuilder.prototype.init = function() {
  this.array = [];
};
//追加数据到StringBuilder类
StringBuilder.prototype.append = function(element) {
  this.array.push(element);
};
//转换成String
StringBuilder.prototype.toString = function() {
  return this.array.join('');
};

export const createNumber = {
  POSSIBLE_CHARS: '0123456789',
  sb: '',
  bankType: 'CCB',
  bankName: '中国建设银行',
  bankCode: '105',
  //Luhm校验规则：16位银行卡号（19位通用）:
  // 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
  // 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
  // 3.将加法和加上校验位能被 10 整除。
  //方法步骤很清晰，易理解，需要在页面引用Jquery.js
  //bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件
  luhmCheck: function(bankno) {
    var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）

    var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) {
      //前15或18位倒序存进数组
      newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array(); //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array(); //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
      if ((j + 1) % 2 == 1) {
        //奇数位
        if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
        else arrJiShu2.push(parseInt(newArr[j]) * 2);
      } //偶数位
      else arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
      jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
      jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
      sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
      sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
      sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
      sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal =
      parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;

    if (lastNum == luhm) {
      // $("#banknoInfo").html("Luhm验证通过");
      return true;
    } else {
      //   $("#banknoInfo").html("银行卡号必须符合Luhm校验");
      return false;
    }
  },

  /**随机生成一个卡号*/
  RandomCreateBankID: function() {
    var cardNo = '';
    for (let i = 0; i < 200; i++) {
      if (
        this.bankType == 'ICBC' ||
        this.bankType == 'CCB' ||
        this.bankType == 'ABC' ||
        this.bankType == 'PSBC' ||
        this.bankType == 'BCOM' ||
        this.bankType == 'GDB' ||
        this.bankType == 'BOC'
      ) {
        this.sb = new StringBuilder(13);

        for (let i = 0; i < 13; i++) {
          this.sb.append(parseInt(Math.random() * 10));
        }
        //alert("***"+sb+"***");
      } else {
        this.sb = new StringBuilder(10);

        for (let i = 0; i < 10; i++) {
          this.sb.append(parseInt(Math.random() * 10));
        }
      }

      switch (this.bankType) {
        case 'CCB':
          cardNo = '621700' + this.sb;
          this.bankCode = '105';
          break;
        case 'CMBC':
          cardNo = '621691' + this.sb;
          this.bankCode = '305';
          break;
        case 'ABC':
          cardNo = '622827' + this.sb;
          this.bankCode = '103';
          break;
        case 'BCOM':
          cardNo = '622262' + this.sb;
          this.bankCode = '301';
          break;
        case 'CMB':
          cardNo = '621486' + this.sb;
          this.bankCode = '308';
          break;
        case 'SPDB':
          cardNo = '622521' + this.sb;
          this.bankCode = '310';
          break;
        case 'GDB':
          cardNo = '622568' + this.sb;
          this.bankCode = '306';
          break;
        case 'HXB':
          cardNo = '622632' + this.sb;
          this.bankCode = '304';
          break;
        case 'PAB':
          cardNo = '622298' + this.sb;
          this.bankCode = '783';
          break;
        case 'CITIC':
          cardNo = '622696' + this.sb;
          this.bankCode = '302';
          break;
        case 'ICBC':
          cardNo = '620058' + this.sb;
          this.bankCode = '102';
          break;
        case 'BOC':
          cardNo = '620061' + this.sb;
          this.bankCode = '104';
          break;
        case 'CIB':
          cardNo = '622908' + this.sb;
          this.bankCode = '309';
          break;
        case 'CEB':
          cardNo = '622660' + this.sb;
          this.bankCode = '303';
          break;
        case 'PSBC':
          cardNo = '621799' + this.sb;
          this.bankCode = '403';
          break;
        default:
          cardNo = '621700' + this.sb;
          this.bankCode = '105';
      }

      if (this.luhmCheck(cardNo)) {
        return cardNo;
      }

      //	return 0;
    }
  },

  /**批量生成卡号*/
  createBankId: function(cnt) {
    const list = [];
    if (!isNaN(cnt)) {
      cnt = cnt < 0 ? (cnt = 10) : cnt;
      cnt = cnt > 100 ? (cnt = 100) : cnt;
      for (var ii = 0; ii < cnt; ii++) {
        var t = this.RandomCreateBankID();
        list.push({
          key: ii + 1,
          bankName: this.bankName,
          bankCode: this.bankCode,
          number: t,
        });
      }
    }
    return list;
  },
};
