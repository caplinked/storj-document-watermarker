![Caplinked](https://www.caplinked.com/wp-content/uploads/Caplinked-Logo-299x80.png)

# Storj.io Document Watermarker

Demo which pulls down a file from your Storj bucket and uses the Caplinked API to apply watermarks. This is currently using the latest [Caplinked API NodeJS SDK](https://github.com/caplinked/caplinked-api-node) and [storj.js](https://github.com/Storj/storj.js) (pending release of [node-libstorj](https://github.com/Storj/node-libstorj)).  

#### Prerequisites:
* Storj API account - [https://storj.io/](https://storj.io/)
* Caplinked API keys - [https://developer.caplinked.com](https://developer.caplinked.com)
* [libstorj](https://github.com/Storj/libstorj)

#### Usage:
```
// set environment variables (dotenv)

var storjCaplinked = require('storj-document-watermarker');

var storjBucketId = '9e14067509158a63a9ea91e0';
var storjFileId = 'a43511314b3bb0cb09d79b4f';
var downloadId = '223555';

storjCaplinked.watermarkFile(storjBucketId, storjFileId, function(result, error) {
  console.log('result:', result); // { download_id: 223555 }
  console.log('error:', error);
});

storjCaplinked.downloadWatermarkedFile(downloadId, function(result, error) {
  console.log('result:', result); // { "expiring_url": "string", "file_name": "string" }
});

```
