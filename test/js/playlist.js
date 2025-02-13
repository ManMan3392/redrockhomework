//vip部分自己创建li
//本地储存歌单id,打开新页面在加载前document将id,post得到歌单歌曲渲染
const i = +localStorage.getItem('listid')
console.log(i)
async function Playlist() {
    //歌单详情
    let r = await http({
        method: 'get',
        url: 'http://localhost:3000/playlist/detail',
        params: {
            id: i
        }
    })
    console.log(r)
    const item = r.playlist
    const timestamp = item.createTime
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    let tagsHtml = ''
    if (item.tags.length > 1) {
        tagsHtml = item.tags.map((tag, i) => {
            if (i === item.tags.length - 1) {
                return `<div><a>${tag}</a></div>`
            }
            return `<div><a>${tag}/</a></div>`
        }).join('')
    }
    else {
        tagsHtml = `<div><a>${item.tags}</a></div>`
    }
    function num(c) {
        if (c >= 100000000) {
            const result = (c / 100000000).toFixed(1);
            return result.endsWith('.0') ? `${parseInt(result)}亿` : `${result}亿`;
        } else if (c > 10000) {
            const result = (c / 10000).toFixed(1);
            return result.endsWith('.0') ? `${parseInt(result)}万` : `${result}万`;
        }
        return c;
    }
    const count = num(item.playCount)
    const ccount = num(item.commentCount)
    const shareCount = num(item.shareCount)
    const des = `<div class="playlistdescription">
                    <div class="playlistdescriptionleftshadow"></div>
                    <div class="playlistdescriptionleft">
                    <div class="recommendlitopp"> ${count}</div>
                        <img src="${item.coverImgUrl}">
                    </div>
                    <div class="playlistdescriptionright">
                        <div class="playlistdescriptionrightname">${item.name}</div>
                        <div class="playlistdescriptionrightdes">
                            ${item.description ?? ''}
                        </div>
                        <div class="playlistdescriptionrightauthor">
                            <div class="playlistdescriptionrightauthorimg"><img src="${item.creator.avatarUrl}"></div>
                            <div class="playlistdescriptionrightauthorname">
                                ${item.creator.nickname}
                            </div>
                            <div class="playlistdescriptionrightauthortip">
                            <div>标签：</div>
                            </div>
                            <div class="playlistdescriptionrightauthortime"></div>
                            <div class="playlistdescriptionrightboxs">${formattedDate}创建</div>
                        </div>
                        <div class="playlistdescriptionrighta">
                            <div class="playlistdescriptionrightaplay">播放全部</div>
                            <div class="playlistdescriptionrightaadd"> ${item.shareCount}</div>
                            <div class="playlistdescriptionrightaload"> 下载</div>
                            <div class="playlistdescriptionrightamore">...</div>
                        </div>
                    </div>
                </div>
                <div class="playlistnav">
                    <div class="playlistnavleft">
                        <div class="playlistnavsong click">歌曲</div>
                        <div class="playlistnavsongnum click">${item.trackCount}</div>
                        <div class="playlistnavsongafter playlistnavcommentafter"></div>
                        <div class="playlistnavcomment">评论</div>
                        <div class="navcommentafter"></div>
                        <div class="playlistnavcommentnum">${ccount}</div>
                        <div class="playlistnavadd">收藏者</div>
                        <div class="playlistnavaddnum">${shareCount}</div>
                    </div>
                    <div class="playlistnavright">
                         搜索
                    </div>
                </div>`
    const head = document.querySelector('.contenthead')
    head.innerHTML = des
    const ta = document.querySelector('.playlistdescriptionrightauthortip')
    ta.insertAdjacentHTML('beforeend', tagsHtml)

    let res = await http({
        method: 'get',
        url: 'http://localhost:3000/playlist/track/all',
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

    // top.style.background = white
    getImageMainColor(item.coverImgUrl)
        .then((color) => {
            content.style.background = `linear-gradient(to bottom,${color},rgba(255, 250, 250,.1))`
        })
    const a = document.querySelector('.playlistnav')
    const hidden = document.querySelector('.tophidden')
    const h2 = document.querySelector('.tophidden h2')
    h2.innerHTML = document.querySelector('.playlistdescriptionrightname').innerHTML
    window.addEventListener('scroll', function () {
        const n = this.document.documentElement.scrollTop
        if (n >= a.offsetTop) {
            hidden.style.opacity = 1
        }
        else {
            hidden.style.opacity = 0
        }
    })
    songs.addEventListener('click', function (event) {
        if (event.target.closest('.playlistlist ul li')) {
            const li = event.target.closest('.playlistlist ul li');
            console.log(li.dataset.id)
            Play(+li.dataset.id)
            // document.querySelector('.foot').style.opacity = 1
        }
    })
    const playlistnavcomment = document.querySelector('.playlistnavcomment')
    playlistnavcomment.addEventListener('click', Comment)
    const playlistnavsong = document.querySelector('.playlistnavsong')
    playlistnavsong.addEventListener('click', function () {
        head.innerHTML = des
        ta.insertAdjacentHTML('beforeend', tagsHtml)
        const comments = document.querySelector('.playlistlist')
        comments.innerHTML = li
        document.querySelector('.playlistnavsongafter').classList.add('playlistnavcommentafter')
        document.querySelector('.navcommentafter').classList.remove('playlistnavcommentafter')
        document.querySelector('.playlisttop').style.display = 'block'
    })
}
Playlist()
async function Comment() {
    console.log(88)
    document.querySelector('.playlistnavsongafter').classList.remove('playlistnavsongafter')
    document.querySelector('.navcommentafter').classList.add('playlistnavcommentafter')
    let r = await http({
        method: 'get',
        url: 'http://localhost:3000/comment/playlist',
        params: {
            id: i,
        }
    })
    console.log(r)
    const comments = document.querySelector('.playlistlist')
    comments.innerHTML = `<div class="commentinput">
    <div>
        <textarea class="commentinputwrite" placeholder="说点什么吧"></textarea>
    </div>
    <div class="commentinputbottomleft">140</div>
    <div class="commentinputbottom">
        <div class="commentinputbottom1">#</div>
        <div>@</div>
        <div class="commentinputbottom3"></div>
        <button class="enter">发送</button>
    </div>
</div>
<div class="hotcomment">`
    const hotComment = document.querySelector('.hotcomment')
    const commentList = document.createElement('ul')
    commentList.classList.add('hotcommentlist')

    r.comments.forEach(item => {
        const url = item.user?.vipRights?.redplus?.iconUrl
        const vip = url ? `<img src="${url}">` : ''
        const listItem = document.createElement('li')
        listItem.innerHTML = `
        <div class="hotcommentlistl">
            <img src="${item.user.avatarUrl}">
        </div>
        <div class="hotcommentlistm">
            <div class="hotcommentlistmtop">
                <div class="hotcommentlistmtopname">${item.user.nickname}</div>
                <div class="hotcommentlistmvip">
                    ${vip}
                </div>
            </div>
            <div class="hotcommentlistmcomment">${item.content}</div>
            <div class="hotcommentlistbottom">${item.timeStr}</div>
        </div>
        <div class="hotcommentlistr">
        <div class="hotcommentlistrjubao">举报</div>
            <div class="hotcommentlistrgoodnum">${item.likedCount ?? ''}</div>
            <div class="hotcommentlistrgood"></div>
            <div class="hotcommentlistrpost"></div>
            <div class="hotcommentlistrcomment" data-id="${item.commentId}" data-name="${item.user.nickname}"></div>
        </div>
    `
        commentList.appendChild(listItem)
        document.querySelector('.playlisttop').style.display = 'none'
    })

    hotComment.appendChild(commentList)
    const twricommentinpute = document.querySelector('.commentinputwrite')
    const li = document.createElement('li')
    const enter = document.querySelector('.enter')
    twricommentinpute.addEventListener('input', function () {
        const commentinputbottomleft = document.querySelector('.commentinputbottomleft')
        let num = this.value.length
        commentinputbottomleft.innerHTML = 140 - num
    })
    let replyCommentId = null
    const hotcommentlistrcomment = document.querySelectorAll('.hotcommentlistrcomment');
    hotcommentlistrcomment.forEach(comment => {
        comment.addEventListener('click', function () {
            twricommentinpute.value = `@${this.dataset.name} `;
            replyCommentId = this.dataset.id;
        });
    });

    async function Create(commentText, flag, commentId) {
        let params = {
            t: flag,
            type: 2,
            id: i,
            content: commentText,
            timestamp: new Date(),
            cookie: 'NMTID=00OKfjnPvUbes_yakwOp-VF6KMzdlYAAAGUxQTybQ; _ntes_nnid=4564e2d8706da2bb63ac6e26e369b735,1738472223665; _ntes_nuid=4564e2d8706da2bb63ac6e26e369b735; WEVNSM=1.0.0; WNMCID=oozsvy.1738472223946.01.0; __snaker__id=2JiEsUXuvPMWMyIR; WM_TID=UYz5DCWQJtREUVFAQBaSdaFmUXH6n4o2; sDeviceId=YD-6upYLNm2CrxBEwAAAVODHN6yagK%2Bup1a; ntes_utid=tid._.q8VjTkJD0VtEVlUVFUbHIaBnAWSv5iHd._.0; WM_NI=bzfCbJu5yqV9KfI4B3mA0qDXkFqIeibcCuvJWlZCB%2BbBNzpMVczP2PNYP14HvyqC%2FqIHG4td2jkM6krPg3IDZ1qMo2DRmkQUvLGAnhMC07XmugtlwAIR4eHh6W7ycdmOSnE%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6ee97f2739bedaebae65cf7868ba7c44f869b8b82c76994bef9b7d942a78bbcb4e22af0fea7c3b92aa2a6aaa4e142b7ebb792d53389ba87d5c139af9f0092c754a99abfaae863a2bd8d96f54295b496a4c121a29e829bf34796bdb6b1b15c8e87a0d2b744b6a7bfa4ae7b8b9889d5f770f2b6a5aeb561b290a9d4cc509aefbfaeee3a888ea38cd45fb69489a2ed648f9d00d8db67b7b9bc8df64b8b8efc86cb64f689f99ae270af919d8fc837e2a3; __csrf=bafc2bff9817b53e090130fe78d1bacb; MUSIC_U=000F0DC273534F2044528A4C4AA1B418D32D016F0E3A4A7130197088AB8B7569484B0E3FBDACAF4F2E15444E384651AE0C92CD9A863F62B599C0BCA882EE1E388444DA2E65DC06C5EF248714C65A50FCE0572D97C25C1EB158B349D45C5ADDD5F5FB0EC2DB35F75287C8BC40DC8065FE5032E85FE33D6BEB74148D0A996DFB31715727FE0EB599FD50AA3FC9845796562E7DFF3A9909ED3FCBA0155EA98F56DC39027EEE04794768850E006C2AF8FDB65455994F6844F70D3FBBF57E16992432038567B6F9C97D506991C01D8EE367D9337FC63B885896EB7A29729CF9B5FA0ADC22DF007936422A1361FD9D5E645FD511B1CF2332E5A500FEBAB93129BFA857D459C060BF9C5C2887CF998DDB38A855851FEA05268A11FEF97746668BFB718CF5AB082F5583DB7A8D8E5A1ED413B985D145751BF80B8412FD36739685FE9090D9E5B8B80169F8FC89D0301DC5315D5999121A4E5F36109C617C38188C172DC6EA; ntes_kaola_ad=1; _iuqxldmzr_=32; JSESSIONID-WYYY=woYkaQcR22W3RBGaMsoOg61ePtgICza1i24cYWYu3VknAUxGfhupJ8B5VQ6kNHSmUh%2FDKI%2BrlCpsh8eDvRZTx6BPIJ3kWxKio4oq%2B6BPJ8N1w9DjptGVIlqlahSBuWckrpA%2BlYMAKfNZ49SOThJ%2BMiBr%2Fiu%5Cf9M%5Cy%2FSE%2FqiIvhj%2F9yrI%3A1738919211144; gdxidpyhxdE=5WLLZziM%2BixdT6moOtRDBZl6459z6ueGeOVV%2FmIBE32GTjJeM2y9g909hqmZs5bI1p5vDS4QjbB6GVHakgOqdYSOm8prya%5CvS1MuPtbPmDYafW7ZPnZoHpMB4f5Oxqr0vs9W7%5C6vX7Bd4MSM%2BCMuNuOaXJxBzyQQOLxM%2BXl%2B6kZ6e%2Bg1%3A1738918940129'
        }
        if (flag == 2) {
            params.commentId = commentId
        }
        let r = await http({
            method: 'get',
            url: 'http://localhost:3000/comment',
            params,
        })
        console.log(r)
    }
    enter.addEventListener('click', function () {
        if (twricommentinpute.value.trim()) {
            const commentText = twricommentinpute.value.trim();
            if (commentText) {
                if (replyCommentId) {
                    Create(commentText, 2, replyCommentId);
                } else {
                    Create(commentText, 1);
                }
                twricommentinpute.value = ''
                replyCommentId = null
            }
        }
    })

    twricommentinpute.addEventListener('keyup',
        function (e) {
            if (e.key === 'Enter') {
                if (twricommentinpute.value.trim()) {
                    const commentText = twricommentinpute.value.trim();
                    if (commentText) {
                        if (replyCommentId) {
                            Create(commentText, 2, replyCommentId);
                        } else {
                            Create(commentText, 1);
                        }
                        twricommentinpute.value = ''
                        replyCommentId = null
                    }
                }
            }
        })


}
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
