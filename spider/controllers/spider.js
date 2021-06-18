const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// 从命令行参数获取root目录，默认时当前目录
const root = path.resolve(process.argv[2] || '.');
const spiderData = path.join(root, '/spider_data');

// 处理页面
const handleTarget = (res) => {
    let arr = [];
    let $ = cheerio.load(res);
    $('.clearfix .moduleBrand_right').each(function(){
        var _title = $(this).find('.titleInfo a').text().trim()
        var _url = $(this).find('.titleInfo a').attr('href')
        var _img = $(this).find('a img').attr('gome-src')
        var _pid = $(this).find('.price, .asynPrice').attr('pid')
        var _skuid = $(this).find('.price, .asynPrice').attr('skuid')
        
        //产品信息
        var product = {
            title: _title,
            url: _url,
            img: _img,
            pid: _pid,
            skuid: _skuid
        }
        
        //放入产品列表
        arr.push(product)
    })
    return arr;
}

// 请求目标页面
const getTarget = async() => {
    return await request({
        headers: {'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'},
        method: 'GET',
        uri: 'https://tongxun.gome.com.cn/?intcmp=sy-1000037040-0'
    }).then((res) => {
        return handleTarget(res)
    }).catch((err) => {
        console.log(`网页抓取失败: ${err}`);
    });
}

const fn_spider = async(ctx, next) => {
    console.log('启动爬虫...');
    const result = await getTarget();
    await next();
    result.forEach(v => {
        const dir = spiderData + '/' + v.title;
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                console.log(err);
            } else {
                const data = `
                    title: ${v.title},\n
                    url: ${v.url},\n
                    img: ${v.img},\n
                    pid: ${v.pid},\n
                    skuid: ${v.skuid}
                `
                // 保存基本信息
                fs.writeFile(dir + '/info.txt', data, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('异步写入完成~');
                    }
                });
                // 请求图片地址，并保存图片
                var imgWriteStream = fs.createWriteStream(dir + '/img.jpg').on('close', function() {
                    console.log('异步写入图片完成~');
                });
                request({ method: 'GET', uri: 'http:' + v.img }).pipe(imgWriteStream);
            }
        })
    })
    ctx.response.type = 'application/json';
    ctx.response.body = result;
}

module.exports = [
    {
        method: 'GET',
        path: '/spider',
        func: fn_spider
    }
]
