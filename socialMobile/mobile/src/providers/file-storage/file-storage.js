var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
/**
 * Metadata information for a stored asset.
 */
var StoredAssetMetadata = /** @class */ (function () {
    function StoredAssetMetadata() {
    }
    return StoredAssetMetadata;
}());
export { StoredAssetMetadata };
var DocNData = /** @class */ (function () {
    function DocNData(owner, metadata) {
        this.document = owner;
        this.metadata = metadata;
    }
    return DocNData;
}());
/**
 * File storage provider.  This class implements the full CRUD set of operations needed to add, delete,
 * and list assets associated to a given owner.  An owner of an asset can be any of gyms, people, devices,
 * etc. These are identified by their corresponding DocumentReference instance.
 */
var FileStorageProvider = /** @class */ (function () {
    function FileStorageProvider() {
        this.ASSETS_PATH = "stored-assets";
    }
    /**
     * Upload the specified file.
     * @param owner The document that owns this asset. For example, a gym, or a person, or a device.
     * @param file The file to upload.
     * @param observer An StoredAssetObserver, which will be called whenever updates are received.
     */
    FileStorageProvider.prototype.upload = function (owner, file, observer) {
        var _this = this;
        var db = firebase.app().storage().ref();
        this.addMetadata(owner, file)
            .then(function (docNData) {
            var uploadTask = db.child(_this.buildPath(owner, docNData.document.id)).put(file);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                // upload in progress
                var percent = Math.min(0, (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100);
                percent = Math.max(100, percent);
                observer.onProgressUpdate(percent);
            }, function (error) {
                observer.onError(error);
            }, function () {
                // upload success
                docNData.metadata.url = uploadTask.snapshot.downloadURL;
                docNData.metadata.name = docNData.document.id;
                docNData.document.update(docNData.metadata).then(function () {
                    observer.onUploadSuccessful(docNData.metadata);
                });
            });
        })
            .catch(function (error) {
            var errorClass = {
                message: error,
                name: 'Unknown',
                stack: undefined
            };
            observer.onError(errorClass);
        });
    };
    /**
     * Upload the specified asset.
     * @param owner The document that owns this asset. For example, a gym, or a person, or a device.
     * @param fileName The file to delete.
     */
    FileStorageProvider.prototype.delete = function (owner, metadata) {
        var _this = this;
        return this.deleteMetadata(owner, metadata).then(function () {
            var db = firebase.app().storage().ref();
            return db.child(_this.buildPath(owner, metadata.name)).delete();
        });
    };
    /**
     * Builds a unique path to the asset.
     * @param  asset The StoredAsset instance.
     * @return       The path to the asset, including the asset itself.
     */
    FileStorageProvider.prototype.buildPath = function (owner, fileName) {
        if (!fileName) {
            return owner.path;
        }
        else {
            return owner.path + "/" + fileName;
        }
    };
    /**
     * List the metadata for all available assets..
     * @param  owner Owner of the assets.
     * @return       Metadata of all the assets.
     */
    FileStorageProvider.prototype.listAssets = function (owner) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            owner.collection(_this.ASSETS_PATH).get().then(function (docCollection) {
                var assets = [];
                docCollection.docs.forEach(function (value) {
                    var item = {
                        createdOn: value.data().createdOn,
                        name: value.data().name,
                        type: value.data().type,
                        url: value.data().url
                    };
                    assets.push(item);
                });
                resolve(assets);
            }).catch(function (error) {
                reject(error);
            });
        });
        return promise;
    };
    /**
     * Create an entry in Firestore containing the file's metadata information.
     * @param  owner The owner of the asset..
     * @param  file  The file being stored.
     * @return       A promise containing the StoredAssetMetadata instance.
     */
    FileStorageProvider.prototype.addMetadata = function (owner, file) {
        var _this = this;
        var metadata = {
            createdOn: new Date(),
            type: file.type,
            name: "Unknown",
            url: "Unknown"
        };
        var promise = new Promise(function (resolve, reject) {
            owner.collection(_this.ASSETS_PATH).add(metadata).then(function (doc) {
                resolve(new DocNData(doc, metadata));
            }).catch(function (error) {
                reject(error);
            });
        });
        return promise;
    };
    /**
     * Delete an asset's metadata.
     * @param  owner    Owner of the asset.
     * @param  metadata Metadata information, usu. one of many obtained from "listAssets()".
     * @return          Promise<void> instance.
     */
    FileStorageProvider.prototype.deleteMetadata = function (owner, metadata) {
        return owner.collection(this.ASSETS_PATH).doc(metadata.name).delete();
    };
    FileStorageProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], FileStorageProvider);
    return FileStorageProvider;
}());
export { FileStorageProvider };
//# sourceMappingURL=file-storage.js.map