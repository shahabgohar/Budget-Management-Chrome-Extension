import {limitKeyCheck,setlimit,getLimit} from './storageOptions.js'
window.addEventListener('DOMContentLoaded',()=>{
    var limit = document.getElementById('limit')
    limitKeyCheck('limit').catch(err=>{
    //    user limit exist
        getLimit().then(res=>{
            limit.value = parseInt(res)
        })
    })
//    update button
    var update = document.getElementById('update')
    update.addEventListener('click',()=>{
        setlimit(limit.value)
        close();
    })
})