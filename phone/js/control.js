var power_button = document.getElementById("power_button");
var innerPhone = document.getElementsByClassName("inner_phone")[0];
var lock_clock = document.getElementById("lock_clock");
var lock_day = document.getElementById("lock_day");
var lock_screen = document.getElementsByClassName("lock_screen");
var unlock_clock = document.getElementById("unlock_clock");
var unlock_day = document.getElementById("unlock_day");
var b = document.getElementById("camera_button");
var power = false;
var currentPage = 1;
var lastPage = 3;
var holdPage = 3;
var notJustOpen = false;
var current_url;
var lock = true;
var havebutton = false;
var firstPhoto = true;
var key = 0;
window.onload = function () {
    setInterval(setTime, 1000);
}
var switch_to_home_page = function () {
    innerPhone.style.backgroundImage = "url(./source/unlock_home.jpg)";
    var app = document.getElementsByClassName("app");
    var i;
    for (i = 0; i < app.length; i++) {
        app[i].style.zIndex = "100";
    }
    $(".lock_screen").hide();
    currentPage = 3;
}
var power_menu = function () {
    if (currentPage != 2) {
        b.style.zIndex = "-2";
        innerPhone.style.backgroundImage = "url(./source/power_menu.jpg)";
        notJustOpen = false;
        holdPage = currentPage;
        currentPage = 2;
        var app = document.getElementsByClassName("app");
        var i;
        for (i = 0; i < app.length; i++) {
            app[i].style.zIndex = "-2";
        }
        $(".lock_screen").hide();
    }
}
power_button.onmousedown = function () {
    notJustOpen = true;
    power_button.style.left = 96 + "%";
    if (power) {
        t = setTimeout(power_menu, 1000);
    }
    if (!power) {
        setInterval(setTime(), 1000);
        innerPhone.style.backgroundImage = "url(./source/lock_screen.jpg)";
        lock_clock.style.color = "white";
        lock_day.style.color = "white";
        $(".lock_screen").show();
        power = true;
        notJustOpen = false;
        currentPage = 1;
    }
    setTimeout(check, 200);
}
power_button.onmouseup = function () { //待機
    clearTimeout(t);
    power_button.style.left = 96.5 + "%";
    if (power && notJustOpen) {
        b.style.zIndex = "-2";
        var app = document.getElementsByClassName("app");
        var i;
        for (i = 0; i < app.length; i++) {
            app[i].style.zIndex = "-2";
        }
        if (currentPage != 2 && currentPage != 1) {
            lastPage = currentPage;
        } else {
            lastPage = holdPage;
        }
        innerPhone.style.backgroundImage = "url(./source/black_screen.jpg)";
        $(".lock_screen").hide();
        power = false;
        lock = true;
    }
}
innerPhone.onclick = function () {
    if (currentPage == 2 && power && !lock) { //在power_menu時 
        currentPage = holdPage;
        innerPhone.style.backgroundImage = current_url;
        if (havebutton) {
            b.style.zIndex = "99999";
        }
        if (holdPage == 3) {
            var app = document.getElementsByClassName("app");
            var i;
            for (i = 0; i < app.length; i++) {
                app[i].style.zIndex = "100";
            }

        }

    } else if (currentPage == 2 && power && lock) {
        innerPhone.style.backgroundImage = "url(./source/lock_screen.jpg)";
        $(".lock_screen").show();
        currentPage = 1;
    } else if (lock && power) {
        //解鎖動畫
        $(".lock_screen").slideUp("slow");
        if (lastPage == 3 || lastPage == 1) {
            var tmp = function () {
                $(".lock_screen").hide();
                current_url = "url(./source/unlock_home.jpg)";
                switch_to_home_page();

            }

        } else if (lastPage == 4) {
            var tmp = function () {
                if (havebutton) {
                    b.style.zIndex = "99999";
                }
                $(".lock_screen").hide();
                innerPhone.style.backgroundImage = current_url;
                currentPage = 4;
            }
        }
        setTimeout(tmp, 1000);
        lock = false;
    } else if (currentPage == 4 && power) {
        current_url = "url(./source/unlock_home.jpg)";
        b.style.zIndex = "-2";
        switch_to_home_page();
    }
}
power_button.onmouseleave = function () {
    power_button.onmouseup();
}
innerPhone.onmouseleave = function () {
    if (currentPage == 1) {
        innerPhone.onmouseup();
    }
}
var setTime = function () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var month = date.getMonth();
    var day = date.getDay();
    var dateday = date.getDate();
    var dayParse = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var udayParse = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthParse = ["January", "Fabruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (hours.toString() == "0") {
        hours = "12";
    } else if (hours.toString().length == 1) {
        hours = "0" + hours.toString();
    }
    if (minutes.toString().length == 1) {
        minutes = "0" + minutes.toString();
    }

    lock_day.innerHTML = dayParse[day] + ", " + monthParse[month] + " " + dateday;
    lock_clock.innerHTML = hours + ":" + minutes;
    unlock_clock.innerHTML = lock_clock.innerHTML;
    unlock_day.innerHTML = udayParse[day] + ", " + monthParse[month] + " " + dateday;
}
document.getElementById("google").onclick = function () {
    window.open('https://www.google.com/?hl=zh-tw', '_blank');
}
document.getElementById("play_store").onclick = function () {
    window.open('https://play.google.com/store?utm_source=apac_med&utm_medium=hasem&utm_content=Apr0120&utm_campaign=Evergreen&pcampaignid=MKT-DR-apac-tw-1003227-med-hasem-py-Evergreen-Apr0120-Text_Search_BKWS-BKWS%7cONSEM_kwid_43700012164346329_creativeid_231205259265_device_c_kwd_kwd-2072327022_geoid_9040379_network_g&gclid=CjwKCAjwv4_1BRAhEiwAtMDLsoBrKT6KW9q-STLazg6M8dFWAyAsMfyXxTPdTS-Mc4xN9kEHltbP_xoCnpIQAvD_BwE&gclsrc=aw.ds', '_blank');
}
document.getElementById("family_mart").onclick = function () {
    window.open('https://www.family.com.tw/Marketing/index.aspx', '_blank');
}
document.getElementById("dictionary").onclick = function () {
    window.open('https://www.collinsdictionary.com/dictionary/english-german', '_blank');
}
document.getElementById("line").onclick = function () {
    window.open('https://line.me/zh-hant/', '_blank');
}
document.getElementById("jako").onclick = function () {
    window.open('https://www.jkos.com/', '_blank');
}
document.getElementById("music").onclick = function () {
    window.open('https://music.youtube.com/', '_blank');
}
document.getElementById("weather").onclick = function () {
    window.open('https://weather.com/weather/today/l/25.04,121.52?par=google&temp=c', '_blank');
}
document.getElementById("onedrive").onclick = function () {
    window.open('https://www.microsoft.com/zh-tw/microsoft-365/onedrive/online-cloud-storage', '_blank');
}
document.getElementById("pig").onclick = function () {
    window.open('https://play.google.com/store/apps/details?id=money.expense.budget.wallet.manager.track.finance.tracker', '_blank');
}
document.getElementById("onedrive").onclick = function () {
    window.open('https://www.einvoice.nat.gov.tw/index', '_blank');
}
document.getElementById("gallary").onclick = function () {
    current_url = "url(./source/patrick.jpg)"
    innerPhone.style.backgroundImage = current_url;
    var app = document.getElementsByClassName("app");
    var i;
    for (i = 0; i < app.length; i++) {
        app[i].style.zIndex = "-2";
    }
    currentPage = 4;
}
document.getElementById("messenger").onclick = function () {
    window.open('https://www.messenger.com/', '_blank');
}
document.getElementById("set").onclick = function () {
    window.open('source/set.html', '_blank');
}
document.getElementById("chrome").onclick = function () {
    window.open('https://www.google.com/?hl=zh-tw', '_blank');
}
document.getElementById("time_table").onclick = function () {
    window.open('https://www.facebook.com/kchen.teach/', '_blank');
}
document.getElementById("tools").onclick = function () {
    window.open('https://www.youtube.com/watch?v=J_V59K0rUek', '_blank');
}
document.getElementById("setting").onclick = function () {
    window.open('https://www.youtube.com/watch?v=XKyurcQXx5o', '_blank');
}
document.getElementById("camera").onclick = function () {
    if (firstPhoto) {
        current_url = "url(./source/camera_page.jpg)";
    } else {
        current_url = "url(./source/good_luck.jpg)";
    }
    innerPhone.style.backgroundImage = current_url;
    var app = document.getElementsByClassName("app");
    var i;
    for (i = 0; i < app.length; i++) {
        app[i].style.zIndex = "-2";
    }
    currentPage = 4;
    havebutton = true;
    b.style.zIndex = 999999;

}
b.onclick = function () {
    if (!firstPhoto) {
        alert("儲存空間已滿 無法使用此操作");
    }
    current_url = "url(./source/good_luck.jpg)";
    innerPhone.style.backgroundImage = current_url;
    firstPhoto = false;
}