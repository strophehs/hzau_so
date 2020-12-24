function $$(id) {
    return document.getElementById(id);
}
let file = new XMLHttpRequest();
let content;
let text;
let result = [];
let show_res = [];
let node = $$("result");

function parse_file() {
    content = file.responseText;
    result = content.split('\n');
    for (let i = 0; i < result.length; i++) {
        show_res[i] = result[i].split(',~');
    }
    let pos = -1;
    for (let i = 0; i < result.length; i++) {
        if (show_res[i][0] == text) {
            pos = i;
            break;
        }
    }
    if (pos === -1) {
        node.innerHTML = "查询不到指定信息。";
        return;
    }
    let show_txt = "";
    let size = show_res[pos].length - 3;
    show_txt += "<fieldset><legend>" + show_res[pos][0] + "</legend>队伍名称：" + show_res[pos][1] + "<br>回访学校：" + show_res[pos][2] + '<br>';
    let mem_num = size / 8;
    show_txt += "队伍共计 <strong>" + mem_num + "</strong> 人</fieldset><br>";
    for (let i = 0; i < mem_num; i++) {
        show_txt += "<details><summary>" + show_res[pos][i * 8 + 3] + "（" + show_res[pos][i * 8 + 4] + "）</summary>";
        let captain = ["身份证号", "学院", "专业", "联系方式", "QQ", "学号"];
        for (let j = 2; j < 8; j++) {
            show_txt += captain[j - 2] + "：" + show_res[pos][i * 8 + 3 + j] + "<br>";
        }
        show_txt += "</details>";
    }
    node.innerHTML = show_txt;
}

function open_file() {
    if (file) {
        file.open("GET", "http://strophehs.github.io/hzau_so/info.csv", true);
        file.send(null);
        file.onreadystatechange = parse_file;
    }
}

function search() {
    text = $$("verifyId").value;
    if (text == "") {
        node.innerHTML = "请输入查询内容。";
        return;
    }
    open_file();
}