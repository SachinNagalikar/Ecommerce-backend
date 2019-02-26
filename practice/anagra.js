function anagramCheck(a, b) {
    let first = a.toLowerCase().split('').sort().join('')
    let second = b.toLowerCase().split('').sort().join('')
    if (first === second) {
        return true
    } else {
        return false
    }
}
console.log(anagramCheck("sachin","ancshi"))