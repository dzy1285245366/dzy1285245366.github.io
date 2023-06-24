//正则匹配规则
// {
//     "用户名:"长度在4个,不管是任何东西,正则表达式：^\w{4,}$
//     "学号":必须是6个整数,正则表达式：^\d+{6}$
//     "密码:"不能有中文,并且只能有一个.符号,长度限制在6到12个正则表达式：^(?!.[\u4e00-\u9fa5])(?=...*)\w{6,12}$
// }
let zzyhm = /^[0-9a-zA-Z]{4}$/;

let zzxh = /^\d{6}$/;

let zzmm = /^(?!.[\u4e00-\u9fa5])(?=...*)\w{6,12}$/;
let username = document.querySelector("#username");

username.addEventListener('blur', function () {


    if (zzyhm.test(username.value)) {
        document.querySelector("#username-error").innerHTML = "正确";
        document.querySelector("#username-error").style.color = "green";
    } else {
        document.querySelector("#username-error").innerHTML = "长度在4个字符以上，不限制字符内容";
        document.querySelector("#username-error").style.color = "red";
    }
});

let student_id = document.querySelector("#student-id");

student_id.addEventListener('blur', function () {


    if (zzxh.test(student_id.value)) {
        document.querySelector("#student-id-error").innerHTML = "正确";
        document.querySelector("#student-id-error").style.color = "green";
    } else {
        document.querySelector("#student-id-error").innerHTML = "请输入6个整数";
        document.querySelector("#student-id-error").style.color = "red";
    }
});

let password = document.querySelector("#password");

password.addEventListener('blur', function () {


    if (zzmm.test(password.value)) {
        document.querySelector("#password-error").innerHTML = "正确";
        document.querySelector("#password-error").style.color = "green";
    } else {
        document.querySelector("#password-error").innerHTML = "不能包含中文字符，只能有一个点号符号，长度限制在6到12个字符";
        document.querySelector("#password-error").style.color = "red";
    }
});

let togo = document.querySelector("#togo");

togo.addEventListener('click', function () {
    if (zzyhm.test(username.value) && zzxh.test(student_id.value) && zzmm.test(password.value) === true) {
        //正则匹配成功处理逻辑
        //判断数据库是否存在学号一样的信息
        fetch(`http://localhost:5000/usertestinpassword/?student=${student_id.value}`).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject({
                    status: res.status,
                    statusText: statusText
                });
            }
        })
            .then(res => {
                //当请求成功,查看返回的数据是否为空
                if (res.length <= 0) {
                    console.log(res);
                    //数据库没有该用户,可以注册
                    fetch(`http://localhost:5000/usertestinpassword`, {
                        method: "post",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            name: username.value,
                            password: password.value,
                            student: student_id.value
                        })
                    }).then(res => {
                        // alert("注册成功,点击确定返回");

                        let loading = document.getElementById('loading');

                        // 显示加载状态
                        /* filter: grayscale(100%);
                        pointer-events: none; */
                        // document.querySelector("body").style.filter="grayscale(100%)";
                        // document.querySelector("body").style. pointerEvents="none";
                        loading.style.display = 'flex';

                        setTimeout(function () {
                            // 完成加载后的操作
                            loading.style.display = 'none'; // 隐藏加载状态
                            location.href = "登录.html"
                        }, 2000); // 假设加载耗时为2秒

                    });
                } else {
                    //数据库有该用户,不可以注册
                    alert("该用户已注册");
                }

            }).catch(err => {
                //当请求失败
                alert("发生了错误,错误码:", err.status);
            })
    } else {
        //正则匹配失败处理逻辑
        alert("请正确输入信息");
    }
});