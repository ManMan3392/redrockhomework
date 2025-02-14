async function http(obj) {
    let { method, url, params, data } = obj
    if (params) {
        let str = new URLSearchParams(params).toString()
        url += '?' + str
    }
    let res
    if (data) {
        res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    else {
        res = await fetch(url)
    }
    return res.json()
}
function getRandomColor() {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`
}
async function Login() {
    let rss = await http({
        method: 'get',
        url: 'http://localhost:3000/user/detail',
        params: {
            uid: 8431895682,
            cookie: '000F0DC273534F2044528A4C4AA1B418D32D016F0E3A4A7130197088AB8B7569484B0E3FBDACAF4F2E15444E384651AE0C92CD9A863F62B599C0BCA882EE1E388444DA2E65DC06C5EF248714C65A50FCE0572D97C25C1EB158B349D45C5ADDD5F5FB0EC2DB35F75287C8BC40DC8065FE5032E85FE33D6BEB74148D0A996DFB31715727FE0EB599FD50AA3FC9845796562E7DFF3A9909ED3FCBA0155EA98F56DC39027EEE04794768850E006C2AF8FDB65455994F6844F70D3FBBF57E16992432038567B6F9C97D506991C01D8EE367D9337FC63B885896EB7A29729CF9B5FA0ADC22DF007936422A1361FD9D5E645FD511B1CF2332E5A500FEBAB93129BFA857D459C060BF9C5C2887CF998DDB38A855851FEA05268A11FEF97746668BFB718CF5AB082F5583DB7A8D8E5A1ED413B985D145751BF80B8412FD36739685FE9090D9E5B8B80169F8FC89D0301DC5315D5999121A4E5F36109C617C38188C172DC6EA'
        }
    })
    console.log(rss)
    const touxiang = document.querySelector('.touxiang img')
    touxiang.src = `${rss.profile.avatarUrl}`
    const uname = document.querySelector('.name')
    uname.innerHTML = `${rss.profile.nickname}`

}
Login()
async function Mine() {
    // let re = await http({
    //     method: 'get',
    //     url: 'http://localhost:3000/user/subcount',
    //     params: {
    //         cookie: '000F0DC273534F2044528A4C4AA1B418D32D016F0E3A4A7130197088AB8B7569484B0E3FBDACAF4F2E15444E384651AE0C92CD9A863F62B599C0BCA882EE1E388444DA2E65DC06C5EF248714C65A50FCE0572D97C25C1EB158B349D45C5ADDD5F5FB0EC2DB35F75287C8BC40DC8065FE5032E85FE33D6BEB74148D0A996DFB31715727FE0EB599FD50AA3FC9845796562E7DFF3A9909ED3FCBA0155EA98F56DC39027EEE04794768850E006C2AF8FDB65455994F6844F70D3FBBF57E16992432038567B6F9C97D506991C01D8EE367D9337FC63B885896EB7A29729CF9B5FA0ADC22DF007936422A1361FD9D5E645FD511B1CF2332E5A500FEBAB93129BFA857D459C060BF9C5C2887CF998DDB38A855851FEA05268A11FEF97746668BFB718CF5AB082F5583DB7A8D8E5A1ED413B985D145751BF80B8412FD36739685FE9090D9E5B8B80169F8FC89D0301DC5315D5999121A4E5F36109C617C38188C172DC6EA'
    //     }
    // })
    // console.log(re)
    let r = await http({
        method: 'get',
        url: 'http://localhost:3000/user/playlist',
        params: {
            uid: 8431895682,
            cookie: '000F0DC273534F2044528A4C4AA1B418D32D016F0E3A4A7130197088AB8B7569484B0E3FBDACAF4F2E15444E384651AE0C92CD9A863F62B599C0BCA882EE1E388444DA2E65DC06C5EF248714C65A50FCE0572D97C25C1EB158B349D45C5ADDD5F5FB0EC2DB35F75287C8BC40DC8065FE5032E85FE33D6BEB74148D0A996DFB31715727FE0EB599FD50AA3FC9845796562E7DFF3A9909ED3FCBA0155EA98F56DC39027EEE04794768850E006C2AF8FDB65455994F6844F70D3FBBF57E16992432038567B6F9C97D506991C01D8EE367D9337FC63B885896EB7A29729CF9B5FA0ADC22DF007936422A1361FD9D5E645FD511B1CF2332E5A500FEBAB93129BFA857D459C060BF9C5C2887CF998DDB38A855851FEA05268A11FEF97746668BFB718CF5AB082F5583DB7A8D8E5A1ED413B985D145751BF80B8412FD36739685FE9090D9E5B8B80169F8FC89D0301DC5315D5999121A4E5F36109C617C38188C172DC6EA'
        }
    })
    console.log(r)
    let list = ''
    for (let i = 1; i < r.playlist.length; i++) {
        list += `<li data-id="${r.playlist[i].id}">
        <a href="playlist.html">
<div class="gedanpic">
                       <img src="${r.playlist[i].coverImgUrl}">
                    </div>
                   <div class="gedanname">${r.playlist[i].name}</div>
                   </a>
                   </li>`
    }
    const ul = document.querySelector('.create ul')
    ul.innerHTML = list
    ul.addEventListener('click', function (event) {
        if (event.target.closest('li')) {
            const recommendli = event.target.closest('li')
            console.log(recommendli.dataset.id)
            localStorage.setItem('listid', recommendli.dataset.id)
        }
    })
    const love = document.querySelector('.lovelist')
    love.dataset.id = `${r.playlist[0].id}`
    love.addEventListener('click', function () {
        localStorage.setItem('listid', love.dataset.id)
    })
}
Mine()
// const unlogin = document.querySelector('.unlogin')
// const loginclose1 = document.querySelector('.loginclose1')
// const login = document.querySelector('.login')
// loginclose1.addEventListener('click', function () {
//     login.style.display = 'none'
// })
// unlogin.addEventListener('click', function () {
//     login.style.display = 'block'
//     Login()
// }

// )







const back = document.querySelector('.topleftl')
back.addEventListener('click', function () {
    history.back()
})
const search = document.querySelector('.search input')
const toplist = document.querySelector('.toplist')
timeID = 0
search.addEventListener('focus', function () {
    clearTimeout(timeID)
    timeID = setTimeout(function () {
        toplist.style.display = 'block'
    }, 400)
    // const history = document.querySelector('.history')
    //const topsearchhistory = document.querySelector('.hidden')
    // const searchbutton = document.querySelector('.search a')
    // const s = localStorage.getItem('search')
    // if (s) {
    // topsearchhistory.style.display = 'block'

    //     const lis = document.createElement('li')
    //     lis.innerHTML = s
    //     history.appendChild(lis)

    //}
    updateHistoryDisplay()
}
)
search.addEventListener('blur', function () {
    clearTimeout(timeID)
    timeID = setTimeout(function () {
        toplist.style.display = 'none'
    }, 400)

}
)
const audio = document.querySelector('audio')
const volumeSlider = document.getElementById('volumeSlider')
volumeSlider.addEventListener('input', function (e) {
    const value = e.target.value;
    const volumeafternum = document.querySelector('.volumeafternum')
    const nums = `${value * 100}%`
    volumeSlider.style.backgroundSize = `${value * 100}% 100%`
    audio.volume = parseFloat(value)
    console.log(nums)
    volumeafternum.innerHTML = nums
})
const volumeSliders = document.getElementById('volumeSliders')
const volumeafternum = document.querySelector('.volumeafternum')
volumeSliders.addEventListener('input', function (e) {
    const value = e.target.value
    volumeSliders.style.backgroundSize = `${value * 100}% 100%`
    audio.volume = parseFloat(value)
    volumeafternum.innerHTML = `${value * 100}%`
})
const playPauseBtn = document.querySelector('.footplaybuttonplay')
const ani = document.querySelector('.rotate')
playPauseBtn.addEventListener('click', function () {
    console.log(11)
    if (audio.paused) {
        audio.play()
        playPauseBtn.textContent = '❚❚'
        playPauseBtnnext.textContent = '❚❚'
        ani.style.animationPlayState = 'running'
    } else {
        audio.pause()
        playPauseBtn.textContent = '▶'
        playPauseBtnnext.textContent = '▶'
        ani.style.animationPlayState = 'paused'
    }
})
const playPauseBtnnext = document.querySelector('.footnextbuttonplay')
playPauseBtnnext.addEventListener('click', function () {
    console.log(11)
    if (audio.paused) {
        audio.play()
        playPauseBtn.textContent = '❚❚'
        playPauseBtnnext.textContent = '❚❚'
        ani.style.animationPlayState = 'running'
    } else {
        audio.pause()
        playPauseBtn.textContent = '▶'
        playPauseBtnnext.textContent = '▶'
        ani.style.animationPlayState = 'paused'
    }
})
function getSearchHistory() {
    const history = localStorage.getItem('searchHistory')
    return history ? JSON.parse(history) : []
}

function saveSearchHistory(history) {
    localStorage.setItem('searchHistory', JSON.stringify(history))
}

function updateHistoryDisplay() {
    const history = getSearchHistory()
    const historyList = document.querySelector('.history')
    historyList.innerHTML = ''
    history.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item
        historyList.appendChild(li)
        console.log(li)
    })

    const topsearchhistory = document.querySelector('.hidden')
    topsearchhistory.style.display = 'block'
}

async function SearchInput(input) {
    localStorage.setItem(`search`, input)
    let r = await http({
        method: 'get',
        url: 'http://localhost:3000/search',
        params: {
            keywords: input,
            type: 1018
        }
    })
    console.log(r)
    localStorage.setItem(`searchlistnum`, r.result.playList.playLists.length)
    r.result.playList.playLists.map((it, i) => {
        localStorage.setItem(`listid${i}`, it.id)
        localStorage.setItem(`listpicid${i}`, it.coverImgUrl)
        localStorage.setItem(`listnameid${i}`, it.name)
        localStorage.setItem(`nicknameid${i}`, it.creator.nickname)
        localStorage.setItem(`playcount${i}`, it.playCount)
    })
    localStorage.setItem(`searchsongsnum`, r.result.song.songs.length)
    let authorname = ''
    r.result.song.songs.map((it, i) => {

        if (it.ar.length > 1) {
            authorname = it.ar.map((name, i) => {
                if (i === it.ar.length - 1) {
                    return `${name.name}`
                }
                return `${name.name}\/`
            }).join('')
        }
        else {
            authorname = it.ar[0].name
        }
        localStorage.setItem(`nameid${i}`, it.name)
        localStorage.setItem(`authorid${i}`, authorname)
        localStorage.setItem(`picid${i}`, it.al.picUrl)
        localStorage.setItem(`songid${i}`, it.id)
    })
    if (r.result.artist) {
        r.result.artist.artists.map((item, i) => {
            localStorage.setItem(`songerpic${i}`, item.picUrl)
            localStorage.setItem(`count${i}`, item.albumSize)
            localStorage.setItem(`songerid${i}`, item.id)
            localStorage.setItem(`name${i}`, item.name)
        })
    }
}


async function Search() {
    let res = await http({
        method: 'get',
        url: 'http://localhost:3000/search/default'
    })
    console.log(res)
    const showkeywords = document.querySelector('.search input')
    showkeywords.placeholder = res.data.showKeyword
    let r = await http({
        method: 'get',
        url: 'http://localhost:3000/search/hot'
    })
    console.log(r)
    const searchlist = document.querySelector('.topsearchul')
    const li = r.result.hots.map(
        (item, i) => {
            /* <a href="search.html"></a> */
            return `<a href="search.html">
            <li data-name="${item.first}">
                                    <div class="num">${i + 1}</div>
                                    <div class="song" >${item.first}</div>
                                </li>
                                </a>
                               `}
    ).join('')
    searchlist.innerHTML = li
    searchlist.addEventListener('click', async function Recommend(event) {
        if (event.target.closest('li')) {
            const searchlistli = event.target.closest('li')
            // SearchInput(searchlistli.dataset.name)
            localStorage.setItem(`search`, searchlistli.dataset.name)
        }
    })


    let debounceTimer;
    search.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            if (this.value) {
                let result = await http({
                    method: 'get',
                    url: 'http://localhost:3000/search',
                    params: {
                        keywords: this.value
                    }
                })
                console.log(result)
                const li = result.result.songs.map(
                    (item, i) => {
                        localStorage.setItem(`songid${i}`, item.id)
                        return `<li class="guess" data-id="${i}"><div class="song">${item.name}</div></li>`
                    }
                ).join('')
                document.querySelector('.topsearch').innerHTML = '猜你想搜'
                searchlist.innerHTML = li
                searchlist.addEventListener('click', async function Recommend(event) {
                    if (event.target.closest('.guess')) {
                        const searchlistli = event.target.closest('.guess')
                        Play(+searchlistli.dataset.id)
                    }
                })

            }
            else {
                const searchlist = document.querySelector('.topsearchul')
                const li = r.result.hots.map(
                    (item, i) =>
                        `<li>
                                        <div class="num">${i + 1}</div>
                                        <div class="song">${item.first}</div>
                                    </li>`
                ).join('')
                searchlist.innerHTML = li
            }

        }, 300)
        const searchbutton = document.querySelector('.search a')
        searchbutton.addEventListener('click', () => {
            // SearchInput(search.value)
            localStorage.setItem('search', search.value)
            const searchTerm = search.value.trim()
            if (searchTerm) {
                const history = getSearchHistory()
                if (!history.includes(searchTerm)) {
                    history.unshift(searchTerm)
                    saveSearchHistory(history)
                    updateHistoryDisplay()
                }


            }
        })

    })

}
Search()
async function Play(num) {
    console.log(num)
    let id = localStorage.getItem(`songid${num}`)
    console.log(id)
    if (id) {
        let r = await http({
            method: 'get',
            url: 'http://localhost:3000/song/url/v1',
            params: {
                id,
                level: "standard",
                cookie: '000F0DC273534F2044528A4C4AA1B418D32D016F0E3A4A7130197088AB8B7569484B0E3FBDACAF4F2E15444E384651AE0C92CD9A863F62B599C0BCA882EE1E388444DA2E65DC06C5EF248714C65A50FCE0572D97C25C1EB158B349D45C5ADDD5F5FB0EC2DB35F75287C8BC40DC8065FE5032E85FE33D6BEB74148D0A996DFB31715727FE0EB599FD50AA3FC9845796562E7DFF3A9909ED3FCBA0155EA98F56DC39027EEE04794768850E006C2AF8FDB65455994F6844F70D3FBBF57E16992432038567B6F9C97D506991C01D8EE367D9337FC63B885896EB7A29729CF9B5FA0ADC22DF007936422A1361FD9D5E645FD511B1CF2332E5A500FEBAB93129BFA857D459C060BF9C5C2887CF998DDB38A855851FEA05268A11FEF97746668BFB718CF5AB082F5583DB7A8D8E5A1ED413B985D145751BF80B8412FD36739685FE9090D9E5B8B80169F8FC89D0301DC5315D5999121A4E5F36109C617C38188C172DC6EA'
            }
        })
        const a = document.querySelector('audio')
        console.log(r)
        a.src = r.data[0].url
        let re = await http({
            method: 'get',
            url: 'http://localhost:3000/check/music',
            params: {
                id,
                cookie: '000F0DC273534F2044528A4C4AA1B418D32D016F0E3A4A7130197088AB8B7569484B0E3FBDACAF4F2E15444E384651AE0C92CD9A863F62B599C0BCA882EE1E388444DA2E65DC06C5EF248714C65A50FCE0572D97C25C1EB158B349D45C5ADDD5F5FB0EC2DB35F75287C8BC40DC8065FE5032E85FE33D6BEB74148D0A996DFB31715727FE0EB599FD50AA3FC9845796562E7DFF3A9909ED3FCBA0155EA98F56DC39027EEE04794768850E006C2AF8FDB65455994F6844F70D3FBBF57E16992432038567B6F9C97D506991C01D8EE367D9337FC63B885896EB7A29729CF9B5FA0ADC22DF007936422A1361FD9D5E645FD511B1CF2332E5A500FEBAB93129BFA857D459C060BF9C5C2887CF998DDB38A855851FEA05268A11FEF97746668BFB718CF5AB082F5583DB7A8D8E5A1ED413B985D145751BF80B8412FD36739685FE9090D9E5B8B80169F8FC89D0301DC5315D5999121A4E5F36109C617C38188C172DC6EA'
            }
        })
        console.log(re)
        if (re.message != 'ok') {
            alert(re.message)
        }
        let res = await http({
            method: 'get',
            url: 'http://localhost:3000/song/detail',
            params: {
                ids: id
            }
        })
        console.log(res)
        let authorname = ''
        if (res.songs[0].ar.length > 1) {
            authorname = res.songs[0].ar.map((name, i) => {
                if (i === res.songs[0].ar.length - 1) {
                    return `${name.name}`
                }
                return `${name.name}\/`
            }).join('')
        }
        else {
            authorname = res.songs[0].ar[0].name
        }

        let sname = res.songs[0].name
        let pic = res.songs[0].al.picUrl
        let al = res.songs[0].al.name
        SongPlay(id, authorname, sname, pic, al)
        const bottomdes = `
                <div class="footpic">
                    <img src="${pic}">
                </div>
                <div class="footdes">
                    <div class="footdestop">
                        <div class="footdestopname">${sname} -</div>
                        <div class="footdestopauthor">${authorname}</div>
                    </div>
                    <div class="footdesbottom">
                        <ul>
                            <li></li>
                            <li></li>
                            <li>1w+</li>
                            <li></li>
                            <li>...</li>
                        </ul>
                    </div>
                </div>`
        document.querySelector('.foot1').innerHTML = bottomdes
        const footpic = document.querySelector('.footpic img')
        const footnext = document.querySelector('.footnext')
        const nextlast = document.querySelector('.footnextlastsong')

        nextlast.addEventListener('click', function () {

            num -= 1
            Play(num)
        })
        const nextnext = document.querySelector('.footnextnextsong')
        nextnext.addEventListener('click', function () {
            console.log(12)
            num += 1
            Play(num)
        })
        footpic.addEventListener('click', function () {
            footnext.style.zIndex = 110
            footnext.style.display = 'block'
        })
        const none = document.querySelector('.zhedie')
        none.addEventListener('click', function () {
            footnext.style.display = 'none'
        })
        audio.play()
        if (audio.paused) {
            playPauseBtn.textContent = '▶'
            playPauseBtnnext.textContent = '▶'
        } else {

            playPauseBtn.textContent = '❚❚'
            playPauseBtnnext.textContent = '❚❚'
        }
        const progressContainer = document.querySelector('.footplayprogresscontainer')
        const progress = document.querySelector('.footplayprogresscontent')
        const currentTimeDisplay = document.getElementById('current-time')
        const durationDisplay = document.getElementById('duration')
        audio.addEventListener('timeupdate', () => {
            const progressPercent = (audio.currentTime / audio.duration) * 100
            progress.style.width = `${progressPercent}%`
            const currentMinutes = Math.floor(audio.currentTime / 60)
            const currentSeconds = Math.floor(audio.currentTime % 60)
            currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`
            if (!isNaN(audio.duration)) {
                const durationMinutes = Math.floor(audio.duration / 60)
                const durationSeconds = Math.floor(audio.duration % 60)
                durationDisplay.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`
            }
        })
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect()
            const clickX = e.clientX - rect.left
            const progressWidth = progressContainer.offsetWidth
            const newTime = (clickX / progressWidth) * audio.duration
            audio.currentTime = newTime
        })
        const last = document.querySelector('.footplaybuttonlastsong')
        last.addEventListener('click', function () {
            num -= 1
            Play(num)
        })
        const next = document.querySelector('.footplaybuttonnextsong')
        next.addEventListener('click', function () {
            num += 1
            Play(num)
        })
        document.querySelector('.foot').style.opacity = 1

        const playsonglistbutton = document.querySelector('.playsonglistbutton')
        playsonglistbutton.addEventListener('click', Playsonglist)
    }

}

async function SongPlay(id, authorname, sname, pic, al) {
    let re = await http({
        method: 'get',
        url: 'http://localhost:3000/lyric/new',
        params: {
            id
        }
    })
    console.log(re)
    //
    //
    //以下思路参考过AI，含部分自己的理解
    //首先将json字符与歌词分开
    //将内容去除空格后把每一行放入一个数组元素中
    const lines = re.lrc.lyric.trim().split('\n');
    const jsonLines = [];
    const lrcLines = [];
    let flag = false;
    lines.forEach(line => {
        if (line.startsWith('[')) {
            flag = true;
        }
        if (flag) {
            lrcLines.push(line);
        } else {
            jsonLines.push(line);
        }
    })
    console.log(jsonLines)
    let des = JSON.parse(`[${jsonLines.join(',')}]`)
    const parseLRC = (lrc) => {
        const lyricMap = new Map();
        lrc.forEach(line => {
            const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
            const match = line.match(regex);
            if (match) {
                //match[1]表示第一个捕获组匹配的内容，即分钟数，转换为整数便于后续使用时间
                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);
                const milliseconds = parseInt(match[3]);
                const time = minutes * 60 + seconds + milliseconds / 1000;
                const lyric = match[4];
                lyricMap.set(time, lyric);
            }
        });
        return lyricMap;
    };
    const lyricMap = parseLRC(lrcLines);
    //
    //
    // console.log(lyricMap)
    let footnextmidrlyricscontainer = document.querySelector('.footnextmidrlyricscontainer')
    footnextmidrlyricscontainer.innerHTML = ''
    des.forEach(item => {
        const text = item.c.map(it => it.tx).join('')
        const p = document.createElement('p')
        p.classList.add('lyrict')
        p.textContent = text
        footnextmidrlyricscontainer.appendChild(p)
    })
    //提取时间
    const times = Array.from(lyricMap.keys())
    //渲染歌词
    times.forEach(time => {
        const lyric = lyricMap.get(time)
        console.log(lyric)
        const p = document.createElement('p')
        p.classList.add('lyric')
        p.textContent = lyric
        footnextmidrlyricscontainer.appendChild(p)
    })

    const progressContainer = document.querySelector('.footnextbottomcontainer')
    const progress = document.querySelector('.footnextbottomcontent')
    const currentTimeDisplay = document.getElementById('footnextcurrent-time')
    const durationDisplay = document.getElementById('footnextduration')
    document.querySelector('.rotate img').src = pic
    document.querySelector('.footnextmidrname').innerHTML = sname
    document.querySelector('.footnextmidral').innerHTML = `专辑：${al}`
    document.querySelector('.footnextmidrsinger').innerHTML = `歌手：${authorname}`
    let currentindex = 0
    let nextcurrentTranslateY = 0

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime
        const index = times.findIndex(time => time > currentTime)
        const prevIndex = index === -1 ? times.length - 1 : index - 1
        const lyrics = footnextmidrlyricscontainer.querySelectorAll('.lyric')
        lyrics.forEach((lyric, i) => {
            if (i === prevIndex) {
                lyric.classList.add('played')
            } else {
                lyric.classList.remove('played')
            }
        })
        const progressPercent = (audio.currentTime / audio.duration) * 100
        progress.style.width = `${progressPercent}%`
        const currentMinutes = Math.floor(audio.currentTime / 60)
        const currentSeconds = Math.floor(audio.currentTime % 60)
        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`
        if (!isNaN(audio.duration)) {
            const durationMinutes = Math.floor(audio.duration / 60)
            const durationSeconds = Math.floor(audio.duration % 60)
            durationDisplay.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`
        }


        if (prevIndex !== currentindex) {
            currentindex = prevIndex;
            // console.log(currentindex)
            const currentLyric = lyrics[currentindex];
            // console.log(currentLyric)
            if (currentLyric) {
                nextcurrentTranslateY = currentLyric.offsetTop - 225
                console.log(nextcurrentTranslateY)
                footnextmidrlyricscontainer.style.transform = `translateY(-${nextcurrentTranslateY}px)`;
            }
        }


    })
    progressContainer.addEventListener('click', (e) => {
        // console.log(99)
        const rect = progressContainer.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const progressWidth = progressContainer.offsetWidth
        const newTime = (clickX / progressWidth) * audio.duration
        audio.currentTime = newTime
    })
    const footnextbutton = document.querySelector('.footnextbutton')
    footnextbutton.addEventListener('click', Playsonglist)
}

async function Playsonglist() {
    const playsonglist = document.querySelector('.playsonglist')
    if (!playsonglist.style.right) {

        playsonglist.style.right = '0'
        let li = ''
        for (let i = 0; i < 12; i++) {
            let pic = localStorage.getItem(`picid${i}`)
            let name = localStorage.getItem(`nameid${i}`)
            let author = localStorage.getItem(`authorid${i}`)
            let t = localStorage.getItem(`time${i}`)
            li += `
                    <li data-id="${i}" data-pic="${pic}" data-name="${name}">
                        <div class="playsonglistli">
                            <div class="playsonglistpic">
                                <img src="${pic}">
                            </div>
                            <div class="playsonglistdes">
                                <div class="playsonglistdesname">${name}</div>
                                <div class="playsonglistdesauthor">${author}</div>
                            </div>
                            <div class="playsonglist2none">
                                <div class="playsonglist2none4" title="更多">...</div>
                                <div class="playsonglist2none2" title="来源"></div>
                                <div class="playsonglist2none1" title="喜欢"></div>
                                <div class="playsonglist2none2" title="收藏"></div>
                            </div>
                        </div>
                        <div class="playsonglisttime">${t}</div>
                    </li>
        `}
        const playsonglistplaysonglists = document.querySelector('.playsonglistplaysonglists ul')
        playsonglistplaysonglists.innerHTML = li
    }
    else {
        playsonglist.style.right = '-400px'
    }
}
