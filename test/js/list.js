// const classnav = document.querySelector('.class ul')
// const lists = document.querySelector('.lists')
const classli = document.querySelector('.classli')
const listcontent = document.querySelector('.listcontent')
async function Lists() {
    listcontent.innerHTML = ''
    const classnavbox = document.createElement('div')
    classnavbox.classList.add('class')
    const classnavboxul = document.createElement('ul')
    classnavbox.appendChild(classnavboxul)
    listcontent.appendChild(classnavbox)
    const lists = document.createElement('div')
    lists.classList.add('lists')
    listcontent.appendChild(lists)
    let result = await http({
        method: 'get',
        url: 'http://localhost:3000/playlist/hot'
    })
    console.log(result)
    const li = result.tags.map(
        (item, i) =>
            `<li data-id=${i}><a href="#">${item.name}</a></li>`
    )
    li.push('<li class="classli"><a href="#">更多分类</a></li>')
    li.unshift('<li class="classlistactive"><a href="#">推荐</a></li>')
    classnavboxul.innerHTML = li.join('')
    // listcontent.appendChild(classnav)
    const lis = document.querySelectorAll('.class li')
    for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', async function () {
            document.querySelector('.classlistactive').classList.remove('classlistactive')
            lis[i].classList.add('classlistactive')
            const cat = result.tags[i - 1].name
            try {
                let r = await http({
                    method: 'get',
                    url: 'http://localhost:3000/top/playlist',
                    params: {
                        cat
                    }
                })
                console.log(r)
                const classlisPromises = r.playlists.map(
                    async (item) => {
                        let randomColor = await getImageMainColor(item.coverImgUrl)
                        let r = await http({
                            method: 'get',
                            url: 'http://localhost:3000/playlist/track/all',
                            params: {
                                id: item.id
                            }
                        })
                        console.log(r)
                        const count = item.playCount > 10000
                            ? (() => {
                                const result = (item.playCount / 10000).toFixed(1)
                                return result.endsWith('.0') ? `${parseInt(result)}万` : `${result}万`;
                            })() : item.playCount
                        return `<li class="recommendli" data-id="${item.id}">
                            <a href="playlist.html"><div class="recommendlitop" style="background-image: url('${item.coverImgUrl}'); background-size: cover; background-position: center;">
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
                        <li>1 ${r.songs[0].name}</li>
                        <li>2 ${r.songs[1].name}</li>
                        <li>3 ${r.songs[2].name}</li>
                    </ol>
                            
                            </div></a>
                        </li>`
                    })
                const classlis = await Promise.all(classlisPromises)
                const liss = classlis.join('')
                lists.innerHTML = liss
            } catch (error) {
                alert(`请求出错: ${error.message}`);
            }
        })
    }

    lists.addEventListener('click', function (event) {
        if (event.target.closest('.recommendli')) {
            const recommendli = event.target.closest('.recommendli');
            console.log(recommendli.dataset.id)
            localStorage.setItem('listid', recommendli.dataset.id);
        }
    })

}
Lists()
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
const paihang = document.querySelector('.paihang')
paihang.addEventListener('click', async function () {
    document.querySelector('.listsqure').classList.remove('listsqure')
    paihang.classList.add('paihangact')
    document.querySelector('.listsqurea').classList.remove('listsqurea')
    document.querySelector('.paihang a').classList.add('listsqurea')
    let r = await http({
        method: 'get',
        url: 'http://localhost:3000/toplist',
    })
    console.log(r)
    listcontent.innerHTML = r.list.map(item =>
        ` <a href="playlist.html" data-id="${item.id}">
    <div class="bangdan" style="background-image: url('${item.coverImgUrl}'); background-size: cover; background-position: center;">
         <div class="bangdanbox"></div>
    </div>
</a>`
    ).join('')
    listcontent.addEventListener('click', function (event) {
        if (event.target.closest('a')) {
            const recommendli = event.target.closest('a');
            console.log(recommendli.dataset.id)
            localStorage.setItem('listid', recommendli.dataset.id);
        }
    })
})


