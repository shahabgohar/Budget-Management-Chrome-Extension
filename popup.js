import {limitKeyCheck,setlimit,getLimit} from './storageOptions.js'
function displayNotification(){
    let notificationOps= {
        type:"basic",
        iconUrl:"icon48.png",
        title: "Limit Reached",
        message: "Uh looks like you have reached your limit"
    }
    //first parameter is the identifire and second is the option
    chrome.notifications.create('limitnotif',notificationOps)
}
window.addEventListener('DOMContentLoaded',(event)=>{
        var main = document.getElementById("main")
        var min = document.getElementById('min')
        //check if the user has already set the limit
       limitKeyCheck('limit').then(res=>{
           console.log(res)
           min.style.display = "none"
           let submitButton = document.getElementById('limitButton')
           submitButton.addEventListener('click', ()=>{
               let limitInput = document.getElementById("limit")
               let limitSet = document.getElementById('limitSet')
               limitSet.innerHTML = limitInput.value;
               console.log(limitInput.value)
               setlimit(limitSet.innerHTML)
               main.style.display = "none"
               min.style.display = "block"
           })
       }).catch(err=>{
            main.style.display = "none"
           min.style.display = "block"
           var limitd = document.getElementById('limitd')
           getLimit().then(res=>{
               limitd.innerHTML =res
               var limitAmount = parseInt(limitd.innerHTML);
               //    assign event handler to handle the input given by the user
               var amountSubmit = document.getElementById('amountSubmit')
               var amount = document.getElementById('amount')
               amountSubmit.addEventListener('click',()=>{
                   //check whether the amount entered is less than the limit
                   let amountEntered = parseInt(amount.value,10)
                   if(amountEntered <= limitAmount){
                       amount.value = 0
                       limitAmount -= parseInt(amountEntered)
                       setlimit(limitAmount)
                       //    update limit amount
                       getLimit().then(res=>{
                           limitd.innerHTML = res
                       })
                   }else{
                   //    show some notifications to the user for such thing
                       displayNotification()
                   }


               })
           })

       })



} )
