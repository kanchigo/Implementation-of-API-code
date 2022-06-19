//输入不仅是数组，可以是是Array，Map， Set，String等Iterator类型
function promiseAll(args) {
  return new Promise((resolve, reject) => {
    const promiseResults = []
    //迭代的次数
    let iteratorIndex = 0
    //完成的次数
    let resolveIndex = 0
    //迭代处理输入中的数据，for of遍历可以返回正确顺序
    for (const item of args) {
      //保存一份迭代的次数作为处理成功promiseResults的索引
      let resultIndex = iteratorIndex
      iteratorIndex += 1
      Promise.resolve(item).then(res => {
        //保存处理成功的结果
        promiseResults[resolveIndex] = res
        resolveIndex += 1
        //不能从单纯靠长度判断，对比迭代次数和处理成功次数才能保证promiseAll
        if (resultIndex === iteratorIndex) {
          resolve(promiseResults)
        }
      }).catch(err => {
        reject(err)
      })
    }
    if (iteratorIndex === 0) {
      resolve(promiseResults)
    }
  })
}
if (!Promise.all) Promise.all = promiseAll;