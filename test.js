class Test {
    constructor(){}

    method() {
        const prom = new Promise((res, rej) => {
            setTimeout(() => {
                res("OK")
            }, 5000)
        }).then((data) => data + " OK ")

        return prom
    }
}

const test = new Test()

const method = test.method()

method.then(data => console.log(data))

setTimeout(() => { method.then(data => console.log(data))}, 5000)