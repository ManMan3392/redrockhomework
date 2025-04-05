/**
  * @param {Iterable<Promise<T>>} iterable - 一个可迭代对象，包含多个 Promise 实例
  * @returns {MyPromise<T>} - 返回一个新的 Promise，它在任意一个给定的 Promise 成功或失败时立即解析或拒绝
  * @template T - Promise 的值类型
  */
function race(iterable) {//返回最快拿到结果的promise的结果
    return new MyPromise((resolve, reject) => {
        const iterator = iterable[Symbol.iterator]();
        let isSettled = false;//当前状态为false
        const processNext = () => {
            if (isSettled)//如果状态被修改为true,即已有一个promise拿到结果
                return;//结束函数
            const next = iterator.next();//遍历下一个promise
            if (next.done)
                return;//如果已遍历完所有promise,结束函数
            MyPromise.resolve(next.value).then((res) => {
                if (!isSettled) {
                    isSettled = true;//修改状态，代表已有一个promise成功拿到结果
                    resolve(res);//保存promise成功的结果
                }
            }, (err) => {//如果出错
                if (!isSettled) {
                    isSettled = true;//仍修改状态
                    reject(err);//记录promise失败的结果
                }
            });
            processNext();//递归调用函数执行下一个promise
        };
        processNext();//开启函数
    });
}

/**
 * @param {Iterable<Promise<T>>} iterable - 一个可迭代对象，包含多个 Promise 实例
 * @returns {MyPromise<Array<{status: 'fulfilled' | 'rejected', value: T} | {status: 'rejected', reason: any}>>} - 返回一个新的 Promise，当所有给定的 Promise 都已完成（无论成功还是失败）时解析为一个数组
 * @template T - Promise 的值类型
 */
function allSettled(iterable) {//返回所有promise结果数组
    return new MyPromise((resolve) => {
        const iterator = iterable[Symbol.iterator]();
        const results = [];//为结果准备一个数组
        let index = 0;
        let completedCount = 0;
        const processNext = () => {
            const next = iterator.next();
            if (next.done) {//如果遍历到末尾
                if (completedCount === index)//如果完成的promise数量等于所有promise数量
                    resolve(results);//记录结果
                return;//结束函数
            }
            const currentIndex = index++;
            MyPromise.resolve(next.value).then((value) => {
                results[currentIndex] = { status: 'fulfilled', value };//记录当前promise结果
                completedCount++;//完成的数量加一
                if (completedCount === index)
                    resolve(results);//同上
            }, (reason) => {//失败时
                results[currentIndex] = { status: 'rejected', reason };//记录失败的结果
                completedCount++;//完成的数量加一
                if (completedCount === index)
                    resolve(results);//同上
            });
            processNext();//递归调用函数执行下一个promise
        };
        processNext();//开启函数
    });
}

/**
 * @template T - Promise 成功时的值类型
 * @param {Iterable} iterable - 可迭代对象，包含多个 Promise 或值
 * @returns {MyPromise<T>} 新的 Promise，满足以下条件：
 * - 当任意一个 Promise 成功时立即解析
 * - 当所有 Promise 都拒绝时抛出 AggregateError
 */
function any(iterable) {
    return new MyPromise((resolve, reject) => {
        const iterator = iterable[Symbol.iterator]();
        const errors = [];//为错误准备一个数组
        let index = 0;
        let rejectedCount = 0;
        let isSettled = false;

        const processNext = () => {
            const next = iterator.next();

            // 迭代结束处理
            if (next.done) {
                if (index === rejectedCount && !isSettled) {//有成功的结果就不抛出错误
                    reject(new AggregateError(errors, 'All promises were rejected'));//抛出错误
                }
                return;
            }

            // 保存当前索引
            const currentIndex = index++;

            MyPromise.resolve(next.value).then(
                (value) => {
                    if (!isSettled) {//后面成功的结果将被忽略
                        isSettled = true;//修改状态，已成功拿到一个结果
                        resolve(value);//记录第一个成功的结果
                    }
                },
                (err) => {//为什么此处不考虑是否已成功拿到结果，any如果有成功的结果不是就不关心其他的错误了吗？那在此处加上一个if不就可以在成功拿到结果后忽略其他结果了吗？
                    errors[currentIndex] = err; // 按原始顺序存储错误
                    rejectedCount++;

                    // 检查是否全部拒绝
                    if (rejectedCount === index && !isSettled) {
                        reject(new AggregateError(errors, 'All promises were rejected'));
                    }
                }
            );

            // 继续处理下一个元素
            processNext();
        };

        processNext();
    });
}
