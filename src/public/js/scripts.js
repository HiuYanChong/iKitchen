// Empty JS for your own code to be here

$ = function(id) {
    return document.getElementById(id);
}

$$ = function(selector) {
    return document.querySelectorAll(selector);
}

window.onload = function() {
    $("forget-name-pw").onclick = function() {
        alert("请联系系统数据库管理员");
    };
}
