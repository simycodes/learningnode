const http = require('http')

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end('Hello! Welcome to the Home Page');
    }
    if(req.url === '/about') {
        //BLOCKING CODE - ITS DELAY DEMONSTRATION
        //REQUEST ON ABOUT PAGE ,WILL DELAY OTHER REQUESTS ON ABOUT,HOME PAGES,
        //EVEN ENTIRE SITE PAGES,ONLY AFTER ABOUT PAGE IS FINISHED WILL OTHERS PAGES LOAD,
        //THESE ARE THE UNWANTED EFFECTS OF BLOCKING CODE,HENCE IDEAL TO SET CODE ASYNCHRONOUSLY
        //USING ASYNCH METHODS,FETCH METHODS,SETINTERVAL,TIMEOUT
        for(let i = 0; i < 1000; i++){
            for(let j = 0; j < 1000; j++){
                console.log(`${i} ${j}`);
            }
        }

        res.end('Welcome to the About Page');
    }

    res.end('Error Page')
})

server.listen(5000,() => {
    console.log('Server listening on port 5000...')
});