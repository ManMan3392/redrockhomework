import "../css/style.css"
import "../css/search.css"
import "../js/style.js"
import "../js/search.js"
let searchname = localStorage.getItem('search')
// let searchlistnum = localStorage.getItem('searchlistnum')
// let searchsongsnum = localStorage.getItem('searchsongsnum')
async function SearchInput(input) {
    let r = await http({
        method: 'get',
        url: 'http://localhost:3000/search',
        params: {
            keywords: input,
            type: 1018
        }
    })
    console.log(r)
    // localStorage.setItem(`searchlistnum`, r.result.playList.playLists.length)
    let songlist = r.result.playList.playLists.map((it, i) => {
        // localStorage.setItem(`listid${i}`, it.id)
        // localStorage.setItem(`listpicid${i}`, it.coverImgUrl)
        // localStorage.setItem(`listnameid${i}`, it.name)
        // localStorage.setItem(`nicknameid${i}`, it.creator.nickname)
        // localStorage.setItem(`playcount${i}`, it.playCount)

        // localStorage.setItem(`searchsongsnum`, r.result.song.songs.length)
        const count = it.playCount > 10000
            ? (() => {
                const result = (it.playCount / 10000).toFixed(1)
                return result.endsWith('.0') ? `${parseInt(result)}万` : `${result}万`;
            })() : it.playCount
        return ` <li class="searchlistsonglistli" data-id="${it.id}">
        <a href="playlist.html">
                                    <div class="searchlistsonglistlitop"
                                        style="background-image: url('${it.coverImgUrl}'); background-size: cover; background-position: center;">
                                        <div class="searchlistsonglistlitopp"> ${count}</div>
                                        <div class="searchlistsonglistlitopb">
                                            <div class="sanjiaoxing"></div>
                                        </div>
                                    </div>
                                </a>
                                <a href="playlist.html">
                                    <div class="searchlistsonglistdlibottomtopname">${it.name}</div>
                                    <div class="searchlistsonglistdlibottomtopauthor">${it.creator.nickname}.包含 《<a class="blue">${searchname}</a>》
                                    </div>
                                </a>
                                </li>`
    }).join('')
    const lists = document.querySelector('.searchlistsonglistul')
    document.querySelector('.searchlisttopl').innerHTML = searchname
    lists.innerHTML = songlist
    let authorname = ''
    let song = r.result.song.songs.map((it, i) => {

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
        // localStorage.setItem(`nameid${i}`, it.name)
        // localStorage.setItem(`authorid${i}`, authorname)
        // localStorage.setItem(`picid${i}`, it.al.picUrl)
        localStorage.setItem(`songid${i}`, it.id)



        return ` <li data-id="${i}" class="songli">
                                        <div class="searchlistsongspic">
                                            <img src="${it.al.picUrl}">
                                            <div class="searchlistsongsbox"></div>
                                        </div>
                                        <div class="searchlistsongsmid">
                                            <div class="searchlistsongsmidname">${it.name}</div>
                                            <div class="searchlistsongsmidm">
                                                <div class="searchlistsongsmidauthor">${authorname}</div>
                                            </div>
                                        </div>
                                        <div class="searchlistsongsr">
                                            <div class="searchlistsongsr1"></div>
                                            <div class="searchlistsongsr2"></div>
                                            <div class="searchlistsongsr3">...</div>
                                        </div>
                                    </li>`
    }).join('')
    const songs = document.querySelector('.searchlistsongs ul')
    songs.innerHTML = song
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

    // if (r.result.artist) {
    let songer = r.result.artist.artists.map((item, i) => {
        // localStorage.setItem(`songerpic${i}`, item.picUrl)
        // localStorage.setItem(`count${i}`, item.albumSize)
        // localStorage.setItem(`songerid${i}`, item.id)
        // localStorage.setItem(`name${i}`, item.name)
        // for (let i = 0; i < 2; i++) {
        //     let songerid = localStorage.getItem(`songerid${i}`)
        //     let songerpic = localStorage.getItem(`songerpic${i}`)
        //     let count = localStorage.getItem(`count${i}`)
        //     let name = localStorage.getItem(`name${i}`)
        return `<li>
        <a href="singer.html" class="singera">
                 <div class="songerl" data-id="${item.id}">
                                    <div class="lpic">
                                        <img src="${item.picUrl}">
                                        <div class="sanjiao"></div>
                                    </div>
                                    <div class="lr">
                                        <div class="lname">歌手：${item.name}</div>
                                        <div class="lbl">单曲：${item.albumSize}</div>
                                        <div class="lbr">粉丝：554万</div>
            
                                    </div>
                                    </div>
                                    </a>
                                    </li>`
    }).join('')
    const singers = document.querySelector('.songer ul')
    singers.innerHTML = songer
    singers.addEventListener('click', function (event) {
        if (event.target.closest('.songerl')) {
            const recommendli = event.target.closest('.songerl')
            console.log(recommendli.dataset.id)
            localStorage.setItem('songerid', recommendli.dataset.id)
        }
    })
    // }
}
SearchInput(searchname)
// let searchlistnum = localStorage.getItem('searchlistnum')
// let searchsongsnum = localStorage.getItem('searchsongsnum')
// let songid = localStorage.getItem(`songid${i}`)
// let song = ''
// for (let i = 0; i < searchsongsnum; i++) {
//     let sname = localStorage.getItem(`nameid${i}`)
//     let pic = localStorage.getItem(`picid${i}`)
//     let author = localStorage.getItem(`authorid${i}`)
//     song += ` <li data-id="${i}" class="songli">
//                                 <div class="searchlistsongspic">
//                                     <img src="${pic}">
//                                     <div class="searchlistsongsbox"></div>
//                                 </div>
//                                 <div class="searchlistsongsmid">
//                                     <div class="searchlistsongsmidname">${sname}</div>
//                                     <div class="searchlistsongsmidm">
//                                         <div class="searchlistsongsmidauthor">${author}</div>
//                                     </div>
//                                 </div>
//                                 <div class="searchlistsongsr">
//                                     <div class="searchlistsongsr1"></div>
//                                     <div class="searchlistsongsr2"></div>
//                                     <div class="searchlistsongsr3">...</div>
//                                 </div>
//                             </li>`
// }
// const songs = document.querySelector('.searchlistsongs ul')
// songs.innerHTML = song
// let songlist = ''
// for (let i = 0; i < searchlistnum; i++) {
//     let listpic = localStorage.getItem(`listpicid${i}`)
//     let playcount = localStorage.getItem(`playcount${i}`)
//     let nickname = localStorage.getItem(`nicknameid${i}`)
//     let listname = localStorage.getItem(`listnameid${i}`)
//     let listid = localStorage.getItem(`listid${i}`)
//     songlist += ` <li class="searchlistsonglistli" data-id="${listid}">
//     <a href="playlist.html">
//                                 <div class="searchlistsonglistlitop"
//                                     style="background-image: url('${listpic}'); background-size: cover; background-position: center;">
//                                     <div class="searchlistsonglistlitopp">${playcount}</div>
//                                     <div class="searchlistsonglistlitopb">
//                                         <div class="sanjiaoxing"></div>
//                                     </div>
//                                 </div>
//                             </a>
//                             <a href="playlist.html">
//                                 <div class="searchlistsonglistdlibottomtopname">${listname}</div>
//                                 <div class="searchlistsonglistdlibottomtopauthor">${nickname}.包含 《<a class="blue">${searchname}</a>》
//                                 </div>
//                             </a>
//                             </li>`
// }
// const lists = document.querySelector('.searchlistsonglistul')
// document.querySelector('.searchlisttopl').innerHTML = searchname
// lists.innerHTML = songlist
// songs.addEventListener('click', function (event) {
//     if (event.target.closest('.songli')) {
//         const li = event.target.closest('.songli');
//         console.log(li.dataset.id)
//         Play(+li.dataset.id)
//     }
// })
// lists.addEventListener('click', function (event) {
//     if (event.target.closest('.searchlistsonglistli')) {
//         const recommendli = event.target.closest('.searchlistsonglistli')
//         console.log(recommendli.dataset.id)
//         localStorage.setItem('listid', recommendli.dataset.id)
//     }
// })
// let songer = ''

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
// Songer()
