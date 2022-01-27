const PORT = 8000
const express = require('express')
const app = express()

// Route for getting an array of n unique random numbers from a list of K integers. K>=n

app.get('/uniqueRandom/:maxNum/:numSelect', (req,res) => {
    try{
        var {maxNum: maximumNumber, numSelect: numberToSelect} = req.params
        maximumNumber = parseInt(maximumNumber)
        numberToSelect = parseInt(numberToSelect)
        // GC01 to check whether K>=n
        if(maximumNumber < numberToSelect){ res.json(["You need to choose a number lesser than the maximum number"])}
        else{
            res.json(uniqueRandomNumberList(maximumNumber,numberToSelect))
        }
    }
    catch(error){
        console.log(error)
    }  
})


// Unique Random Number Generator Function
function uniqueRandomNumberList(maxNum = 52, numSelect = 4){
    const partSize = maxNum/numSelect
    const firstRand = (Math.random() * (maxNum)) + 1
    const limits_array = []
    for (i=1; i<=numSelect; i++){
        limits_array.push(cyclicIncrement(maxNum,(partSize*i),firstRand))
    }
    const finalNumberArray = []
    for(i=0; i<numSelect; i++){
        j = i + 1
        if(j==numSelect){j = 0}
        finalNumberArray.push(Math.floor(posRealRandGen(maxNum,limits_array[i],limits_array[j])) + 1)
        //The code below could have been used but it runs into the issue of overshooting by rounding
        // finalNumberArray.push(Math.floor(posRealRandGen(maxNum, cyclicIncrement(maxNum,cyclicIncrement(maxNum, firstRand, (i*partSize)),1),cyclicIncrement(maxNum, firstRand, ((i+1)*partSize)))))
    }
    return finalNumberArray
}

// Single Random Number(Positive Real Number) Generator Function
function posRealRandGen(maxNum, lowLimInc, upLimExc){
    return cyclicIncrement(maxNum,cyclicIncrement(maxNum, Math.random() * cyclicDifference(maxNum,cyclicDifference(maxNum, upLimExc, lowLimInc) , 1) , 1), lowLimInc)
}

// Custom Assist Functions
// Cyclic Addition
function cyclicIncrement(maxNum, currentNum, incrementBy = 1){
    if(currentNum + incrementBy > maxNum){
        return (currentNum + incrementBy - maxNum)
    }
    return (currentNum + incrementBy)
}

// Cyclic Difference
function cyclicDifference(maxNum, minuend, subtrahend){
    if(subtrahend > minuend){
        return (maxNum + minuend - subtrahend)
    }
    return (minuend - subtrahend)
}

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT} `))