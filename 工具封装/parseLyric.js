function parseLyric(lyricString, timeRe = /\[(\d{2}):(\d{2}\.\d{2,3})\]/) {
    const lyricLineStrings = lyricString.split("\n")
    const lyriInfos = lyricLineStrings.map(lineString => {
        const result = lineString.match(timeRe)
        if (!result) return ""
        const minuteTime = result[1] * 60 * 1000
        const secondTime = result[2] * 1000
        const time = minuteTime + secondTime
        //用正则匹配歌词前面的时间，再用replace替换成空字符串，
        // 这样原来的lineString就只有歌词了，再调用trim去掉空格。
        const content = lineString.replace(timeRe, "").trim()
        return { time, content }
    })
    return lyriInfos
}


// console.log(parseLyric(`[00:00.00]制作人 : 余佳运\n[00:01.00] 作词 : 余佳运\n[00:02.00] 作曲 : 余佳运\n[00:14.04]许多回忆 藏在心底\n[00:20.31]总来不及 都告诉你\n[00:26.56]和你一起 爬过山顶入过海里\n[00:33.07]难免粗心 时而大意\n[00:39.51]难过开心 你都参与\n[00:45.86]笑到抽筋 哭到决堤\n[00:52.21]和你一起 想去东京 飞到巴黎\n[00:58.36]那些事情
//     全因为你\n[01:03.30]我想和你 赏最美的风景\n[01:07.99]看最长的电影
//     听动人的旋律\n[01:14.40]是因为你和我\n[01:16.75]会陪你到下个世纪\n[01:22.90]那是多么的幸运\n[01:30.46]可爱的你 爱哭的你\n[01:36.75]善良的你
//     美好的你\n[01:43.30]和你一起 聊着过去 说起曾经\n[01:48.93]那些画面都 是你\n[02:20.50]我想和你 赏最美的风景\n[02:25.01]看最长的电影
//     听动人的旋律\n[02:31.56]是因为你和我\n[02:33.68]会陪你到下个世纪\n[02:40.07]那是多么的幸运\n[02:45.61]我要和你 赏最美的风景\n[02:50.45]看最长的电影
//     听动人的旋律\n[02:57.20]是因为你和我\n[02:59.28]和你最珍贵的记忆\n[03:05.72]那是多么的幸运\n[03:12.23]我是多么的幸运\n`))