import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import 'mocha';
import Promise from '../src/promise';
chai.use(sinonChai);

const assert: any = chai.assert;

/* describe('Promise', () => {
    it('是一个类', () => {

    })
}) */

describe('Promise', () => {
    it('是一个类', () => {
        assert.isFunction(Promise);
        assert.isObject(Promise.prototype);
    });
    it('new Promise() 必须接受一个函数',() => {
        assert.throw(() => {
            // @ts-ignore
            new Promise();
        });
        assert.throw(() => {
            // @ts-ignore
            new Promise(1);
        });
        assert.throw(() => {
            // @ts-ignore
            new Promise(false);
        })
    });
    it('new Promise(fn) 会生层一个对象，对象有then 方法', () => {
        const promise = new Promise(() => {});
        assert.isFunction(promise.then);
    });
    it('new Promise(fn) 中的 fn 立即执行', () => {
        let fn = sinon.fake();
        new Promise(fn);
        assert(fn.called);
    });
    it('new Promise(fn) 中的 fn 执行的时候接受reslove 和 reject 两个函数', (done) => {
        
        new Promise((reslove:any, reject:any) => {
            assert.isFunction(reslove);
            assert.isFunction(reject);
            done();
        });
    });
    it('promise.then(success) 中的 success 会在 reslove 被调用的时候执行', (done) => {
        const success = sinon.fake();
        const promise = new Promise((reslove: any, reject: any) => {
            assert.isFalse(success.called);
            reslove();
            setTimeout(() => {
                assert.isTrue(success.called);
                done();
            }, 0)
        });
        promise.then(success, null)
    })
    it('promise.then(null, fail)中的 fail 会在reject 被调用的时候执行', done => {
        const fail = sinon.fake();
        const promise = new Promise((reslove: any, reject: any) => {
            assert.isFalse(fail.called);
            reject();
            setTimeout(() => {
                assert.isTrue(fail.called);
                done();
            })
        });
        promise.then(null, fail);
      
    });
    it('2.2.1', () => {
        const promise = new Promise((reslove: any) => {
            reslove();
        });
        promise.then(false, null);
        assert(1 === 1);
    })
    it('2.2.2', done => {
        const succeed = sinon.fake();
        const promise = new Promise((reslove: any) => {
            assert.isFalse(succeed.called);
            reslove(233);
            reslove(2333)
            setTimeout(() => {
                assert(promise.status === 'fulfilled');
                assert.isTrue(succeed.calledOnce);
                assert(succeed.calledWith(233));
                done();
            }, 0);
        })
        promise.then(succeed, null);
    })
    it('2.2.3', done => {
        const fail = sinon.fake();
        const promise = new Promise((reslove: any, reject: any) => {
            assert.isFalse(fail.called);
            reject(233);
            reject(2333)
            setTimeout(() => {
                assert(promise.status === 'rejected');
                assert.isTrue(fail.calledOnce);
                assert(fail.calledWith(233));
                done();
            }, 0);
        })
        promise.then(null, fail);
    });
    it('2.2.4 在我的代码执行之前，不得调用 then 后面的两函数', done => {
        const succeed = sinon.fake();
        const promise = new Promise((reslove: any) => {
            reslove();
        });
        promise.then(succeed, null);
        assert.isFalse(succeed.called);
        setTimeout(() => {
            assert.isTrue(succeed.called);
            done();
        }, 0);
    })
    it('2.2.4 失败回调', done => {
        const fn = sinon.fake();
        const promise = new Promise((reslove: any, reject: any) => {
            reject();
        });
        promise.then(null, fn);
        assert.isFalse(fn.called);
        setTimeout(() => {
            assert.isTrue(fn.called);
            done();
        }, 0)
    })
    it('2.2.5 ', done => {
        const promise = new Promise((reslove: any) => {
            reslove();
        });
        promise.then(function(this: any) {
            "use strict";
            assert(this === undefined);
            done();
        }, null)
    })
    it('2.2.6  then 可以在同一个promise里被多次调用', done => {
        const promise = new Promise((reslove: any) => {
            reslove();
        })
        const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
        promise.then(callbacks[0], null);
        promise.then(callbacks[1], null);
        promise.then(callbacks[2], null);
        setTimeout(() => {
            assert(callbacks[0].called);
            assert(callbacks[1].called);
            assert(callbacks[2].called);
            assert(callbacks[1].calledAfter(callbacks[0]));
            assert(callbacks[2].calledAfter(callbacks[1]));
            done();
        }, 0);
    })
    it('2.2.7', () => {
        const promise = new Promise((reslove: any) => {
            reslove();
        })
        const promise2: any = promise.then(() => {}, () => {});
        assert(promise2 instanceof Promise)
    })
    it('2.2.7.1 如果 then(success, fail) 中的success 返回一个x, 运行[[Reslove]](promise2, x)', done => {
        const promise1 = new Promise((reslove: any) => {
            reslove();
        });
        promise1
        .then(() => "success", () => {})
        .then((result: any) => {
            assert.equal(result, 'success');
            done();
        }, null);
    })
})