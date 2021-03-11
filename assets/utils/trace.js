import {generateNonceStr, getUserUniqueKey} from "assets/utils/index";
import md5 from "js-md5";
import {http_post} from "assets/utils/http";

export default {
    data() {
        return {
            recordData: {},
            pageLoaded: false,
            prandom: '',
            readDone: false, //滚动到底记录
            loadTime: 0,
            _path: '/',
            _windowScroll: null, //滚动函数
        }
    },
    methods: {
        hookActivated() {
            var that = this;
            var recordData = this.recordData;
            var option = Object.assign({}, this.$route.params, this.$route.query);
            this.loadTime = new Date().getTime();
            this.recordData = Object.assign({}, recordData, option || {});
            this.prandom = pageRandom([16, 0, 0, generateNonceStr(), this.loadTime, this.$route.path]);
            this.readDone = false;
            this._path = this.$route.path;
            sendTraceData({
                url: this._path,
                lid: this.prandom,
                act: 'start',
                module: 's16',
                lcstime: this.loadTime,
                get: this.recordData
            }, function (res) {
                var readyTime = new Date().getTime();
                sendTraceData({
                    url: that._path,
                    lid: that.prandom,
                    act: 'end',
                    module: 's16',
                    lcetime: readyTime,
                    lcspan: readyTime - that.loadTime
                })
            });
        },
        hookDeactivated() {
            var unloadTime = new Date().getTime();
            sendTraceData({
                url: this._path,
                lid: this.prandom,
                act: 'left',
                lcltime: unloadTime,
                lcstay: unloadTime - this.loadTime
            });
        },
    }
}
function pageRandom(arg)
{
    arg = arg || [];
    return md5(arg.join("&"));
}

function sendTraceData(data, resolve, reject)
{
    var normalData = {
        ukey: getUserUniqueKey(),
        srchn: 0,
        spchn: 0,
        srdist: 21,
    }
    var mergeData = Object.assign({}, normalData, data);
    startSendTrace(mergeData, resolve, reject);
}

function startSendTrace(data, resolve, reject)
{
    var num = 0;

    function record()
    {
        num++;
        http_post('/log/visit/insert', data).then(function (res) {
            if (res != 'success')
            {
                //最多请求3次
                if (num > 3)
                {
                    if (typeof reject === 'function')
                    {
                        reject(res);
                    }
                }
                else
                {
                    setTimeout(function () {
                        record();
                    }, 5000);
                }
            }
            else
            {
                if (typeof resolve === 'function')
                {
                    resolve(res);
                }
            }
        }).catch(function (error) {
            if (num > 3)
            {
                if (typeof reject === 'function')
                {
                    reject(error);
                }
            }
            else
            {
                setTimeout(function () {
                    record();
                }, 5000);
            }
        });
    }

    record();
}
