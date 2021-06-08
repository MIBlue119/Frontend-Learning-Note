console.log("Hello")

async function hello() {
    return 'Hey Guy!';
    throw "OH NO,PrOBLEM!"
}
hello();
// Promise {<resolved>:"Hey guy!"}
// The content above is printed at console, if you want to check the Promise object

//We could also process the data return from Promise
hello()
    .then((data) => {
        console.log("PROMISE RESOLVED WITH:", data)
    })
    .catch((err) => {
        console.log("OH NO PROMISE REJECTED!")
        console.log(err)
    })


async function uhOh() {
    //This is the way we reject from aync 
    throw new Error('oh no!');
}
//uhOh();
//Promise {<rejected>:"Error:oh no!"}


const login = async (username, password) => {
    if (!username || !password) throw 'Missing Crendentials'
    if (password === 'BigBang') return "Welcome"
    throw 'Invalid Password'
}

login('Steward', 'BigBang')
    .then((msg) => {
        console.log("LOGGED IN!")
        console.log(msg)
    })
    .catch((err) => {
        console.log("ERROR!")
        console.log(err)
    })


const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

//We could use in this way and don't write in nested way
// delayedColorChange('red', 1000)
//     .then(() => {
//         return delayedColorChange('orange', 1000)
//     })
//     .then(() => {
//         return delayedColorChange('blue', 3000)
//     })
//     .then(() => {
//         return delayedColorChange('green', 1000)
//     })


// //We could rewrite
// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('blue', 500))
//     .then(() => delayedColorChange('green', 1000))


async function rainbow() {
    await delayedColorChange('red', 500) //add await to wait after the promise resolved
    await delayedColorChange('violet', 500)
    await delayedColorChange('yellow', 500)
    await delayedColorChange('blue', 500)
    await delayedColorChange('indigo', 500)
    await delayedColorChange('green', 500)
    return "ALL DONE!"; // aync function is also a promise, it could return something
}
//rainbow().then((msg) => { console.log("END OF RAINBOW:", msg) })


async function printRainbow() {
    let data = await rainbow(); // It would take 3 seonds to wait the promise resolved.
    console.log("END OF RAINBOW!")
    console.log("msf of the function ranbow():", data);
}

//printRainbow()



// const fakeRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         const rand = Math.random();
//         setTimeout(() => {
//             if (rand < 0.7) {
//                 resolve("YOUR FAKE DATA HERE");
//             }
//             reject('REQUEST ERROR!');
//         }, 1000)
//     })
// }
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 2000) {
                reject('Connection Timeout')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}

async function makeTwoRequests() {
    try {
        let data1 = await fakeRequest('/page3')
        console.log(data1)
        let data2 = await fakeRequest('/page4')
        console.log(data2)
    } catch (e) {
        console.log("CAUGHT AN ERROR")
        console.log("error is:,", e)
    }
}