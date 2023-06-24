// 待页面加载完毕

window.addEventListener('load', function () {
    //获取输入框的value值

    let search_value = document.querySelector(".search-input");

    //为这个头部搜索框添加API
    search_value.addEventListener('input', function () {
        //搜索框必须是有数据才能搜索
        if (search_value.value !== "") {
            //使用JSONP获取突破同源策略
            let script_baidu = document.createElement("script")

            script_baidu.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=38516,36543,38687,38879,38796,38792,38844,38831,38803,38826,38838,38639,26350,22160&wd=${search_value.value}&req=2&csor=1&pwd=h&cb=baidu_test&_=1687518950114`;

            document.body.appendChild(script_baidu);

            script_baidu.onload = function () {
                script_baidu.remove();
            }
        } else {
            document.querySelector(".search-results").style.display = "none";
        }

    });


    //获取免费音乐网站
    fetch(`http://localhost:5000/data`).then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject({
                status:res.status,
                statusText:res.statusText
            });
        }
    }).then(res => {
        console.log(res);
        //获取成功，渲染页面
        let ul = document.querySelector("#myDropdown");
        ul.innerHTML = res.map(res => {
            return `
            <li><a href="${res.music_url}" target="_blank">${res.music_name}</a></li>
            `;
        }).join('');
    }).catch(err => {
       console.log("获取免费音乐列表失败");
    })


});

















//播放函数，请调用前确保页面已有数据
function playMusic() {
    let music_tbody = document.querySelectorAll("#music_tbody tr");
    for (let i = 1; i < music_tbody.length; i++) {
        music_tbody[i].addEventListener('click', function () {
            let music_ = music_tbody[i].querySelector("audio");
            music_tbody[i].style.backgroundColor="#2ecc71";
            music_.play();
        });
    }
};



//音乐时间解析函数,调用前请确定页面音乐区已有数据，里面已内置音乐进度条模块
function music_Timejx() {
    let music_tbody = document.querySelectorAll("#music_tbody tr");

    for (let i = 0; i < music_tbody.length; i++) {
        //获取本次I的tr里面的audio URL
        let audiourl = music_tbody[i].querySelector("audio");
        if (audiourl != null) {
            startProgressTimer(audiourl);
            audiourl.addEventListener('loadedmetadata', function () {
                let duration = Math.floor(audiourl.duration);
                //音乐解析成功返回音乐时长111
                let str = duration.toString();
                // str.slice(0,1)+ "分" + str.slice(1,)+"秒"
                let music_time = music_tbody[i].querySelectorAll("td")[2];
                music_time.innerHTML = str.slice(0, 1) + "分" + str.slice(1,) + "秒";
            });
        }
    }
}

//音乐进度条模块
function startProgressTimer(audio) {
    var progressInterval = setInterval(function () {
        var progressBar = document.querySelector('.music-progress-bar');
        var currentTime = audio.currentTime;
        var duration = audio.duration;
        var progress = (currentTime / duration) * 100;
        progressBar.style.width = progress + '%';
    }, 1000); // 每秒更新一次进度条

    audio.addEventListener('ended', function () {
        clearInterval(progressInterval); // 音乐播放结束，清除定时器
    });
}