//当用户是登录进来的时候
let url = location.href;

let str = url.toString();

let getid = str.indexOf("id");//数字


if (getid != -1) {
    //获取ID索引成功
    let userid = str.slice(getid,);

    fetch(`http://localhost:5001/usertestinpassword/?${userid}`).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject({
                status: res.status,
                statusText: res.statusText
            });
        }
    }).then(res => {
        let user_content = document.querySelector(".user-container");
        let usera = document.querySelectorAll(".user-link");
        for (let i = 0; i < usera.length; i++) {
            user_content.removeChild(usera[i]);
        }
        let span = document.createElement("span");
        span.classList.add("user-link");
        span.innerHTML = res[0].name;
        user_content.insertBefore(span,user_content.firstElementChild);
        document.querySelector(".avatar").src = "icon/shcool.ico";
        
    }).catch(err => {
        // alert('error', err);
        console.log(err,"无法连接数据库");
    })


}

