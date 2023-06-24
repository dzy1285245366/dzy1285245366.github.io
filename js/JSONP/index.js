
//百度搜索请求接口函数,当搜索完成时立即向用户展示
function baidu_test(data) {
    if (data.q !== "") {
        let ul = document.querySelector(".search-results");
        ul.style.display = "block";
        ul.innerHTML = data.g.map(res => {
            return `
                <li>${res.q}</li>
            `;
        }).join('');

        //当搜索出来后给这些li添加clock事件

        let search_list_li = document.querySelector(".search-results").querySelectorAll("li");

        for (let i = 0; i < search_list_li.length; i++) {
            search_list_li[i].addEventListener('click', function () {
                window.open(`https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${search_list_li[i].innerHTML}&fenlei=256&rsv_pq=0xaffd09430006a2a4&rsv_t=1828UtA03e5Km52BERYAttOVQKEIOas%2BLWPdZF4hFE39JSp7Z8hfbyuqUXu7&rqlang=en&rsv_enter=1&rsv_dl=ts_0&rsv_sug3=11&rsv_sug1=10&rsv_sug7=101&rsv_sug2=1&rsv_btype=i&prefixsug=%25E5%2592%258C&rsp=0&inputT=3852582&rsv_sug4=3852582`, "_blank");
            });
        }
    }

}

//搜索搜索请求接口函数,当搜索完成时立即向用户展示
function wdPRO_test(data) {//豌豆PRO
    if (data.q !== "") {

        let ul = document.querySelector(".video-search-list");
        ul.style.display = "block";
        let li = data.s.map(res => {
            return `
                <li>${res}</li>
            `;
        }).join('');
        ul.innerHTML = li;
        // 当搜索出来后给这些li添加clock事件

        let search_list_li = ul.querySelectorAll("li");

        for (let i = 0; i < search_list_li.length; i++) {
            search_list_li[i].addEventListener('click', function () {
                fetch(`https://api.json.wandou9.xyz:8036/movie/getsearchlist/keywords/${search_list_li[i].innerHTML}/page/1/rows/20.json`).then(res => {

                    if (res.ok) {
                        return res.json();
                    } else {
                        return Promise.reject({
                            status: res.status,
                            statusText: res.statusText
                        });
                    }
                }).then(res => {
                    // console.log(res);
                    //需要展示在页面中，将封装一个模块以免代码混乱
                    print_video(res);
                }).catch(err => {

                    console.log('err', err);
                })
            });
        }
    }

}

//本模块函数只支持上面的视频接口打印，其它模块调用可能引起失败
function print_video(data) {
    console.log(data);
    let ul = document.querySelector(".video-search-results");

    ul.innerHTML = data.data.map(res => {
        return `
        <li>
        <div class="video-info">
          <h3 class="video-title">${res.movie_name}</h3>
          <p class="video-description">${res.movie_tags}</p>
          <span class="video-duration">评分：${res.movie_rate}</span>
        </div>
        <a href="H/video.html"id="${res.movie_id}" target="_blank" >
        <div class="video-thumbnail">
        <img src="${res.movie_img_url}" alt="视频封面">
        </div>
        </a>
      </li>
        `;
    }).join('');

    //为每一个a标签单独添加事件以方便在跳转其它页面的时候携带参数
    let a = ul.querySelectorAll("a");

    for(let i =0; i < a.length; i++) {
        a[i].addEventListener('click',function() {
            // console.log(a[i].id);
            location.href = `H/video.html?movID=${a[i].id}`;
        });
    }
}