# What is Promise/ Async/ Await/同步/非同步?



Resource:

###  [JavaScript 中的同步與非同步（上）：先成為 callback 大師吧！](https://blog.huli.tw/2019/10/04/javascript-async-sync-and-callback/)

### Concepts
1. 什麼是阻塞？什麼是非阻塞？
2. 什麼是同步？什麼是非同步？
3. 同步與非同步的差別在哪裡？
4. 為什麼需要非同步？
5. callback 是什麼？
6. 為什麼需要 callback？
7. callback 的 error first 慣例
8. 什麼是 event loop？它做了什麼？
9. 非同步常見的坑有哪些？

#### Intro
- Blocking:
    would wait the process done, and then run the followed process.
- Non-blocking: followed process could run and don't wait the last process.
    - callback function: After the non-blocking process ended, the process may call the callback function(if we set). Sometimes, they may pass the props.

- 同步(Synchronous):
    - 為了讓大家腳步一致，需要互相等待。程式執行會卡在那一行。
- 非同步(Asynchronous):
    - 大家腳步不一致沒關係。程式執行不會卡住，而程式執行結果可以透過call back function來接收。
- callback function: 當某事發生的時候，請利用這個function通知我。

Example: handleClick is a callback function.
```=javascript
const btn = document.querySelector('.btn_alert')
btn.addEventListener('click', handleClick)
  
function handleClick() {
  alert('click!')
}
```

#### QA
- How could we let the ended non-blocking mechanism's work to notify something?
    - use the ```callback function```


#### Related Reading
- [程式設計該同步還是非同步？](https://www.ithome.com.tw/node/74544)
    - 同步
        - 不同工作間的前進步伐要協同一致，但不同的工作執行的步調不同，為了彼此之間的協調，工作間就會必須等待其他工作完成。
    - 非同步
       - 設計的程式有一個自己的主要執行流程，他不會在任何時刻等待資料的到來，相反的，資料來是，程式會被以某種方式通知，以利於取得資料加以處理。

-[Inside look at modern web browser (part 1)](https://developers.google.com/web/updates/2018/09/inside-browser-part1)

- [所以說event loop到底是什麼玩意兒？| Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)



## Promise
A promise is a eturned object to which you attach callbacks, instead of passing callbacks in to a function.

Example:
```=javascript
//Declare a fake function
const  fakeRequestPromise=(url)=>{
    return new Promise( (resolve,reject) =>{
        const delay= Math.floor(Math.random()*(4500))+500;
        setTimeout( ()=>{
              if(delay >4000){
                  reject('Connection Timeout')
              }else{
                  resolve(`Here is your fake data from ${url}`)
              }      
        },delay)
    })
}

//Use the promise
const request = fakeRequestPromise('yelp.com/api/coffe');
request.then( ()=>{
    console.log("Promise resolved.")
    console.log("It WORKED!!!!")

    //Could also call in nested
    fakeRequestPromise('yelp.com/api/mango')
    .then(()=>{
            console.log("Promise resolved 2.")
            console.log("It WORKED!!!!")
            fakeRequestPromise('yelp.com/api/Apple')
            .then(()=>{
                console.log("IT WORKED")
            }).
            catch( ()=>{
                  console.log("Oh No, Error!!! Apple")  
            })

    }).catch( ()=>{
        console.log("OH NO, ERROR!!! mangoQQQ")
    })
}).catch( ()=>{
    console.log("Promise rejected.")
    console.log("OH NO!")
})

//We could rewrite above into this, they are the same
//this called promise chaining
fakeRequestPromise('yelp.com/api/coffe')
.then( ()=>{
    console.log("Promise resolved.")
    console.log("It WORKED!!!!")

    //Could also call in nested
    return fakeRequestPromise('yelp.com/api/mango')
})
.then( ()=>{
       console.log("Promise resolved 2.")
       console.log("It WORKED!!!!")
       return fakeRequestPromise('yelp.com/api/Apple')
})
.then((data)=>{   // Promise may return some data
    console.log("IT WORKED")
    console.log(data)
})
.catch( (err)=>{
    //Use one catch to process above's error
    console.log("Promise rejected.")
    console.log("OH NO A REQUEST FAILED!!!!")
    console.log(err)
})

```

### Creating Our Own Promises
Example1:
```=javascript
const fakeRequest=(url)=>{
    return new Promise( (resolve,reject) =>{
        const rand = Math.random();
        setTimeout(() =>{
            if(rand<0.7){
                resolve("YOUR FAKE DATA HERE");
            }
            reject('REQUEST ERROR!');
        },1000)
    })
}

fakeRequest('/dogs/1')
    .then( (data)=>{
           console.log("DONE WITH REQUEST!") 
           console.log("data is:",data) // Would print my promise's resolve content here.
    })
    .catch((err)=>{
        console.log("OH NO!",err)
    })
```

Example2: delay time to change the background color
```
const delayedColorChange = (color,delay)=>{
    return new Promise( (resolve,reject)=>{
        setTimeout( ()=>{
                document.body.style.backgroundColor = color;
                resolve(); 
        },delay)
    })
}

//We could use in this way and don't write in nested way
delayedColorChange('red',1000)
.then( ()=>{
    return delayedColorChange('orange',1000)
})
.then( ()=>{
    return delayedColorChange('blue',3000)
})
.then( ()=>{
    return delayedColorChange('green',1000)
})


//We could rewrite
delayedColorChange('red',1000)
.then( ()=>delayedColorChange('orange',1000))
.then( ()=>delayedColorChange('blue',3000))
.then( ()=>delayedColorChange('green',1000))
```

## Async Functions/Await 
The keyword
- Async
    - Async function always return a promise.
    - If the function returns a value, the promise will be resolved with that value
    - If the function throws an exception, the promise will be rejected

Example:
```
async function hello(){
    return 'Hey Guy!';
    throw "OH NO,PrOBLEM!"
}
hello();
// Promise {<resolved>:"Hey guy!"}
// The content above is printed at console, if you want to check the Promise object

//We could also process the data return from Promise
hello()
.then((data)=>{
    console.log("PROMISE RESOLVED WITH:", data)
})
.catch((err)=>{
    console.log("OH NO PROMISE REJECTED!")
    console.log(err)
})


async function uhOh(){
    //This is the way we reject from aync 
    throw new Error('oh no!');
}
uhOh();
//Promise {<rejected>:"Error:oh no!"}
```

Example:
```
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
```
- Await
    - We can only use the await keyword inside of functions declared with async.
    - await will pause the execution of the function, waiting for a promise to be resolved

Example
```=javascript
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

printRainbow()
```


Example:
```
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
```