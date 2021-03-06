define(['./webuploader','./md5'],function(WebUploader){
	var _CeduUploader = {
	    serverPrefix: cxt.aefsUploadPath,
	    errorMsgMap: {
	        wrongParameter: {
	            code: "3001",
	            message: "Wrong parameter or data",
	            tip: "\u5165\u53c2\u6709\u8bef"
	        },
	        browserNotSupport: {
	            code: "3021",
	            message: "Browser not support",
	            tip: "\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u3002\u8bf7\u5347\u7ea7\u6d4f\u89c8\u5668\uff0c\u6216\u5b89\u88c5FlashPlayer\uff0c\u6216\u8005\u6539\u7528\u8c37\u6b4c\u6d4f\u89c8\u5668\uff01"
	        },
	        fileEmpty:{
	        	code: "3022",
	            message: "Browser is empty",
	            tip: "\u6587\u4ef6\u4e0d\u80fd\u4e3a\u7a7a"
	        },
	        fileTypeNotSupport: {
	            code: "3023",
	            message: "File type not support",
	            tip: "\u4e0d\u652f\u6301\u8be5\u7c7b\u6587\u4ef6"
	        },
	        fileSizeTooBig: {
	            code: "3024",
	            message: "File size too big",
	            tip: "\u6587\u4ef6\u592a\u5927"
	        },
	        fileSizeTooSmall: {
	            code: "3025",
	            message: "File size too small",
	            tip: "\u6587\u4ef6\u592a\u5c0f"
	        },
	        failUpload: {
	            code: "3029",
	            message: "Fail to upload file",
	            tip: "\u4e0a\u4f20\u6587\u4ef6\u65f6\u9047\u5230\u95ee\u9898"
	        }
	    },
	    register: function() {
	        var h = this.errorMsgMap;
	        WebUploader.Uploader.register({
	            "before-send-file": "preupload"
	        }, 
	        {
	            preupload: function(b) {
	                var c = this.owner
	                  , d = WebUploader.Deferred();
	                if (c.updateAuth()) {
	                    var p = new Date;
	                    c.log("size[" + c.getFiles().length + "], now calculate md5 of file:" + b.name);
	                    c.md5File(b.source).progress(function(d) {
	                        c.log("Percentage:" + d);
	                        c.updateProgress(b, d)
	                    }).fail(function() {
	                        c.log("Fail on md5 file:" + b.name);
	                        d.reject()
	                    }).then(function(k) {
	                        var r = +new Date;
	                        b.md5 = k;
	                        b.key = k;
	                        b.skip = !1;
	                        b.chunkMd5 = [];
	                        b.chunkDoneCount = 0;
	                        c.log("md5 size: " + WebUploader.formatSize(b.size) + " cost " + (r - p) + "ms get value: " + k);
	                        $.ajax(c.option("server"), {
	                            type: "POST",
	                            async: !1,
	                            dataType: "jsonp",
	                            jsonp: "jsoncallback",
	                            data: {
	                                isQuery: !0,
	                                md5: k,
	                                size: b.size,
	                                name: encodeURIComponent(b.name),
	                                bucket: b.option.bucket,
	                                transformDoc: b.option.transformDoc,
	                                transformVideo: b.option.transformVideo,
	                                imageZip: b.option.imageZip,
	                                publishSource: b.option.publishSource
	                            },
	                            success: function(e) {
	                                c.log("receive response on query md5.");
	                                "object" == typeof e.data ? (e = e.data,
	                                "undefined" != typeof e.chunksAdded ? (c.log("server has part:" + e.chunksAdded),
	                                b.serverCache = e) : 
	                                "undefined" != typeof e.url && (c.log("server has it. code:" + e.id),
	                                b.skip = !0,
	                                b.result = e,
	                                c.updateProgress(b, 1),
	                                c.skipFile(b)),
	                                d.resolve()) : "object" == typeof e.error ? (e = e.error,
	                                c.log(e.message + "[" + e.tip + "]"),
	                                d.reject()) : d.resolve()
	                            },
	                            error: function(b, d, g) {
	                                c.log("method md5 query got error:" + d);
	                                c.handleError(h.failUpload)
	                            }
	                        })
	                    });
	                    return d.promise()
	                }
	                c.cancelFile(b);
	                d.reject()
	            }
	        });
	        WebUploader.Uploader.register({
	            "before-send": "checkchunk"
	        }, {
	            checkchunk: function(b) {
	                var c = this.owner
	                  , d = WebUploader.Deferred();
	                c.log("check block:" + 
	                b.chunk + " / " + b.chunks);
	                var p = new Date;
	                c.md5File(b.blob).fail(function() {
	                    c.log("Fail on md5 block:" + b.index());
	                    c.handleError(h.failUpload);
	                    d.reject()
	                }).then(function(k) {
	                    c.log("block md5 cost " + (new Date - p) + "ms get value: " + k);
	                    b.file.chunkMd5[b.chunk] = k;
	                    var h = b.file.serverCache;
	                    "object" == typeof h && h.chunkMd5[b.chunk] == k && (c.log("skip chunk:" + b.chunk),
	                    b.file.chunkDoneCount++,
	                    d.reject());
	                    d.resolve()
	                });
	                return d.promise()
	            }
	        })
	    }
	};
	_CeduUploader.register();
	var CeduUploader=function (h) {
	    function b(a) {
	        return "object" == typeof t[a] ? t[a] : t._other_
	    }
	    function c(a) {
	        f.debug && window.console && window.console.log("[Uploader<" + f.id + ">] " + a)
	    }
	    function d(a, u) {
	        var b;
	        b = "undefined" != typeof u ? {
	            code: a.code,
	            message: a.message,
	            tip: a.tip,
	            file: u
	        } : a;
	        u ? g.removeFile(u, !0) : "3999" == a.code && (g.reset(),
	        c("reseted."));
	        f.fail(b)
	    }
	    function p(a, b) {
	        var d;
	        d = "string" == typeof a.md5 ? e.progressMd5Weight + b * (1 - e.progressMd5Weight) : b * e.progressMd5Weight;
	        c("onUploadProgress:" + a.name + ", upload percent: " + 
	        d);
	        a.percent = d;
	        f.progress(a)
	    }
	    function k() {
	        g = WebUploader.create({
	            pick: f.pick,
	            formData: {
	                chunkSize: e.chunkSize
	            },
	            auto: f.auto,
	            duplicate: !0,
	            swf: r.serverPrefix + "/wu/assets/Uploader.swf",
	            threads: 5,
	            chunked: !0,
	            chunkSize: e.chunkSize,
	            accept: f.accept,
	            server: "",
	            disableGlobalDnd: !0,
	            fileNumLimit: 1E3,
	            fileSizeLimit: void 0,
	            fileSingleSizeLimit: f.maxFileSize,
	            compress: !1
	        });
	        g.on("ready", function() {
	            c("ready :)");
	            r["uploader_" + f.id] = g;
	            g.updateProgress = function(a, b) {
	                p(a, b)
	            }
	            ;
	            g.handleError = 
	            function(a, b) {
	                d(a, b)
	            }
	            ;
	            g.config = f;
	            g.updateAuth = function() {
	                var a;
	                "" != g.option("server") ? a = !0 : (a = f.getAuth(),
	                "object" != typeof a || "string" != typeof a.sign ? (d(q.wrongParameter),
	                a = !1) : (g.option("server", r.serverPrefix + "/upload?client=wu&method=file.upload&appId=" + a.appId + "&userId=" + a.userId + "&timestamp=" + a.timestamp + "&sign=" + a.sign),
	                a = !0));
	                return a
	            }
	            ;
	            g.log = function(a) {
	                c(a)
	            }
	        });
	        g.on("fileQueued", function(a) {
	            a.on("statuschange", function(b, d) {
	                c("File[" + a.name + "]status prev:" + d + ",cur:" + b)
	            });
	            a.option = b(a.ext.toLowerCase())
	        });
	        g.on("uploadStart", function(a) {
	            f.start(a)
	        });
	        g.on("uploadAccept", function(a, b) {
	            if (b.error && b.error.code)
	                return c("uploadAccept error:" + b.error.code),
	                d(b.error, a.file),
	                !1;
	            var e = b.data;
	            if (!e || !e.id)
	                return c("Fail to parse response json of:" + a.file.name),
	                d(q.failUpload, a.file),
	                !1;
	            c("uploadAccept, chunk done of file:" + a.file.name + ", id=" + b.data.id + ", chunk=" + a.chunk + "/" + a.chunks);
	            var h = a.file;
	            h.chunkDoneCount++;
	            e.url && h.chunkDoneCount < a.chunks && (c("server has it ( from concurrency clients ). code:" + e.id),
	            h.skip = !0,
	            h.result = e,
	            p(h, 1),
	            g.skipFile(h),
	            f.complete(h));
	            return !0
	        });
	        g.on("uploadBeforeSend", function(a, b, c) {
	            "undefined" != typeof a.file.key && (b.key = a.file.key);
	            "undefined" != typeof a.file.md5 && (b.md5 = a.file.md5);
	            "undefined" != typeof a.file.chunkMd5 && (b.chunkMd5 = a.file.chunkMd5[a.chunk]);
	            b.bucket = a.file.option.bucket;
	            b.transformDoc = a.file.option.transformDoc;
	            b.transformVideo = a.file.option.transformVideo;
	            b.imageZip = a.file.option.imageZip;
	            b.publishSource = a.file.option.publishSource
	        });
	        g.on("uploadSuccess", 
	        function(a, b) {
	            c("Upload success: " + a.name);
	            if ("boolean" != typeof a.skip || !a.skip) {
	                var d = b.data;
	                if ("undefined" == typeof d.url) {
	                    c("error. upload done, but response not OK, now retry upload: " + a.name);
	                    g.retry(a);
	                    return
	                }
	                a.result = d
	            }
	            f.complete(a)
	        });
	        g.on("uploadProgress", function(a, b) {
	            p(a, b)
	        });
	        g.on("uploadError", function(a, b) {
	            c("Upload Error: " + b);
	            "undefined" != typeof b && "server" == b || d(q.failUpload, a)
	        });
	        g.on("error", function(a) {
	            c("error:" + a);
	            switch (a) {
	            case "Q_SIZE_EMPTY":
	            	d(q.fileEmpty);
	            	break;
	            case "Q_TYPE_DENIED":
	                d(q.fileTypeNotSupport);
	                break;
	            case "F_EXCEED_SIZE":
	                d(q.fileSizeTooBig);
	                break;
	            default:
	                d(q.failUpload)
	            }
	        });
	        return g
	    }
	    var r = _CeduUploader, e = {
	        chunkSize: 524288,
	        maxFileSize: WebUploader.Uploader.support("html5") ? 4294967296 : 314572800,
	        progressMd5Weight: .05
	    }, q = r.errorMsgMap, g, f = {
	        id: void 0,
	        debug: !1,
	        acceptFileTypes: void 0,
	        maxFileSize: e.maxFileSize,
	        auto: !0,
	        multiple: !1,
	        fileOption: void 0,
	        getAuth: function() {
	            return null 
	        },
	        complete: function(a) {},
	        fail: function(a) {},
	        start: function(a) {},
	        progress: function(a) {},
	        accept: void 0
	    }, l;
	    for (l in h)
	        f[l] = h[l];
	    h = {
	        bucket: "",
	        transformDoc: "",
	        transformVideo: "",
	        imageZip: "",
	        publishSource: ""
	    };
	    var m = f.fileOption
	      , t = {}
	      , x = !1;
	    if ("object" == typeof m)
	        for (var n = 0; n < m.length; n++) {
	            var v = {};
	            for (l in h)
	                v[l] = h[l];
	            for (l in m[n].option)
	                v[l] = m[n].option[l];
	            if ("*" == m[n].type)
	                t._other_ = v,
	                x = !0;
	            else {
	                f.acceptFileTypes = "string" == typeof f.acceptFileTypes ? f.acceptFileTypes + "," + m[n].type : m[n].type;
	                for (var y = m[n].type.split(","), w = 0; w < y.length; w++)
	                    t[y[w]] = v
	            }
	        }
	    else
	        t._other_ = h;
	    x && (f.acceptFileTypes = void 0);
	    f.maxFileSize = Math.min(f.maxFileSize, e.maxFileSize);
	    "string" == typeof f.acceptFileTypes && (f.accept = {
	        title: "SupportFileTypes",
	        extensions: f.acceptFileTypes,
	        mimeTypes: "*"
	    });
	    if (function() {
	        var a;
	        try {
	            a = navigator.plugins["Shockwave Flash"],
	            a = a.description
	        } catch (b) {
	            try {
	                a = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
	            } catch (e) {
	                a = "0.0"
	            }
	        }
	        a = a.match(/\d+/g);
	        a = parseFloat(a[0] + "." + a[1], 10);
	        return WebUploader.Uploader.support() ? !0 : (WebUploader.Uploader.support("flash") || (a ? c("No Html5, FlashPlayer version too low.") : c("No Html5, No FlashPlayer.")),
	        d(q.browserNotSupport),
	        !1)
	    }())
	        return c("init uploader..."),
	        k();
	    c("Browser not support.");
	    return null 
	}
	return CeduUploader
})