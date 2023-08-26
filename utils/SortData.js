function SortData(todos){
const sortedtodos = {}
todos.map(item=>{
    if(!sortedtodos[item.status]){
        sortedtodos[item.status]=[];
    }
    sortedtodos[item.status].push(item)
})
return sortedtodos
}

export{SortData}