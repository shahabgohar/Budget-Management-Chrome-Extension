
var contextMenuItem = {
    "id":"spendmoney",
    "title":"Spend Money",
//    where it should appear
    "contexts":["selection"]
}
function determineItIsNumber(number){
    let isNumber = false
    for(let i =0 ; i< number.length;i++){
        let code = number[i].charCodeAt(0)
        if( code === 46 || (code > 48 && code < 58)){
                isNumber = true
        }else {
            isNumber = false
            break;
        }

    }
    return isNumber
}
function getLimitAmount(){
    return new Promise((ressolve,error)=>{
        chrome.storage.sync.get('limit',(value)=>{
            console.log(value)
            if(value.limit !== null)
                ressolve(value.limit)
            else throw new Error('cant get the limit')

        })
    })

}
function displayNotification(mess = null){
    let notificationOps= {
        type:"basic",
        iconUrl:"icon48.png",
        title: "Limit Reached",
        message: mess == null ?"Uh looks like you have reached your limit": mess
    }
    //first parameter is the identifire and second is the option
    chrome.notifications.create('limitnotif',notificationOps)
}
function setLimit(value){
    chrome.storage.sync.set({'limit':value})
}
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener((clicked)=>{
    if(clicked.menuItemId == "spendmoney" && clicked.selectionText){
        if(determineItIsNumber(clicked.selectionText.trim())){
            let amount = parseFloat(clicked.selectionText.trim())
            getLimitAmount().then(value => {
                var finalAmount = 0
                if(amount < value)
                {
                    finalAmount = value - amount
                    setLimit(finalAmount)
                    displayNotification(`${amount} has been subtracted from ${value} Remaining: ${finalAmount}`)
                }
                else{
                    displayNotification()
                }


            })
        }
    }
})
chrome.storage.onChanged.addListener((changes,storageName)=>{
    chrome.browserAction.setBadgeText({"text":changes.limit.newValue.toString()})
})