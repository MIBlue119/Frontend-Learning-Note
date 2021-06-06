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