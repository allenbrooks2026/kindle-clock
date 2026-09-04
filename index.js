var domApp = document.querySelector(".app");
var domTime = document.querySelector(".time");
var domDate = document.querySelector(".date");
var domCnDate = document.querySelector(".cn-date");

function geturl(url) {
  var arr = url.split("?");

  if (!arr[1]) {
    return {};
  }

  var res = arr[1].split("&");
  var items = {};
  for (var i = 0; i < res.length; i++) {
    var a = res[i].split("=");
    items[a[0]] = a[1];
  }
  return items;
}

function formatDate(date, fmt) {
  fmt = fmt || "yyyy-MM-dd";
  if (!date) {
    return "";
  }
  if (typeof date === "number" || typeof date === "string") {
    date = new Date(Number(date));
  }
  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

var WEEKDAYS_EN = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];
var ZODIAC_EN = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];

function pad2(n) {
  return n < 10 ? "0" + n : "" + n;
}

function zodiacEn(lunarYear) {
  var idx = (lunarYear - 4) % 12;
  if (idx < 0) idx += 12;
  return ZODIAC_EN[idx];
}

function render() {
  // Force China (UTC+8) time display, same as the original this page is
  // based on -- some Kindle units show wrong local time otherwise.
  var time = new Date();
  var len = time.getTime();
  var offset = time.getTimezoneOffset() * 60000;
  var utcTime = len + offset;
  var date = new Date(utcTime + 3600000 * 8);

  var lunar = calendar.solar2lunar(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate()
  );

  var dateText = formatDate(date, "yyyy.M.d") + " " + WEEKDAYS_EN[date.getDay()];

  var timeText = pad2(date.getHours()) + ":" + pad2(date.getMinutes());
  var cnDateText =
    "Lunar " + lunar.lMonth + "/" + lunar.lDay + (lunar.isLeap ? " (Leap)" : "") +
    ", Year of the " + zodiacEn(lunar.lYear);

  if (domDate.innerHTML != dateText) domDate.innerHTML = dateText;
  if (domTime.innerHTML != timeText) domTime.innerHTML = timeText;
  if (domCnDate.innerHTML != cnDateText) domCnDate.innerHTML = cnDateText;
}

var urlQuery = geturl(location.href);
var config = {
  fontSize: +(urlQuery.fs || 10.5), // 7 * 1.5 -- 50% bigger than the original base size
  // Default to a 90deg clockwise turn; override with ?r=0 / 180 / 270.
  rotate: urlQuery.r === undefined ? 90 : urlQuery.r,
};

domTime.style.fontSize = config.fontSize + "rem";
domDate.style.fontSize = config.fontSize / 2.5 + "rem";
domCnDate.style.fontSize = config.fontSize / 4 + "rem";
domApp.style.cssText =
  "-webkit-transform: rotate(" + (config.rotate || 0) + "deg) translate3d(-50%,-50%,0)";

render();
setInterval(function () {
  render();
}, 1000);
