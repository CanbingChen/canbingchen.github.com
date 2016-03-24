/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
var b=document.getElementById("aqi-table");
function addAqiData() {
    var a=document.getElementById("aqi-city-input").value.trim();
    if(!a.match(/^[A-Za-z\u4E00-\u9FA5]+$/))
    {
        alert("城市名应为中英文字符串");
        return;
    }

    var b=document.getElementById("aqi-value-input").value.trim();
    if(!b.match(/^\d+$/))
    {
        alert("污染指数应为数字");
        return;
    }
    aqiData[a]=b;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var a="";
   for(var key in aqiData)
   {
       a+="<tr><td>"+key+"</td><td>"+aqiData[key]+"</td><td><button data-city="+key+" >删除</button></td></tr>"
   }

    b.innerHTML=a;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */

function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
   delete aqiData[city];
    renderAqiList();
}
//document.getElementById("aqi-table").onclick=function(event){
//    if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.city);
//};

function init() {
    document.getElementById("add-btn").addEventListener("click",addBtnHandle,false);
   b.addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
    },false);
}

init();