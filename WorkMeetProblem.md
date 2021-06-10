
- Reload the fastapi with the command ```uvicorn serve:app --reload``` meet ERROR 
  ```
  ERROR:    [Errno 48] Address already in use
  ```
  - How to solve?
    kill the process listened TCP connections on port 8000
    ```
    sudo lsof -t -i tcp:8000 | xargs kill -9
    ```
  
  Ref:
  Address already in use - FastAPI
  https://stackoverflow.com/questions/64588486/address-already-in-use-fastapi
