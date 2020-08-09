// 这个工具是生成星星数组的 1是实心 0是空心
// [1,1,1,1,1]五星   [1,1,1,0,0]三星

function toStarsArray(star){
  // 存放数据的数组
  var arr = []
  // 第一步截取第一个数字
  var num = star.toString().substring(0, 1)
  for(var i=1 ; i<=5; i++){
   if(i<=num){
     arr.push(1)
   }else{
     arr.push(0)
   }
  }
  return arr
}


// collBack 是回调函数用来处理成功以后的数据 无法直接得到里面的数据 只能从里面处理 因为这是异步
function http(url,collBack){
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'content-type': '' 
    },
    success(res) {
      collBack(res.data)
    },
    fail() {
      console.log('false')
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  toStarsArray: toStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}