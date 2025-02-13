let searchname = localStorage.getItem('search')
let searchlistnum = localStorage.getItem('searchlistnum')
let searchsongsnum = localStorage.getItem('searchsongsnum')
// let songid = localStorage.getItem(`songid${i}`)
let song = ''
for (let i = 0; i < searchsongsnum; i++) {
    let sname = localStorage.getItem(`nameid${i}`)
    let pic = localStorage.getItem(`picid${i}`)
    let author = localStorage.getItem(`authorid${i}`)
    song += ` <li data-id="${i}" class="songli">
                                <div class="searchlistsongspic">
                                    <img src="${pic}">
                                    <div class="searchlistsongsbox"></div>
                                </div>
                                <div class="searchlistsongsmid">
                                    <div class="searchlistsongsmidname">${sname}</div>
                                    <div class="searchlistsongsmidm">
                                        <div class="searchlistsongsmidauthor">${author}</div>
                                    </div>
                                </div>
                                <div class="searchlistsongsr">
                                    <div class="searchlistsongsr1"></div>
                                    <div class="searchlistsongsr2"></div>
                                    <div class="searchlistsongsr3">...</div>
                                </div>
                            </li>`
}
const songs = document.querySelector('.searchlistsongs ul')
songs.innerHTML = song
let songlist = ''
for (let i = 0; i < searchlistnum; i++) {
    let listpic = localStorage.getItem(`listpicid${i}`)
    let playcount = localStorage.getItem(`playcount${i}`)
    let nickname = localStorage.getItem(`nicknameid${i}`)
    let listname = localStorage.getItem(`listnameid${i}`)
    let listid = localStorage.getItem(`listid${i}`)
    songlist += ` <li class="searchlistsonglistli" data-id="${listid}">
    <a href="playlist.html">
                                <div class="searchlistsonglistlitop"
                                    style="background-image: url('${listpic}'); background-size: cover; background-position: center;">
                                    <div class="searchlistsonglistlitopp">${playcount}</div>
                                    <div class="searchlistsonglistlitopb">
                                        <div class="sanjiaoxing"></div>
                                    </div>
                                </div>
                            </a>
                            <a href="playlist.html">
                                <div class="searchlistsonglistdlibottomtopname">${listname}</div>
                                <div class="searchlistsonglistdlibottomtopauthor">${nickname}.包含 《<a class="blue">${searchname}</a>》
                                </div>
                            </a>
                            </li>`
}
const lists = document.querySelector('.searchlistsonglistul')
document.querySelector('.searchlisttopl').innerHTML = searchname
lists.innerHTML = songlist
songs.addEventListener('click', function (event) {
    if (event.target.closest('.songli')) {
        const li = event.target.closest('.songli');
        console.log(li.dataset.id)
        Play(+li.dataset.id)
    }
})
lists.addEventListener('click', function (event) {
    if (event.target.closest('.searchlistsonglistli')) {
        const recommendli = event.target.closest('.searchlistsonglistli')
        console.log(recommendli.dataset.id)
        localStorage.setItem('listid', recommendli.dataset.id)
    }
})
let songer = ''

async function Songer() {
    let r = await http({
        method: 'get',
        url: 'http://localhost:3000/artist/detail',
        params: {
            id: 5538
        }
    })
    console.log(r)
    for (let i = 0; i < 2; i++) {
        let songerid = localStorage.getItem(`songerid${i}`)
        let songerpic = localStorage.getItem(`songerpic${i}`)
        let count = localStorage.getItem(`count${i}`)
        let name = localStorage.getItem(`name${i}`)
        songer += `<a href="singer.html">
         <div class="songerl" data-id="${songerid}">
                            <div class="lpic">
                                <img src="${songerpic}">
                                <div class="sanjiao"></div>
                            </div>
                            <div class="lr">
                                <div class="lname">歌手：${name}</div>
                                <div class="lbl">单曲：${count}</div>
                                <div class="lbr">粉丝：554万</div>
    
                            </div>
                            </div>
                            </a>`
    }
    const singers = document.querySelector('.songer')
    singers.innerHTML = songer
    singers.addEventListener('click', function (event) {
        if (event.target.closest('.songerl')) {
            const recommendli = event.target.closest('.songerl')
            console.log(recommendli.dataset.id)
            localStorage.setItem('songerid', recommendli.dataset.id)
        }
    })
}
Songer()
