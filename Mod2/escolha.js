import { createServer } from 'http';
import { parse } from 'url';
import { readFile } from 'fs';

createServer(
    function (req, res) {
        let q = parse(req.url, true);
        let filename = "./Mod2/" + q.pathname; // C:\Users\Descomplica\Desktop\ProgramacaoII\Mod2\inverno.html
        console.log(q);
        console.log(filename);

        readFile(filename, function(err, data) {
            console.log(err);
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 NOT FOUND");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
).listen(8080);