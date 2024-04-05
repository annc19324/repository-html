const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BEM</title>
    <link rel="stylesheet" href="BEM.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        
        body {
            height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: #f4f4f5;
            font-family: 'Times New Roman';
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        body > div {
            margin: auto;  
        }

        #toast {
            position: fixed;
            top: 32px;
            right: 32px;
            z-index: 999999;
        }

        .toast {
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #fff;
            border-radius: 5px;
            border-left: 5px solid;
            padding: 20px 0;
            min-width: 400px;
            max-width: 450px;
            box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
            transition: all linear 0.3s;
        }

        @keyframes move_ {
            from {
                opacity: 0;
                transform: translateX(calc(100%));
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes eraser {
            to {
                opacity: 0;
            }
        }

        .toast--success {
            border-color:  green;
        }

        .toast--success .toast__icon {
            color: green;
        }

        .toast--info {
            border-color: blue;
        }

        .toast--info .toast__icon {
            color: blue;
        }

        .toast--warning {
            border-color: orange;
        }

        .toast--warning .toast__icon {
            color: orange;
        }

        .toast--error {
            border-color: red;
        }

        .toast--error .toast__icon {
            color: red;
        }

        .toast + .toast {
            margin-top: 24px;
        }

        .toast__icon,
        .toast__close {
            padding: 0 16px;
        }

        .toast__body {
            flex-grow: 1;
        }

        .toast__title {
            font-weight: 600;
            font-size: 16px;
            color: #333;
        }

        .toast__msg {
            font-size: 20px;
            color: #888;
            margin-top: 6px;
            line-height: 1.5;
        }

        .toast__close {
            font-size: 20px;
            color: rgba(0, 0, 0, 0.3);
            cursor: pointer;
        }

        .toast__close:hover {
            opacity: 0.5;
        }

        .bt-box {
            position: fixed;
            left: 50%;
            bottom: 100px;
            display: flex;
            transform: translateX(-50%);
        }

        .bt {
            display: inline-block;
            text-decoration: none;
            background-color: transparent;
            border: none;
            outline: none;
            color: #fff;
            padding: 12px 48px;
            border-radius: 50px;
            cursor: pointer;
            min-width: 300px;
            transition: opacity 0.2s ease;
        }

        .bt:hover {
            opacity: 0.8;
        }

        .bt + .bt {
            margin-left: 15px;
        }

        .bt--success {
            background-color: green;
            color: #fff;
        }

        .bt--error {
            background-color: red;
            color: #fff;
        }

        .bt--disable {
            opacity: 0.5 !important;
            cursor: pointer;
        }

        @media only screen and (max-width: 600px) {
            .bt {
                min-width: 30%;
            }
            .toast {
                min-width: 200px;
            }
        }
    </style>
</head>

<body>
    <div id="toast"></div>

    <div class="bt-box">
        <button onclick="showsuccess();" class="bt bt--success">Show successful toast</button>
        <button onclick="showerror();" class="bt bt--error">Show error toast </button>
    </div>

    <script>
        function toast({ title = '', message = '', type = 'info', duration = 3000 }){
            const main = document.getElementById('toast');           
            if ( main ) {
                const toast = document.createElement('div');
                const timeoutid = setTimeout(function() {
                    main.removeChild(toast);
                }, duration + 1000);

                toast.onclick = function (){
                    if(event.target.closest('.toast__close')){
                        main.removeChild(toast);
                        clearTimeout(timeoutid);
                    }
                }
                
                const icons={
                    success: "fas fa-check-circle",
                    info: "fas fa-info-circle",
                    warning:"fas fa-exclamation-circle",
                    error: "fas fa-exclamation-circle"
                };

                const icon = icons[type];
                const delay = (duration / 1000).toFixed(2);
                toast.classList.add('toast', 'toast--' + type);
                toast.style.animation = 'move_ ease .3s, eraser linear 1s ' + delay + 's forwards';

                toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${type}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fa-solid fa-x"></i>
                    </div>`;
                main.appendChild(toast);
            }   
        }

        let clicksuccess = 0;
        let clickerror = 0;

        function showsuccess(){
            const errorbutton = document.querySelector('.bt--success');
            if(!errorbutton.classList.contains('bt--disable') && clicksuccess < 5){
                clicksuccess++;
                toast({
                    title: 'success',
                    message: 'máy tính có kết nối internet',
                    type: 'success',
                    duration: 2000
                })
                if(clicksuccess == 5){
                    errorbutton.classList.add('bt--disable');
                }
            };
        }

        function showerror(){
            const errorbutton = document.querySelector('.bt--error');
            if(!errorbutton.classList.contains('bt--disable') && clickerror < 5){
                clickerror++;
                toast({
                    title: 'error',
                    message: 'máy tính không có kết nối internet',
                    type: 'error',
                    duration: 2000
                });
                if(clickerror == 5){
                    errorbutton.classList.add('bt--disable');
                }
            }
        }
    </script>
</body>

</html>
`;
