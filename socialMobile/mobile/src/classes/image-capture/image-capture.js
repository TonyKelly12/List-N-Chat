var ImageCapture = /** @class */ (function () {
    function ImageCapture(camera, file) {
        this.camera = camera;
        this.file = file;
    }
    // Get image either from camera or photo library
    ImageCapture.prototype.loadImage = function (cameraSourceType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var cameraOptions = {
                sourceType: cameraSourceType,
                destinationType: _this.camera.DestinationType.FILE_URI,
                quality: 100,
                encodingType: _this.camera.EncodingType.JPEG,
                mediaType: _this.camera.MediaType.PICTURE,
                targetWidth: 400,
                targetHeight: 400,
                correctOrientation: true
            };
            _this.camera.getPicture(cameraOptions).then(function (path) {
                var imagePath = path.substr(0, path.lastIndexOf('/') + 1);
                var imageName = path.substr(path.lastIndexOf('/') + 1);
                _this.file.readAsDataURL(imagePath, imageName).then(function (imageData) {
                    resolve(imageData);
                });
            }, function (err) {
                reject(err);
            });
        });
    };
    return ImageCapture;
}());
export { ImageCapture };
//# sourceMappingURL=image-capture.js.map