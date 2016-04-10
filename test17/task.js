/**
 * Created by hansneil on 21/3/16.
 */
/* ���ݸ�ʽ��ʾ
 var aqiSourceData = {
 "����": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// �������������������ģ�����ɲ�������
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
    "����": randomBuildData(500),
    "�Ϻ�": randomBuildData(300),
    "����": randomBuildData(200),
    "����": randomBuildData(100),
    "�ɶ�": randomBuildData(300),
    "����": randomBuildData(500),
    "����": randomBuildData(100),
    "����": randomBuildData(100),
    "����": randomBuildData(500)
};

var colors = ['#2AF010', '#F1E50F', '#B9EE14', '#0AF24E', '#1DA9E6', '#5E64B9',
    '#EFC533', '#c1b9c2', '#24BBE3', '#F21697', '#1C71E0', '#B01919'];

// ������Ⱦͼ�������
var chartData = {};

// ��¼��ǰҳ��ı�ѡ��
var pageState = {
    nowSelectCity:" ����",
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
            return "��";
        case "week":
            return "��";
        case "month":
            return "��";
    }
}
function chosecity(){

}
/**
 * addEventHandler����
 * �������ʵ���¼���
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
 * ��Ⱦͼ��
 */
function renderChart() {
    //var innerHTML = "", i = 0;
    //var wrapper = document.getElementById("aqi-chart-wrap");
    //var width = wrapper.clientWidth;
    //var selectedData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
    //var len = Object.keys(selectedData).length;
    //var posObj = getWidth(width, len);
    //innerHTML += "<div class='title'>" + pageState.nowSelectCity + "��01-03��"+ getTitle() +"������������</div>"
    //for (var key in selectedData) {
    //    innerHTML += "<div class='aqi-bar " + pageState.nowGraTime + "' style='height:" + selectedData[key] + "px; width: " + posObj.width +"px; left:" + (posObj.left * i + posObj.offsetLeft) + "px; background-color:" + colors[Math.floor(Math.random() * 11)] + "'></div>"
    //    innerHTML += "<div class='aqi-hint' style='bottom: " + (selectedData[key] + 10) + "px; left:" + (posObj.left * (i++) + posObj.offsetLeft + posObj.width / 2 - 60) + "'>" + key + "<br/> [AQI]: " + selectedData[key] + "</div>"
    //}
    //wrapper.innerHTML = innerHTML;
  var inhtml="";
    var wrapper = document.getElementById("aqi-chart-wrap");
    var selectedData = chartData[pageState.nowGraTime];
    inhtml+="<div>"+chosecity()+"01-03��"+choseselect()+"��������</div>"
    for(var key in selectedData)
    {
        inhtml+="<div style=height:"+selectedData[key]+"px title="+key+"ָ��Ϊ"+selectedData[key] +"></div>"
    }
    wrapper.innerHTML = inhtml;

}

/**
 * �ա��ܡ��µ�radio�¼����ʱ�Ĵ�����
 */
function graTimeChange(radio) {
    // ȷ���Ƿ�ѡ����˱仯
    var value = radio.value;
    var item = radio.previousElementSibling;
    var items = document.getElementsByTagName('span');
    for (var i = 0; i < items.length; i++) {
        items[i].className = "";
    }
    item.className = "selected";
    if (value !== pageState.nowGraTime) {
        // ���ö�Ӧ����
        pageState.nowGraTime = value;
        // ����ͼ����Ⱦ����
        renderChart();
    }
}

/**
 * select�����仯ʱ�Ĵ�����
 */
function citySelectChange() {
    var city = this.value;
    if (city !== pageState.nowSelectCity) {
        pageState.nowSelectCity = city;
        renderChart();
    }
}

/**
 * ��ʼ���ա��ܡ��µ�radio�¼��������ʱ�����ú���graTimeChange
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
 * ��ʼ������Select����ѡ����е�ѡ��
 */
function initCitySelector() {
    // ��ȡaqiSourceData�еĳ��У�Ȼ������idΪcity-select�������б��е�ѡ��
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
 * ��ʼ��ͼ����Ҫ�����ݸ�ʽ
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
                var tempKey = keyArr[i].slice(0, 4) + "��" +  Math.ceil(i / 7) + "��";
                wnum[tempKey] = Math.floor(sum / 7);
                sum = 0;
            }
            if (i === 30) {
                var mkey = keyArr[i].slice(0, 4) + "��һ��";
                mnum[mkey] = Math.floor(Msum / 31);
                Msum = 0;
            }
            if (i === 60) {
                var mkey = keyArr[i].slice(0, 4) + "�ڶ���";
                mnum[mkey] = Math.floor(Msum / 31);
                Msum = 0;
            }
            if (i >60&&i===90) {
                var mkey = keyArr[i].slice(0, 4) + "������";
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
 * ��ʼ������
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}
init();