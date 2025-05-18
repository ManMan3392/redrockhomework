const path = require('path')
const resolve = pathname => path.resolve(__dirname, pathname)
const CracoLessPlugin = require('craco-less')
module.exports = {
    Plugin: [
        {
            plugin: CracoLessPlugin
        }
    ],
    webpack: {
        alias: {
            "@": resolve("src"),
            "components": resolve("src/components"),
            "utils": resolve("src/utils")
        }
    }
}