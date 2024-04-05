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
                const  timeoutid= setTimeout(function() {
                        main.removeChild(toast)
                    }, duration + 1000);

                    //setTimeout( chức năng, thời gian thực hiện)

                toast.onclick = function (){
                    // console.log(e).targer;
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

                const icon= icons[type];
                const delay = (duration / 1000).toFixed(2);

            \
                toast.classList.add('toast', 'toast--' + type);

                toast.style.animation = 'move_ ease .3s, eraser linear 1s ' + delay + 's forwards';

                toast.innerHTML = 
    '<div class="toast__icon">' +
        '<i class="' + icon + '"></i>' +
    '</div>' +
    '<div class="toast__body">' +
        '<h3 class="toast__title">' + type + '</h3>' +
        '<p class="toast__msg">' + message + '</p>' +
    '</div>' +
    '<div class="toast__close">' +
        '<i class="fa-solid fa-x"></i>' +
    '</div>';

        main.appendChild(toast);
        }   
        }

        let clicksuccess = 0;
        let clickerror = 0;

        function showsuccess(){
            const errorbutton = document.querySelector('.bt--success');
            if(!errorbutton.classList.contains('.bt--disable') && clicksuccess < 5){
                clicksuccess++;
                toast({
                 title: 'success',
                 message: 'máy tính có kết nối internet',
                  type: 'success',
                    duration: 2000
                })
                if(clicksuccess==5){
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
