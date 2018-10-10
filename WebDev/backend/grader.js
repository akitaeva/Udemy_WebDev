const average = (arr) => {

    console.log(Math.round((arr.reduce((a,b) => a+b))/arr.length))
    return Math.round((arr.reduce((a,b) => a+b))/arr.length)

}

average([88, 78, 65, 93])