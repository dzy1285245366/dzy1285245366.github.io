let gettogo = document.querySelector("#gettogo");

let username =  document.querySelector("#username");

let password =  document.querySelector("#password");

gettogo.addEventListener('click',function() {
    //首先对两个输入框进行空校验



   if(password.value != "" && username.value != "") {
    //判断完成,以保证输入框中存在数据
    ifdata();
   } else {
    //并没有输入内容
    document.querySelector("#username-error").innerHTML = "请输入内容";

    document.querySelector("#password-error").innerHTML = "请输入内容";
   }

});

//本函数是对数据进行校验,由于有名函数不会自启动,以此可以放心的写到外面
function ifdata() {
    fetch(`http://localhost:5000/usertestinpassword/?student=${username.value}&password=${password.value}`).then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject({
                status:res.status,
                statusText:res.statusText
            });
        }
    }).then(res => {
        //数据返回成功
        console.log(res);
        location.href = `../index.html?id=${res[0].id}`;

    }).catch(err => {
        //数据返回失败
        alert('error,学号或密码错误',err);
    })
}