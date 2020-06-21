let cityRender = (function () {
  let checkBoxList = document.querySelectorAll(".checkBox"),
    preBox = checkBoxList[0],
    cityBox = checkBoxList[1],
    cunBox = checkBoxList[2],
    preData = null,
    cityData = null,
    preList = preBox.querySelector("ul"),
    cityList = cityBox.querySelector("ul"),
    cunList = cunBox.querySelector("ul"),
    preVal = "请选择省",
    cityVal = "请选择市",
    cunVal = "请选择区县",
    preP = preVal,
    preC = cityVal;

  //=>从服务器获取数据(基于PROMISE管理)
  let queryData = function () {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("get", "json/city_code.json", true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          preData = xhr.responseText;
          preData = JSON.parse(preData);
          resolve();
        }
      };
      xhr.send(null);
    });
  };

  //=>将省级的数据放到容器中
  let bindPreHTML = function () {
    let preStr = ``;
    for (let i = 0; i < preData.length; i++) {
      let { name } = preData[i];
      preStr += `<li>${name}</li>`;
    }
    preList.innerHTML = preStr;
  };

  //=>绑定城市的数据
  let bindCityHTML = function (pre) {
    let cityStr = ``;
    for (let i = 0; i < preData.length; i++) {
      if (preData[i].name === pre) {
        cityData = preData[i].city;
        preData[i].city.forEach((item) => {
          let { name } = item;
          cityStr += `<li>${name}</li>`;
        });
        break;
      }
    }
    cityList.innerHTML = cityStr;
  };

  //=>绑定区县的数据
  let bindCunHTML = function (pre) {
    let cunStr = ``;
    for (let i = 0; i < cityData.length; i++) {
      if (cityData[i].name === pre) {
        cityData[i].area.forEach((item) => {
          let { name } = item;
          cunStr += `<li>${name}</li>`;
        });
        break;
      }
    }
    cunList.innerHTML = cunStr;
  };

  //=>选择好数据
  let checkData = function (ev, list, eleBox) {
    let tag = ev.target,
      tagName = tag.tagName,
      arrow = eleBox.querySelector(".arrow");

    //=>修改箭头的样式
    utils.existClass(arrow, "active")
      ? utils.removeClass(arrow, "active")
      : utils.addClass(arrow, "active");

    //=>当点击的元素为LI时(即点击的元素是城市等)
    if (tagName === "LI") {
      let val = tag.innerText;
      //=>当选择了不同的城市或者省份将城市或者区县刷新
      if (eleBox === preBox) {
        //=>当选择的值更改，修改CITY和CUNTY的数据，记录值
        if (preP !== val) {
          cityBox.querySelector("span").innerText = cityVal;
          cunBox.querySelector("span").innerText = cunVal;
        }
        preP = val;
      }
      //=>选择的是CiTY-BOX
      if (eleBox === cityBox) {
        if (preC !== val) {
          cunBox.querySelector("span").innerText = cunVal;
        }
        preC = val;
      }
      eleBox.querySelector("span").innerText = val;
      //=>当执行CLEAR-OTHER的时候默认会把所有的BOX的DISPLAY都改为NONE
      return;
    }
    //=>控制列表的显示和隐藏
    utils.css(list, "display") === "none"
      ? utils.css(list, "display", "block")
      : utils.css(list, "display", "none");
  };

  //=>防止双重选中，清除其他列表
  let clearOther = function (curBox) {
    [].forEach.call(checkBoxList, (item) => {
      if (item !== curBox) {
        utils.css(item.querySelector("ul"), "display", "none");
        return;
      }
    });
  };

  //=>添加事件
  let addListener = function () {
    preBox.addEventListener("click", function (ev) {
      clearOther(ev.target);
      //=>当点击的是li的子元素的时候将该DIV中的SPAN改为点击LI的文字
      checkData(ev, preList, this);
    });
    cityBox.addEventListener("click", function (ev) {
      clearOther(ev.target);
      //=>当点击的时候先判断是否选择了省，如果没有选择就弹出提示
      let pre = preBox.firstElementChild.innerText;
      if (pre === preVal) {
        alert("您未选择省市");
        return;
      }
      //=>根据选择的省市查找城市
      bindCityHTML(pre);
      checkData(ev, cityList, this);
    });

    cunBox.addEventListener("click", function (ev) {
      clearOther(ev.target);
      let pre = cityBox.firstElementChild.innerText;
      if (pre === cityVal) {
        alert("您未选择城市");
        return;
      }
      //=>根据选择的省市查找城市
      bindCunHTML(pre);
      checkData(ev, cunList, this);
    });
  };

  return {
    init: function () {
      queryData().then(() => {
        bindPreHTML();
        addListener();
      });
    },
  };
})();
cityRender.init();
