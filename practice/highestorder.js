function main(a) {
    var count = {},maxi={}
    a.split('').forEach(function (n) {
        count[n]=(count[n]||0)+1
    })
    
    for (let key in count) {
        var max = Object.values(count)
        var ele = Math.max(...max)
        console.log(count[key])
        if (count[key] == ele) {
            
            return key
        }
    }

}
console.log(main("aaaaacnnnne"))