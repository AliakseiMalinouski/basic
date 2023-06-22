
let express = require('express');
let fs = require('fs');
let os = require('os');

let webServer = express();

webServer.use(express.urlencoded({extended: true}));
webServer.use(express.static('static')); 

const PORT = 3050;

if(__dirname + '/server-actions.txt') {
    fs.writeFile(__dirname+'/server-actions.txt', 'File-Content', 'utf-8', (error, data) => {
        console.log('file created')
    });
}

webServer.get('/', (req, res) => {
    fs.writeFileSync(__dirname+'/server-actions.txt', `Home Page started on ${PORT} at ${Date.now()} ${os.EOL}`)
    fs.readFile(__dirname + '/html/home.html', 'utf-8', (error, data) => {
        if(data) {
            res.send(data);
        }
    });
});

webServer.get('/contacts', (req, res) => {
    fs.writeFileSync(__dirname+'/server-actions.txt', `Contacts page started on ${PORT} ${os.EOL}` )
    res.send('<h1>Contacts</h1>');
})

webServer.get('/about/:par1', (req, res) => {
    fs.writeFileSync(__dirname+'/server-actions.txt', `About page started on ${PORT} ${os.EOL}` )
    res.send(req.params.par1);
});

webServer.get('/more', (req, res) => {
    fs.writeFileSync(__dirname+'/server-actions.txt', `More page started on ${PORT} ${os.EOL}` )
    res.send(req.query.par1)
});

webServer.get('/notfound', (req, res) => {
    res.status(401).send('Error with download');
});

webServer.get('/scripts/click.js', (req, res) => {
    fs.readFile(__dirname+'/html/click.html', 'utf-8', (error, data) => {
        if(data) {
            let html = data;
            res.send(html);
        }
    })
})


webServer.get('/click', (req, res) => {
    fs.readFile(__dirname+'/html/click.html', 'utf-8', (error, data) => {
        if(data) {
            let html = data;
            res.send(html);
        }
    })
});

webServer.get('/request', (req, res) => {
    fs.readFile(__dirname+'/html/form.html', 'utf-8', (error, data) => {
        if(data) {
            res.send(data);
        }
    })
})

webServer.post('/form', (req, res) => {
    // res.send("service6 ok, login="+req.body.login+" age="+req.body.pass);
    res.send(req.body.login + req.body.pass + '')
})

webServer.listen(PORT, () => {
    console.log('Port is running ' + PORT);
});
