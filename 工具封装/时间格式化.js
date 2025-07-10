export default function formatData(time, formatString) {
    const date = new Date(time)
    const obj = {
        "y+": date.getFullYear(),
        "M+": date.getMonth(),
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    }
    for (const key in obj) {
        const dateRe = new RegExp(`(${key})`)
        if (dateRe.test(formatString)) {
            const value = (obj[key] + "").padStart(2, "0")
            formatString = formatString.replace(dateRe, value)
        }
    }
    return formatString
}

// console.log(formatData(Date.now(), 'yyyy-MM-dd-hh:mm:ss'))
