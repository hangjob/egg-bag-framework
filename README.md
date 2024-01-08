# egg-bag-framework

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

## 前端压缩视频
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
