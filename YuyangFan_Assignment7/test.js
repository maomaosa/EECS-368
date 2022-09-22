const {createServer} = require("http");  //using the package http
const methods = Object.create(null); //define the methods as object

createServer((request, response) => {
  let handler = methods[request.method] || notAllowed;
  handler(request)
    .catch(error => { //catch the error when the handler's request was rejected
      if (error.status != null) return error; // when the status != null, return error
      return {body: String(error), status: 500}; //return status code 500, string the error info
    })
    .then(({body, status = 200, type = "text/plain"}) => { //else when request was accpted, status = 200(ok)
       response.writeHead(status, {"Content-Type": type}); // write the head with content type and status number
       if (body && body.pipe) body.pipe(response); // if the value is a readable stream, read it with pipe
       else response.end(body); //else read it as as a string or buffer
    });
}).listen(8000);

async function notAllowed(request) { //when detect an invalid request
  return {
    status: 405, //return code 405
    body: `The method ${request.method} is not supported.` // return The method XXX is not supported.
  };
}

var {parse} = require("url"); // using the package url
var {resolve, sep} = require("path"); // using the package path

var baseDirectory = process.cwd(); //define the current working diresctory.

function urlPath(url) {
  let {pathname} = parse(url); // parse the url
  let path = resolve(decodeURIComponent(pathname).slice(1)); //get the path of the parsed url
  if (path != baseDirectory && //if this path is not start with the base directory
      !path.startsWith(baseDirectory + sep)) {
    throw {status: 403, body: "Forbidden"}; //throw status 403 and error Forbidden
  }
  return path; // else return the passed path
}

const {createReadStream} = require("fs"); // using the package fs
const {stat, readdir} = require("fs").promises; // using the package fs with promise
const mime = require("mime"); // using the package mime

methods.GET = async function(request) {
  let path = urlPath(request.url); //get the path
  let stats;
  try {
    stats = await stat(path); //asynchronous function stat analysis the path's file
  } catch (error) { 
    if (error.code != "ENOENT") throw error; //if it has error and file exist, throw error
    else return {status: 404, body: "File not found"}; //if file does not exist, it will throw "ENOENT" print status 404 and file not found.
  }
  if (stats.isDirectory()) { // if this path is a directory
    return {body: (await readdir(path)).join("\n")}; // asynchronous function readdir read the array of files in a directory
  } else {
    return {body: createReadStream(path), // if it is a file, read the contxt to the body
            type: mime.getType(path)}; //read the type of the file
  }
};

const {rmdir, unlink} = require("fs").promises; // using the package fs with promise

methods.DELETE = async function(request) {
  let path = urlPath(request.url); //get the path
  let stats;
  try {
    stats = await stat(path); //asynchronous function stat analysis the path's file
  } catch (error) {
    if (error.code != "ENOENT") throw error; //if it has error and file exist, throw error
    else return {status: 204}; // if file exist and has error return status 204
  }
  if (stats.isDirectory()) await rmdir(path); // if this path is a directory, remove this direcotory
  else await unlink(path); //else remove this file use unlink
  return {status: 204}; //return status 204
};

const {createWriteStream} = require("fs"); // using the package fs

function pipeStream(from, to) { // define two file with from and to
  return new Promise((resolve, reject) => { // set promise for return
    from.on("error", reject); // if from reject with on, show error
    to.on("error", reject); // if to reject with on, show error
    to.on("finish", resolve);// if to resolve, shows finish
    from.pipe(to); //move data from from to to
  });
}

methods.PUT = async function(request) {
  let path = urlPath(request.url); //get the path
  await pipeStream(request, createWriteStream(path)); // using pipe stream move data from request to the writable stream with path
  return {status: 204}; //return code 204
};

const {mkdir} = require("fs").promises; // using the package fs with promise

methods.MKCOL = async function(request) {
  let path = urlPath(request.url); //get the path
  let stats;
  try {
    stats = await stat(path); //asynchronous function stat analysis the path's file
  } catch (error) {
    if (error.code != "ENOENT") throw error; //if it has error and file exist, throw error
    await mkdir(path); //else using mkdir create new directory to the path
    return {status: 204}; // return status 204
  }
  if (stats.isDirectory()) return {status: 204}; // if it already is a directory, return status 204
  else return {status: 400, body: "Not a directory"}; // if it is not a direcory, return status 400, print  "Not a directory"
};