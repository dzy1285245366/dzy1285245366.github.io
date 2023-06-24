fetch(`https://api.qqsuu.cn/api/dm-randmusic?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C&format=json&apiKey=c0e822dedb1e13f1d9359700bb0ad0fc`).then(res => {
    if (res.ok) {
        return res.json();
    } else {
        console.log("向大米音乐发送get请求失败");
    }
}).then(res => {
    //解析大米音乐API成功，开始把音乐打印到页面中去。
    printli(res);
});

//该函数只负责渲染到页面中，里面已内置播放模块、时间解析模块
function printli(data) {
    let music_tbody = document.querySelector("#music_tbody");
    let new_music_tr = document.createElement("tr");
    new_music_tr.innerHTML = `
    <audio src="${data.data.url}">
    <td>${data.data.name}</td>
    <td>${data.data.artistsname}</td>
    <td>待解析</td>
    <td>
      <div class="music-progress">
        <div class="music-progress-bar""></div>
      </div>
    </td>
    `;
    music_tbody.appendChild(new_music_tr);
    playMusic();
    music_Timejx();
}



