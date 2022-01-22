const path = require('path')
const rm = require('rimraf')
const fs = require('fs')

function copyToAndroid() {
    const androidAsset = path.resolve(__dirname, '../AndroidProject', 'app', 'src', 'main', 'assets', 'dist')
    rm.sync(androidAsset)
    copyDir(path.resolve(__dirname,'../dist'), androidAsset)
}

// 创建to目录并复制form内所有内容
function copyDir(from, to) {
    console.log('copy dir from: ' + from + ' to: ' + to);
    if (fs.existsSync(to)) throw Error('文件已存在：' + to)
    fs.mkdirSync(to)
    const files = fs.readdirSync(from)
    files.forEach(f => {
        const fp = path.resolve(from, f)
        const tp = path.resolve(to, f)
        if (fs.statSync(fp).isDirectory()) {
            copyDir(fp, tp)
        } else {
            fs.copyFileSync(fp, tp)
        }
    })
}
// module.exports = {
    // copyToAndroid
// }

copyToAndroid()