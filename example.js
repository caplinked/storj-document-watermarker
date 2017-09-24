var storjCaplinked = require('./index.js');

var storjBucketId = '9e14067509158a63a9ea91e0';
var storjFileId = 'a43511314b3bb0cb09d79b4f';
var downloadId = '223555';

storjCaplinked.watermarkFile(storjBucketId, storjFileId, function(result, error) {
  console.log('result:', result); // { download_id: 223555 }
  console.log('error:', error);
});

storjCaplinked.downloadWatermarkedFile(downloadId, function(result, error) {
  console.log('result:', result);
});
