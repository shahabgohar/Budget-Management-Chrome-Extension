const limitKeyCheck = function checkKeyAlreadyExist(ke){

    var exist = true
    return new Promise((ressolve,error)=>{
        console.log(ke)
        chrome.storage.sync.get(ke,(result)=>{
            console.log(result[ke])
            if(result[ke] == null){
                exist = false
                ressolve(true)
            }else{
                error(false)
            }
        })
    })

}
const setlimit = function setLimit(value){
    chrome.storage.sync.set({'limit':value})
}

const getLimit = function getLimitAmount(){
    return new Promise((ressolve,error)=>{
        chrome.storage.sync.get('limit',(value)=>{
            console.log(value)
            if(value.limit !== null)
                ressolve(value.limit)
            else throw new Error('cant get the limit')

        })
    })

}


export {limitKeyCheck,setlimit,getLimit}