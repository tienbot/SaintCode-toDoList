// let result = arr.reduce((acc, el, i, arr) => acc + el, 0)

let array = [
        {
            a: 5,
            b: 5,
            c: 5,
        },
        {
            a: 5,
            b: 5,
            c: 5,
        },
        {
            a: 5,
            b: 5,
            c: 5,
        },
    ]

// let result = array.reduce((acc, i) => acc+i.a+i.b+i.c, 0)
let result = array.reduce((acc, i) => ({a: acc.a + i.a, b: acc.b + i.b, c: acc.c + i.c}))
console.log(result)
