/* vim: set et sw=4 ts=4 sts=4 fdm=marker ff=unix fenc=utf8 nobomb: */

/**
 * filename.js
 *
 * @author xiaoqiang
 * @mail   qiang0902@126.com
 * @date
 */

var userData = Folder.userData;//Folder.commonFiles;// 
//var extensionDir = userData + '/Adobe/CEP/extensions';
var appVersion = app.version.split('.')[0];
var dir = (parseInt(appVersion) == 14)? 'CEPServiceManager4' : 'CEP';
var extensionDir = userData + '/Adobe/'+ dir +'/extensions';
var folder = new Folder(extensionDir);
if (folder.exists) {
	alert("接下来会打开一个文件夹，请把安装包里头的cutterman目录拷贝过去!");
    folder.execute();
} else {
	var adobeDir = new Folder(userData + '/Adobe');
	if (adobeDir.exists) {
		var cepDir = new Folder(userData + '/Adobe/' + dir);
		var ret = true;
		if (!cepDir.exists) {
			ret = false;
			ret = cepDir.create();
		}
		if (ret) {
			var extDir = new Folder(extensionDir);
			if (!extDir.exists) {
				if (extDir.create()) {
					alert("接下来会打开一个文件夹，请把安装包里头的cutterman目录拷贝过去!");
					extDir.execute();
				} else {
					alert('can not create path: ' + extDir.absoluteURI);
				}
			} else {
				alert("接下来会打开一个文件夹，请把安装包里头的cutterman目录拷贝过去!");
				extDir.execute();
			}
		} else {
			alert('can not create path: ' + cepDir.absoluteURI);
		}
	} else {
	    alert('can not find userData Adobe directory! ');
	}

}
