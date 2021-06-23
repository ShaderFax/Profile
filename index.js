import fs           from "fs";
import path         from "path";
import express      from "express";
import http         from "http";
import https        from "https";
import exphbs       from "express-handlebars";

import rootRouter   from "./routes/root.js";

const resourcePath = "./public";
const staticResources = express.static(resourcePath);

rootRouter.use(staticResources);

const localHost     = "127.0.0.1";
const server        = express();
const port          = 8080;
//const portSecure    = 433;
const options       = {
    //cert:   fs.readFileSync("./shaderfax_moe/shaderfax_moe.crt"), 
    //ca:     fs.readFileSync("./shaderfax_moe/shaderfax_moe.ca-bundle"), 
    //key:    fs.readFileSync("./shaderfax_moe/shaderfax_moe.key")
};

server.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
server.set("view engine", "hbs");

const httpServer        = http.createServer(server);
//const httpsServer       = https.createServer(options, server);

server.use((req, res, next) => {
    //if (req.protocol === 'http')
        //return res.redirect(301, `https://${req.headers.host}${req.url}`);
    next();
});

function notifyStartupHttp(err) {
    if(err)
        console.error("Server could not start because: ", err);
    else
        console.log("Server started succesfully at \"http://shaderfax.moe/\" on port: ", port);
}

/*function notifyStartupHttps(err) {
    if(err)
        console.error("Server could not start because: ", err);
    else
        console.log("Server started succesfully at \"http://shaderfax.moe/\" on port: ", portSecure);
}*/

server.use("/",         rootRouter);
// server.use("/posts",       postsRouter);
// server.use("/posts/pages", postsPagesRouter);
// server.use("/projects",    projectsRouter);

httpServer.listen(port, localHost, 511, notifyStartupHttp);
//httpsServer.listen(portSecure, localHost, 511, notifyStartupHttps);