// 動畫完成時同時完成更新時間
window.setInterval("getNowTime()", 3000);

//Get Now-Time
function getNowTime() {
    let myDate = new Date();
    // 取得現在時間的小時與分鐘
    let hours = myDate.getHours();
    let minutes = (myDate.getMinutes() < 10 ? "0" : "") + myDate.getMinutes();
    console.log(`現在時間：${hours}點${minutes}分`);

    //顯示於html中
    document.getElementsByClassName("hour")[0].innerHTML = hours;
    document.getElementsByClassName("minute")[0].innerHTML = minutes;
}

// button操作：
//符號
const screenShow = document.querySelector(".screenShow");
const ac = document.querySelector(".ac");
const pm = document.querySelector(".pm");
const percent = document.querySelector(".percent");

//運算操作
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const multiplication = document.querySelector(".multiplication");
const division = document.querySelector(".division");
const equal = document.querySelector(".equal");

// 數字
const decimal = document.querySelector(".decimal");
const number0 = document.querySelector(".number-0");
const number1 = document.querySelector(".number-1");
const number2 = document.querySelector(".number-2");
const number3 = document.querySelector(".number-3");
const number4 = document.querySelector(".number-4");
const number5 = document.querySelector(".number-5");
const number6 = document.querySelector(".number-6");
const number7 = document.querySelector(".number-7");
const number8 = document.querySelector(".number-8");
const number9 = document.querySelector(".number-9");

// 為了讓每個數字的元素都產生各自的監聽器
const numberArray = [
    number0,
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
    number7,
    number8,
    number9,
];

// 為了四則運算的變數暫存
let cacheStringNum = null;
let cacheOperator = null;
let tempNum = [];

// 為每個數字按鈕新增監聽器
for (let i = 0; i < numberArray.length; i++) {
    const num = numberArray[i];
    num.addEventListener("click", () => {
        handleNumberClick(i.toString());
    });
}

const getValueAsStr = () => {
    return screenShow.textContent.split(",").join("");
};

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

// 處理整數位數與小數位的限制
const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] == ".") {
        screenShow.textContent += ".";
        return;
    }
    const [wholeNumber, decimalString] = valueStr.split(".");
    console.log(`整數位為：${wholeNumber}\n小數位為：${decimalString}`);

    if (decimalString) {
        screenShow.textContent =
            parseFloat(wholeNumber).toLocaleString() + "." + decimalString;
    } else {
        screenShow.textContent = parseFloat(wholeNumber).toLocaleString();
    }
    // 檢視變且修改screenShow顯示區的css
    let screenNumLen = screenShow.textContent.split(",").join("").length;
    if (screenNumLen > 5 && screenNumLen <= 9) {
        document.getElementById("screenShow").style = "font-size:60px;";
    } else if (screenNumLen == 10) {
        newStr = document
            .getElementById("screenShow")
            .innerText.substring(0, 12)
            .split(",")
            .join("");
        screenShow.textContent = parseFloat(newStr).toLocaleString();
    } else {
        document.getElementById("screenShow").style = "font-size:100px;";
    }
};

// 點擊數字按鈕
const handleNumberClick = (numStr) => {
    console.log(`點到的數字為：${numStr}`);
    const currentClickString = getValueAsStr();
    console.log(cacheStringNum);
    if (currentClickString == "0") {
        setStrAsValue(numStr);
    } else {
        setStrAsValue(currentClickString + numStr);
    }
    //檢視變且修改screenShow顯示區的css
    let screenNumLen = screenShow.textContent.split(",").join("").length;
    if (screenNumLen > 5 && screenNumLen <= 9) {
        document.getElementById("screenShow").style = "font-size:60px;";
    } else if (screenNumLen == 10) {
        newStr = document
            .getElementById("screenShow")
            .innerText.substring(0, 12)
            .split(",")
            .join("");
        screenShow.textContent = parseFloat(newStr).toLocaleString();
    } else {
        document.getElementById("screenShow").style = "font-size:100px;";
    }
    //修改ac的顯示樣式
    document.getElementById("ac").innerText = "C";
};
// 讀取快取的四則運算並返回運算後的String
const getResultString = () => {
    let newValueNum;
    const currentValueNum = getValueAsNum();
    const chaeNumber = parseFloat(cacheStringNum);
    if (cacheOperator == "plus") {
        newValueNum = chaeNumber + currentValueNum;
    } else if (cacheOperator == "minus") {
        newValueNum = chaeNumber - currentValueNum;
    } else if (cacheOperator == "multiplication") {
        newValueNum = chaeNumber * currentValueNum;
    } else if (cacheOperator == "division") {
        newValueNum = chaeNumber / currentValueNum;
    }
    return newValueNum.toString();
};

// 監聽點擊運算按鈕
const handleOperationClick = (operation) => {
    const currentValueString = getValueAsStr();
    console.log(currentValueString);
    if (!cacheStringNum) {
        cacheStringNum = currentValueString;
        cacheOperator = operation;
        setStrAsValue("0");
        return;
    }
    cacheStringNum = getResultString();
    cacheOperator = operation;
    setStrAsValue("0");
};

// 監聽小數點按鈕
decimal.addEventListener("click", () => {
    const currentClickString = getValueAsStr();
    // 輸出沒有小數點才可以輸入
    if (!currentClickString.includes(".")) {
        setStrAsValue(currentClickString + ".");
    }
});

// 監聽AC按鈕
ac.addEventListener("click", () => {
    cacheStringNum = null;
    cacheOperator = null;
    screenShow.textContent = "0";
    document.getElementById("ac").innerText = "AC";
    // 調整screen css
    document.getElementById("screenShow").style = "font-size:100px;";
    // 調整按鈕css
    document.getElementById("plus").style = "color: white;background: #f1a33c;";
    document.getElementById("minus").style =
        "color: white;background: #f1a33c;";
    document.getElementById("multiplication").style =
        "color: white;background: #f1a33c;";
    document.getElementById("division").style =
        "color: white;background: #f1a33c;";
});

// 監聽+/- 按鈕
pm.addEventListener("click", () => {
    if (screenShow.textContent.includes("-")) {
        screenShow.textContent = screenShow.textContent.substring(1);
    } else {
        screenShow.textContent = "-" + screenShow.textContent;
    }
});

// 監聽％按鈕
percent.addEventListener("click", () => {
    screenShow.textContent = (
        parseFloat(screenShow.textContent) / 100
    ).toString();
    cacheStringNum = null;
    cacheOperator = null;
    let screenNumLen = screenShow.textContent.split(",").join("").length;
    if (screenNumLen > 5 && screenNumLen < 9) {
        document.getElementById("screenShow").style = "font-size:60px;";
    } else {
        document.getElementById("screenShow").style = "font-size:100px;";
    }
});

// 監聽四則運算按鈕
plus.addEventListener("click", () => {
    handleOperationClick("plus");
    // 調整按鈕css
    document.getElementById("plus").style = "color: #f1a33c;background: white;";
    document.getElementById("minus").style =
        "color: white;background: #f1a33c;";
    document.getElementById("multiplication").style =
        "color: white;background: #f1a33c;";
    document.getElementById("division").style =
        "color: white;background: #f1a33c;";
});

minus.addEventListener("click", () => {
    handleOperationClick("minus");
    // 調整按鈕css
    document.getElementById("plus").style = "color: white;background: #f1a33c;";
    document.getElementById("minus").style =
        "color: #f1a33c;background: white;";
    document.getElementById("multiplication").style =
        "color: white;background: #f1a33c;";
    document.getElementById("division").style =
        "color: white;background: #f1a33c;";
});

multiplication.addEventListener("click", () => {
    handleOperationClick("multiplication");
    // 調整按鈕css
    document.getElementById("plus").style = "color: white;background: #f1a33c;";
    document.getElementById("minus").style =
        "color: white;background: #f1a33c;";
    document.getElementById("multiplication").style =
        "color: #f1a33c;background: white;";
    document.getElementById("division").style =
        "color: white;background: #f1a33c;";
});

division.addEventListener("click", () => {
    handleOperationClick("division");
    // 調整按鈕css
    document.getElementById("plus").style = "color: white;background: #f1a33c;";
    document.getElementById("minus").style =
        "color: white;background: #f1a33c;";
    document.getElementById("multiplication").style =
        "color: white;background: #f1a33c;";
    document.getElementById("division").style =
        "color: #f1a33c;background: white;";
});

// 監聽"="
equal.addEventListener("click", () => {
    if (cacheStringNum) {
        let newValueStr = getResultString();
        // 按下等於後的數字切割
        if (newValueStr.length > 9) {
            newValueStr = newValueStr.substring(0, 9);
        }
        console.log(newValueStr);
        // 按下等於後的css調整
        if (newValueStr.length > 5 && newValueStr.length < 9) {
            document.getElementById("screenShow").style = "font-size:60px;";
        } else {
            document.getElementById("screenShow").style = "font-size:100px;";
        }
        setStrAsValue(newValueStr);
        cacheStringNum = null;
        cacheOperator = null;
    }
    // 調整按鈕css
    document.getElementById("plus").style = "color: white;background: #f1a33c;";
    document.getElementById("minus").style =
        "color: white;background: #f1a33c;";
    document.getElementById("multiplication").style =
        "color: white;background: #f1a33c;";
    document.getElementById("division").style =
        "color: white;background: #f1a33c;";
});

// 點擊icon跳轉
const githubIcon = document.querySelector("#github");
githubIcon.addEventListener("click", () => {
    window.open("https://github.com/Michael-Yan-wun");
});

const gitbookIcon = document.querySelector("#gitbook");
gitbookIcon.addEventListener("click", () => {
    window.open("https://app.gitbook.com/@yanwun1214/s/tensorflow2-0/");
});

const facebookIcon = document.querySelector("#facebook");
facebookIcon.addEventListener("click", () => {
    window.open("https://www.facebook.com/profile.php?id=100001081552642");
});

const instagramIcon = document.querySelector("#instagram");
instagramIcon.addEventListener("click", () => {
    window.open("https://www.instagram.com/yan_wun/");
});
