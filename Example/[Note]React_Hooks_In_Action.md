
# [Note][Book] React Hooks in Action 

React version: 16

pdf: http://sd.blackball.lv/library/React_Hooks_in_Action_(2021).pdf
sample code of thi book: https://github.com/jrlarsen/react-hooks-in-action
- different branch for different task

![image](https://user-images.githubusercontent.com/9137836/121760804-323b2280-cb5f-11eb-81ab-fbee99ded015.png)

Why is the function component bettern than class component?
- less code
- more easi;y to test
- no need to call super() 
- no need to work with this and bind handlers
- simpler lifecycle model
- local statae in scoper for handlers,side effect functions and the returned UI

The comparison
![image](https://user-images.githubusercontent.com/9137836/121760938-dde47280-cb5f-11eb-8670-afa3d540dbd3.png)


Extract the code to reussable: custom hook

![image](https://user-images.githubusercontent.com/9137836/121761097-809cf100-cb60-11eb-950e-2a81272b1c0c.png)


![image](https://user-images.githubusercontent.com/9137836/121761149-c0fc6f00-cb60-11eb-9ed9-fa180ebb43d6.png)


Custom hooks example: https://usehooks.com


### Third party hooks
- React Router : for page navigation
- Redux: an application data store
- React Spring: for animation

Concurrent

## Managing component state with the useState with the useState hook


React-icons: https://github.com/react-icons/react-icons
React- router: https://github.com/ReactTraining/react-router

Example: 3.3.2 Using a checkbox to set a state


![image](https://user-images.githubusercontent.com/9137836/121763356-f065a880-cb6d-11eb-8ea3-b396a986265f.png)

![image](https://user-images.githubusercontent.com/9137836/121763365-05423c00-cb6e-11eb-8893-9bdb061abb43.png)

Note:
- When we use the update function to change the state. React will schedule a re-render if the value has changed.
- If we only want to update a subset of a object. we should copy over unchanged properties from the previous state when  your updater function is only
   updating a subset:
   ```
   setValue({
    ...state,
    property: newValue
   });
   ```
   
## Managing component state with the useReducer hook

Situation:
- When you find you always need to update multiple state values
- Your state update logic is so spread out that it's hard to follow.


Example:
A blog component to load posts with multiple state:
- the loading state: are you in the process of loading new posts?
- any errors: has an error been returned from the server or i the network down?
- the posts: a list of the posts retrieved

Call multiple updater function? setIsLoading / setError/setPosts ?
- React provides a cleaner alternative , the useReducer hook.

Keeping users with predictable state changes.


### 4.2 Managing more complicated state with useReducer
- A reducer helps you to manage state changes in a centralized, well-defined way with 
  clear actions that act on the state
- A reducer uses actions to generate a new state from the previous state, making it easier to specify more complicated updates.
- React provides the useReducer hook to let your component specify initial state, access the current state and dispatch actions to update the state and trigger a re-render.
- Dispatch well-defined actions makes it easier to follow state changes and to understand how your componet interacts with the state in reponse to differnet events.

Reducer
- a function that accepts a state value and an action value => generate the new state value 
  - The state and the action
    - could be simple, primitive values like numbers or strings or complicated objects. 
- Could keep all of the ways of updating the state in one place which makes it easier to manage state changes.
   
![image](https://user-images.githubusercontent.com/9137836/121764019-15104f00-cb73-11eb-9eac-8affa9b54d2e.png)


![image](https://user-images.githubusercontent.com/9137836/121764097-cd3df780-cb73-11eb-9efa-b17e617d2db5.png)

Example 4.4 A reducer for the BookablesList component
```
export default reducer(state, action){
  switch(action.type){
    case "SET_GROUP":
      return{
        ...state,           //Spread the properties of the old state object into the new one
        group: action.payload, //Override any properties that need updating
        bookableIndex:0
      };
    case "SET_BOOKABLE":
       return{
        ...state,
        bookableIndex: action.payload
      };
     case: "NEXT_BOOKABLE":
        return{
           ...state,
           bookableIndex: (state.bookableIndex+1)% count
        };
  
  }

}
```

        
### Accessing componet state and dispatching actions with useReducer
The  ```useState``` lets us ask React to manage single values for our component.
 ```useReducer``` hook : give React a bit morehelp in managing values by passing it a ```reducer``` and the component's initial state. The hook returns the current state and a function for dispatching actions, as two elements in an array.
 
 ![image](https://user-images.githubusercontent.com/9137836/121764557-64f11500-cb77-11eb-8560-dcdddf6596b7.png)


## Ch5: Working with side effects
- recognizing types of side effects in components
- wrapping side effects with useEffect hook
- controlling when an effect runs by specyfing a depency list 
- returning a clean up function from an effect 
- using an effect to fetch data for a component

React builds the tree of elements, compares it with what's already rendered and commits any necessary changes to the DOM.
When state changes, React goes through the process again to update the UI. 

Sometimes, we need our components to reach outside of this data flow process and directly interact with other APIs.
Common side effects include:
- Setting the page title imperatively
- Working withe timers
- Measuring the width or height 
- Logging messages to the console or other device
- Setting and Getting values in local storage
- Fetching data or subscribing and unscribing to services


https://codesandbox.io/s/windowsize-gn80v?file=/src/App.js:324-348

With a cleanup function
https://codesandbox.io/s/windowsizecleanup-b8wii






## Ch6: Managing componet state with the useRef hook

useRef
- its ```current``` property could store the value
   - But change the ```current``` property doesn't cause a re-render of the component.
- A call to useRef will return the same ref object each time the component runs,
   - Persist values in the ref across renders by assigning them to the ref's ```current``` property
- React can automatically assign  DOM element references to your ref's ```current``` property

Example:
```
const myRef = useRef(); //create the red
...
return(
   <button ref={myRef}> Click Me! </button>      // specify the red in the JSX ref attribute
);

myRef.current;          //The current property will now reference the button element
```


 Note:
- Use the ref to interactive with DOM element
   - Set th focus on the element
   ```
   myRef.current.focus();
   ```
- Component that read their state from the DOM are called uncontrolled components. We can use refs to access and update the state.
- React recommends you use controlled components.
   - Use the useState hook or the useReducer hook to manage the state and get React to update the DOM with the latest state value. 



## Ch7 : Managing application state

- passing shared state to those components that need it
- coping when state isn't passed down - the props are missing 
- lifting state up the component tree to make it more widely available
- passing dispatch and updater functions to child components
- calling dispatch and updater functions to update parent state
- considering dispatch and updater functions as despendencies of effects



![image](https://user-images.githubusercontent.com/9137836/121767433-c2429180-cb8a-11eb-8345-bbb098b26987.png)


A cool way to return DOM element
```
return bookable ?( 
   {hasDetails &&(
   <div>
   
   </div>
   )}
 ): null;
```
