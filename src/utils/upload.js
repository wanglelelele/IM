class Upload{
    constructor(data, callback){
        this.file = data
        this.callback = callback
        this.transformFileToDataUrl()
    }
   
    compress() {
        /**
         * 压缩图片
         * @param callback 下一步回调
         */
        const  compressionRatio  = 1
        const imgFile = this.file
        const img = new window.Image();
        img.src = this.dataUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let compressedDataUrl;
            if (this.isCompress) {
                compressedDataUrl = canvas.toDataURL(imgFile.type, (compressionRatio / 100));
            } else {
                compressedDataUrl = canvas.toDataURL(imgFile.type, 1);
            }
            this.compressedDataUrl = compressedDataUrl;
            this.width = img.width;
            this.height = img.height
            this.processData()
        }
    }
    processData() {
        // 为了兼容性 处理数据
        const dataURL = this.compressedDataUrl;
        const imgFile = this.file;
        const binaryString = window.atob(dataURL.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const intArray = new Uint8Array(arrayBuffer);
        for (let i = 0, j = binaryString.length; i < j; i++) {
            intArray[i] = binaryString.charCodeAt(i);
        }
        const fileData = [intArray];
        let blob;
        try {
            blob = new Blob(fileData, { type: imgFile.type });
        } catch (error) {
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            if (error.name === 'TypeError' && window.BlobBuilder) {
                const builder = new BlobBuilder();
                builder.append(arrayBuffer);
                blob = builder.getBlob(imgFile.type);
            } else {
                throw new Error('版本过低，不支持上传图片');
            }
        }
        this.blob = blob;
        this.callback(this)
    }
    transformFileToDataUrl() {
        /**
         * 图片上传流程的第一步
         * @param data file文件 该数据会一直向下传递
         * @param callback 下一步回调
         * @param compressCallback 回调的回调
         */
        // const { compress } = this.props;
        const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target.result;
            this.dataUrl = result;
            if (result.length > imgCompassMaxSize) {
                this.isCompress = true;
                // callback(that.data,compressCallback); // 图片压缩
            } else {
                this.isCompress = false;
                // callback(that.data,compressCallback); // 图片不压缩
            }
            this.compress()

        }
        reader.readAsDataURL(this.file)
    }
}
export default Upload