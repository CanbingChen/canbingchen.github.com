/**
 * Created by hansneil on 21/3/16.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

var colors = ['#2AF010', '#F1E50F', '#B9EE14', '#0AF24E', '#1DA9E6', '#5E64B9',
    '#EFC533', '#c1b9c2', '#24BBE3', '#F21697', '#1C71E0', '#B01919'];

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity:" 广州",
    nowGraTime: "day"
}

function getWidth(width, len) {
    var posObj = {};
    posObj.width = Math.floor(width / (len*2));
    posObj.left = Math.floor(width / len);
    posObj.offsetLeft = (width - posObj.left * (len - 1) - posObj.width) / 2;
    return posObj;
}
function choseselect(){
    switch (pageState.nowGraTime) {
        case "day":
            return "日";
        case "week":
            return "周";
        case "month":
            return "月";
    }
}
function chosecity(){

}
/**
 * addEventHandler方法
 * 跨浏览器实现事件绑定
 */
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

/**
 * 渲染图表
 */
function renderChart() {
    //var innerHTML = "", i = 0;
    //var wrapper = document.getElementById("aqi-chart-wrap");
    //var width = wrapper.clientWidth;
    //var selectedData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
    //var len = Object.keys(selectedData).length;
    //var posObj = getWidth(width, len);
    //innerHTML += "<div class='title'>" + pageState.nowSelectCity + "市01-03月"+ getTitle() +"空气质量报告</div>"
    //for (var key in selectedData) {
    //    innerHTML += "<div class='aqi-bar " + pageState.nowGraTime + "' style='height:" + selectedData[key] + "px; width: " + posObj.width +"px; left:" + (posObj.left * i + posObj.offsetLeft) + "px; background-color:" + colors[Math.floor(Math.random() * 11)] + "'></div>"
    //    innerHTML += "<div class='aqi-hint' style='bottom: " + (selectedData[key] + 10) + "px; left:" + (posObj.left * (i++) + posObj.offsetLeft + posObj.width / 2 - 60) + "'>" + key + "<br/> [AQI]: " + selectedData[key] + "</div>"
    //}
    //wrapper.innerHTML = innerHTML;
  var inhtml="";
    var wrapper = document.getElementById("aqi-chart-wrap");
    var selectedData = chartData[pageState.nowGraTime];
    inhtml+="<div>"+chosecity()+"01-03月"+choseselect()+"空气质量</div>"
    for(var key in selectedData)
    {
        inhtml+="<div style=height:"+selectedData[key]+"px title="+key+"指数为"+selectedData[key] +"></div>"
    }
    wrapper.innerHTML = inhtml;

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(radio) {
    // 确定是否选项发生了变化
    var value = radio.value;
    var item = radio.previousElementSibling;
    var items = document.getElementsByTagName('span');
    for (var i = 0; i < items.length; i++) {
        items[i].className = "";
    }
    item.className = "selected";
    if (value !== pageState.nowGraTime) {
        // 设置对应数据
        pageState.nowGraTime = value;
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    var city = this.value;
    if (city !== pageState.nowSelectCity) {
        pageState.nowSelectCity = city;
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radio = document.getElementsByName('gra-time');
    for (var i = 0; i < radio.length; i++) {
        (function (m) {
            addEventHandler(radio[m], 'click', function () {
                graTimeChange(radio[m])
            })
        })(i);
    }
    addEventHandler(document, 'mouseover', function(event){
        var ele = event.target;
        ele.className += " show";
    });
    addEventHandler(document, 'mouseout', function(event){
        var ele = event.target;
        ele.className = ele.className.replace(/show/, "");
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = document.getElementById("city-select");
    var cityArr = Object.getOwnPropertyNames(aqiSourceData);
    var htmlArr = cityArr.map(function(item) {
        return "<option>" + item + "</option>";
    });
    pageState.nowSelectCity = cityArr[0];
    select.innerHTML = htmlArr.join("");
    addEventHandler(select, 'change', citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {

    var sum = 0, Msum = 0, wnum = {}, mnum = {};
    for (var key in aqiSourceData) {
        var numcity = aqiSourceData[key];
        var keyArr = Object.getOwnPropertyNames(numcity);
        for (var i = 0; i < keyArr.length; i++) {
            sum += numcity[keyArr[i]];
            Msum += numcity[keyArr[i]];
            if (i !== 0 && i % 6 == 0) {
                var tempKey = keyArr[i].slice(0, 4) + "第" +  Math.ceil(i / 7) + "周";
                wnum[tempKey] = Math.floor(sum / 7);
                sum = 0;
            }
            if (i === 30) {
                var mkey = keyArr[i].slice(0, 4) + "第一月";
                mnum[mkey] = Math.floor(Msum / 31);
                Msum = 0;
            }
            if (i === 60) {
                var mkey = keyArr[i].slice(0, 4) + "第二月";
                mnum[mkey] = Math.floor(Msum / 31);
                Msum = 0;
            }
            if (i >60&&i===90) {
                var mkey = keyArr[i].slice(0, 4) + "第三月";
                mnum[mkey] = Math.floor(Msum / 31);
                Msum = 0;
            }


        }
    }
    chartData.day = aqiSourceData;
    chartData.week = wnum;
    chartData.month =mnum;
}
renderChart();

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}
init();