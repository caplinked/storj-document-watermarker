require('dotenv').config();

var penv = process.env;
var fs = require('fs');
var storj = require('storj');
var storjClient = new storj({
  bridge: 'https://api.storj.io',
  basicAuth: {
    email: penv.storj_email,
    password: penv.storj_pass
  },
  encryptionKey: penv.storj_encryption_key
});

var caplinked = require('caplinked-api-node');
var caplinkedClient = new caplinked({
  apiUserToken: penv.cl_api_user_token,
  apiKey: penv.cl_api_key,
  apiSecretKey: penv.cl_api_secret_key,
  apiHost: penv.cl_api_host
});

function downloadWatermarkedFile(assetId, callback) {
    caplinkedClient.downloads.downloadZip(penv.cl_workspace_id, assetId).then(function(response) {
      if (response) {
        callback(response);
      } else {
        callback(null, { error: 'cl_download_failure' });
      }
    })
    .catch(function(error) {
      callback(null, { error: 'cl_download_request' });
    });
}

function createZip(assetId, callback) {
    caplinkedClient.downloads.createZip(penv.cl_workspace_id, { file_ids: [assetId] }).then(function(response) {
      if (response && response.id) {
        callback({ download_id: response.id });
      } else {
        callback(null, { error: 'cl_zip_failure' });
      }
    })
    .catch(function(error) {
      callback(null, { error: 'cl_zip_request' });
    });
}

function watermarkFile(bucketId, fileId, callback) {
  var file = storjClient.getFile(bucketId, fileId);
  file.on('done', function cb() {
    var data = '';
    var filename = 'storj-'+file.id+'-'+file.name;
    var readstream = file.createReadStream();
    readstream.on('data', function(chunk) {
      data += chunk;
    }).on('end', function() {
      caplinkedClient.files.upload(penv.cl_workspace_id, penv.cl_folder_id, filename, data).then(function(response) {
        if (response && response.id) {
          createZip(response.id, callback);
        } else {
          callback(null, { error: 'cl_upload_failure' });
        }
      })
      .catch(function(error) {
        callback(null, { error: 'cl_upload_request' });
      });
    });
  });
  file.on('error', function cb(e) {
    callback(null, { error: 'storj_download' });
  });
}

module.exports = {
  watermarkFile: watermarkFile,
  downloadWatermarkedFile: downloadWatermarkedFile
};
