import "../css/style.css"
import "../css/index.css"
import "../js/style.js"
import "../js/index.js"
let timeID = 0
// 一串图片，循环获取并放入盒子，两张图片中间有距离，overflow:hidden,动画效果，一段时间往前走一个图片的距离，一次走完回到原来位置，且走无数次
async function Change() {
    let result = await http({
        method: 'get',
        url: 'http://localhost:3000/banner',
        params: {
            type: 0
        }
    })
    // console.log(result)
    //创造骨架
    const change = document.querySelector('.change')
    const changenav = document.querySelector('.changenav')
    const big = document.querySelector('.big')
    for (let i = 0; i < result.banners.length; i++) {
        const img = document.createElement('img')
        const div = document.createElement('div')
        img.src = result.banners[i].imageUrl
        div.classList.add('picture')
        // 小圆点：创建的时候加data，鼠标移入nav定时器停止，mouseenter高亮，选择对应图片
        const li = document.createElement('li')
        li.dataset.id = i
        if (i === 0) {
            li.classList.add('changeactive')
        }
        changenav.appendChild(li)
        big.appendChild(div)
        div.appendChild(img)
    }
    //定时器
    const lis = document.querySelectorAll('li')
    // const picture = document.querySelector('picture')
    let move = 0
    let i = 0
    const topbottomright = document.querySelector('.topbottomright')
    topbottomright.innerHTML = result.banners[i].typeTitle
    // console.log(`${result.banners[i].typeTitle}`)
    topbottomright.style.color = result.banners[i].titleColor
    console.log(`${result.banners[i].titleColor}`)
    function time() {
        i++
        document.querySelector('.changeactive').classList.remove('changeactive')
        move += (change.offsetWidth + 20)
        if (move > (result.banners.length - 1) * (change.offsetWidth + 20)) {
            move = 0
            i = 0
        }
        big.style.transform = `translateX(-${move}px)`
        //lis[i].classList.add('changeactive')
        document.querySelector(`.changenav li:nth-child(${i + 1})`).classList.add('changeactive')
        // console.log(i)
        document.querySelector('.topbottomright').innerHTML = result.banners[i].typeTitle
        // console.log(`${result.banners[i].typeTitle}`)
        document.querySelector('.topbottomright').style.color = result.banners[i].titleColor
        // console.log(`${result.banners[i].titleColor}`)

    }
    let timerid = 0
    timerid = setInterval(time, 5300)
    //小圆点
    change.addEventListener('mouseover', function (e) {
        clearInterval(timerid)
        if (e.target.tagName === 'LI') {
            document.querySelector('.changeactive').classList.remove('changeactive')
            e.target.classList.add('changeactive')
            //console.log(`${e.target.dataset.id}`)
            move = (change.offsetWidth + 20) * e.target.dataset.id
            big.style.transform = `translateX(-${move}px)`
            i = +e.target.dataset.id
            document.querySelector('.topbottomright').innerHTML = result.banners[i].typeTitle
            console.log(`${result.banners[i].typeTitle}`)
            document.querySelector('.topbottomright').style.color = result.banners[i].titleColor
            console.log(`${result.banners[i].titleColor}`)
            i = Number(e.target.dataset.id)
        }
    })
    change.addEventListener('mouseout', function () {
        clearInterval(timerid)
        timerid = setInterval(time, 5300)
    })
}
Change()
//侧边按钮
const head = document.querySelector('.head')
const headbefore = document.querySelector('.headbefore')
const headafter = document.querySelector('.headafter')
head.addEventListener('mouseover', function () {
    headbefore.style.display = 'block'
    headafter.style.display = 'block'
    // console.log(11)
})
head.addEventListener('mouseout', function () {
    headbefore.style.display = 'none'
    headafter.style.display = 'none'
    // console.log(11)
})
//推荐歌单
//创建骨架,recommend窗口可见，里面包含一个大ul,ul里自动生成li，点击按钮，ul往左挪动。
async function recommend() {
    let res = await http({
        method: 'get',
        url: 'http://localhost:3000/personalized'
    })
    console.log(res)
    const recommendul = document.querySelector('.recommendul')
    const promises = res.result.map(
        async (item) => {
            let r = await http({
                method: 'get',
                url: 'http://localhost:3000/playlist/track/all',
                params: {
                    id: item.id
                }
            })
            // console.log(r)
            const count = item.playCount > 10000
                ? (() => {
                    const result = (item.playCount / 10000).toFixed(1)
                    return result.endsWith('.0') ? `${parseInt(result)}万` : `${result}万`;
                })() : item.playCount
            let randomColor = await getImageMainColor(item.picUrl)
            const firstSongName = r.songs && r.songs[0] ? r.songs[0].name : '未知歌曲';
            const secondSongName = r.songs && r.songs[1] ? r.songs[1].name : '未知歌曲';
            const thirdSongName = r.songs && r.songs[2] ? r.songs[2].name : '未知歌曲';
            return `<li class="recommendli" data-id="${item.id}">
                            <a href="playlist.html"><div class="recommendlitop" style="background-image: url('${item.picUrl}'); background-size: cover; background-position: center;">
                             <div class="recommendlitopp"> ${count}</div>
                             <div class="recommendlitopb"></div>
                            </div></a>
                            <a href="playlist.html"><div class="recommendlibottom" style="background-color: ${randomColor}">
                            <div class="recommendlibottomplaybutton">
                            <div class="sanjiaoxing"></div></div>
                            <div class="recommendlibottomtop">
                            <div class="recommendlibottomtopnone" style="background: linear-gradient(to top,  ${randomColor}, rgba(250, 250, 250, .3))"></div>
                            ${item.name}</div>
                            <ol>
                         <li>1 ${firstSongName}</li>
                                <li>2 ${secondSongName}</li>
                                <li>3 ${thirdSongName}</li>
                    </ol>
                            
                            </div></a>
                        </li>`

        })
    const htmlArray = await Promise.all(promises)
    const li = htmlArray.join('')
    recommendul.innerHTML = li
    recommendul.addEventListener('click', function (event) {
        if (event.target.closest('.recommendli')) {
            const recommendli = event.target.closest('.recommendli')
            console.log(recommendli.dataset.id)
            localStorage.setItem('listid', recommendli.dataset.id)
        }
    })
}
const recommendul = document.querySelector('.recommendul')
const recommendbefore = document.querySelector('.recommendbefore')
const recommendafter = document.querySelector('.recommendafter')
const recommend1 = document.querySelector('.recommend')
recommend1.addEventListener('mouseover', function () {
    recommendbefore.style.display = 'block'
    recommendafter.style.display = 'block'
    // console.log(11)
}
)
recommend1.addEventListener('mouseout', function () {
    recommendbefore.style.display = 'none'
    recommendbefore.style.display = 'none'
    // console.log(11)
})
let currentTranslateX = 0
recommendafter.addEventListener('click', function () {
    currentTranslateX -= 500
    recommendul.style.transform = `translateX(${currentTranslateX}px)`
})
recommendbefore.addEventListener('click', function () {
    currentTranslateX += 500
    recommendul.style.transform = `translateX(${currentTranslateX}px)`
})
recommend()
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
            r = Math.round(r / totalPixels) + 20;
            g = Math.round(g / totalPixels) + 20;
            b = Math.round(b / totalPixels) + 20;
            const mainColor = `rgb(${r}, ${g}, ${b})`;
            resolve(mainColor);
        };
        img.onerror = (error) => {
            reject(error);
        };
    });
}