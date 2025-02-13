//vip部分自己创建li
//本地储存歌单id,打开新页面在加载前document将id,post得到歌单歌曲渲染
const i = +localStorage.getItem('songerid')
console.log(i)
async function Playlist() {
    //歌单详情
    let r = await http({
        method: 'get',
        url: 'http://localhost:3000/artist/detail',
        params: {
            id: i
        }
    })
    console.log(r)
    const singerpic = r.data.artist.avatar
    const desname = r.data.artist.alias[0]
    const singername = r.data.artist.name
    const mv = r.data.artist.mvSize ?? ''
    const al = r.data.artist.albumSize ?? ''
    const show = r.data.preferShow ?? ''
    const des = ` 
                    <div class="playlistdescription">
                        <div class="playlistdescriptionleft">
                            <img src="${singerpic}">
                        </div>
                        <div class="playlistdescriptionright">
                            <div class="playlistdescriptionrightname">${singername}</div>
                            <div class="playlistdescriptionrightdes">
                                <div class="playlistdescriptionrightdesl">${desname}</div>
                                <div class="playlistdescriptionrightdesr">个人页</div>
                            </div>
                            <div class="playlistdescriptionrighta">
                                <div class="playlistdescriptionrightaplay">播放全部</div>
                                <div class="playlistdescriptionrightaadd">+ 关注</div>
                            </div>
                        </div>
                    </div>
                    <div class="playlistnav">
                        <div class="playlistnavleft">
                            <div class="playlistnavsong click">歌曲</div>
                            <div class="playlistnavsongnum click"></div>
                            <div class="playlistnavsongafter playlistnavcommentafter"></div>
                            <div class="playlistnavcomment">专辑</div>
                            <div class="playlistnavcommentnum">${al}</div>
                            <div class="playlistnavadd">MV</div>
                            <div class="playlistnavaddnum">${mv}</div>
                            <div class="playlistnavdatail">歌手详情</div>
                            <div class="playlistnavsim">相似歌手</div>
                            <div class="playlistnavplay">演出</div>
                            <div class="playlistnavplaynum">${show}</div>
                        </div>

                    </div>
                `
    const head = document.querySelector('.contenthead')
    head.innerHTML = des

    let res = await http({
        method: 'get',
        url: 'http://localhost:3000/artist/top/song',
        params: {
            id: i
        }
    })
    console.log(res)
    let authorname = ''
    const li = res.songs.map(
        (item, i) => {
            let author = ''
            if (item.ar.length > 1) {
                author = item.ar.map((tag, index) => {
                    if (index === item.ar.length - 1) {
                        return `<div class="author"><a>${tag.name}</a></div>`
                    }
                    return `<div class="author"><a>${tag.name}/</a></div>`
                }).join('')
                authorname = item.ar.map((nam, index) => {
                    if (index === item.ar.length - 1) {
                        return `${nam.name}`
                    }
                    return `${nam.name}\/`
                }
                ).join('')
                console.log(author)
                console.log(authorname)
            }
            else {
                author = `<div class="author"><a>${item.ar[0].name}</a></div>`
                authorname = item.ar[0].name
                console.log(author)
                console.log(authorname)
            }
            const time = item.dt
            const totalSeconds = Math.floor(time / 1000)
            const hours = Math.floor(totalSeconds / 3600)
            const minutes = Math.floor((totalSeconds % 3600) / 60)
            const seconds = totalSeconds % 60
            const formattedHours = String(hours).padStart(2, '0')
            const formattedMinutes = String(minutes).padStart(2, '0')
            const formattedSeconds = String(seconds).padStart(2, '0')
            const t = formattedHours === '00' ? `${formattedMinutes}:${formattedSeconds}` : `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
            localStorage.setItem(`time${i}`, t)
            localStorage.setItem(`songid${i}`, item.id)
            localStorage.setItem(`picid${i}`, item.al.picUrl)
            localStorage.setItem(`nameid${i}`, item.name)
            localStorage.setItem(`authorid${i}`, authorname)
            return ` <li data-id="${i}" data-pic="${item.al.picUrl}" data-name="${item.name}"  >
                            <div class="cplaylistlistid">
                                <div class="playlistlistid">${i + 1}</div>
                                <div class="playlistlistidplay"></div>
                            </div>
                            <div class="cplaylistlist2">
                                <div class="playlistlistpic">
                                    <img src="${item.al.picUrl}">
                                </div>
                                <div class="playlistlistdes">
                                    <div class="playlistlistdesname">${item.name}</div>
                                    <div class="playlistlistdesauthor">${authorname}</div>
                                </div>
                                <div class="playlistlist2none">
                                    <div class="cplaylistlist2none1" title="下载"></div>
                                    <div class="cplaylistlist2none2" title="收藏"></div>
                                    <div class="cplaylistlist2none3" title="评论"></div>
                                    <div class="cplaylistlist2none4" title="更多">...</div>
                                </div>
                            </div>
                            <div class="cplaylistlistsource" title="${item.al.name}">${item.al.name}</div>
                            <div class="cplaylistlistlike" title="喜欢"></div>
                            <div class="cplaylistlisttime">${t}</div>
                        </li>`}
    ).join('')
    const songs = document.querySelector('.playlistlist ul')
    songs.innerHTML = li
    const content = document.querySelector('.color')
    getImageMainColor(singerpic)
        .then((color) => {
            content.style.background = `linear-gradient(to bottom,${color},rgba(255, 250, 250,.1))`
        })

    songs.addEventListener('click', function (event) {
        if (event.target.closest('.playlistlist ul li')) {
            const li = event.target.closest('.playlistlist ul li');
            console.log(li.dataset.id)
            Play(+li.dataset.id)
            // document.querySelector('.foot').style.opacity = 1
        }
    })

}
Playlist()
function getImageMainColor(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const data = imageData.data;
            let r = 0, g = 0, b = 0;
            const totalPixels = img.width * img.height;
            for (let i = 0; i < totalPixels; i++) {
                r += data[i * 4];
                g += data[i * 4 + 1];
                b += data[i * 4 + 2];
            }
            r = Math.round(r / totalPixels);
            g = Math.round(g / totalPixels);
            b = Math.round(b / totalPixels);
            const mainColor = `rgba(${r}, ${g}, ${b},.2)`;
            resolve(mainColor);
        };
        img.onerror = (error) => {
            reject(error);
        };
    });
}
