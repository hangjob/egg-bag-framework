# egg-bag-framework

🍁基于Egg.js封装框架，扩展常用模块jwt、令牌桶、参数校验、加解密，多文件上传等等，开箱即用

该框架，面向于企业中的后端程序，代码下载下来后，自行更改mysql、redis配置

## 开始

```bash
$ npm install
```

## 创建软连接

```bash
$ npm link
$ npm link egg-bag-framework // 应用目录
```

## 应用项目部署-服务器
将应用部署到服务器上，`app`，`config`，`package.json`，`app.js`
```json
{
    "start": "egg-scripts start --daemon --port=7010 --title=egg-bag"
}
```
```bash
npm install
npm run start # npm run stop 如果有先暂停项目以免端口占用
# 会一生成一个守护进程 http://127.0.0.1:7010/
```
## nginx
添加一个反向代理到 http://127.0.0.1:7010/
```nignx
location ^~ /
{
    proxy_pass http://127.0.0.1:3010/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_http_version 1.1;
    add_header X-Cache $upstream_cache_status;
    if ( $uri ~* "\.(gif|png|jpg|css|js|woff|woff2)$" )
    {
        expires 30d;
    }
    proxy_ignore_headers Set-Cookie Cache-Control expires;
    proxy_cache cache_one;
    proxy_cache_key $host$uri$is_args$args;
    proxy_cache_valid 200 304 301 302 10m;
}
```



## 附带功能
### 前端压缩视频
大文件放到前端压缩，会很好的减轻服务器的压力
```html

<script src="https://unpkg.com/@ffmpeg/ffmpeg@0.9.5/dist/ffmpeg.min.js"></script>
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>

<h2>视频前端压缩</h2>
<video id="video" controls></video><br/>
<input type="file" id="upload">
<p id="text"></p>
<script>
    const { createFFmpeg, fetchFile } = FFmpeg;
    const text = document.getElementById('text');
    const ffmpeg = createFFmpeg({
        log: true,
        progress: ({ ratio }) => {
            text.innerHTML = `完成率: ${(ratio * 100.0).toFixed(2)}%`;
        },
    });
    const transcode = async ({ target: { files } }) => {
        const { name } = files[0];
        text.innerHTML = '正在加载 ffmpeg-core.js';
        await ffmpeg.load();
        text.innerHTML = '开始压缩';
        ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
        // '-b','2000000'  值越小  压缩率越大
        await ffmpeg.run('-i', name, '-b', '2000000', 'put.mp4');
        text.innerHTML = '压缩完成';
        const data = ffmpeg.FS('readFile', 'put.mp4');
        const video = document.getElementById('video');
        video.src = URL.createObjectURL(new Blob([ data.buffer ], {
            type: 'video/mp4'
        }));
    };
    document.getElementById('upload').addEventListener('change', transcode);
</script>
```

### 帮助文档

https://juejin.cn/post/7288178532862083112
https://www.kancloud.cn/han88829/book/2025973

### 数据库
https://blog.csdn.net/ab15176142633/article/details/120064660
