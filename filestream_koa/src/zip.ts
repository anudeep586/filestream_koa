


const archiver = require('archiver');
var fs = require("fs");
const { pipeline, Transform } = require("stream")
const { join } = require("path")

export async function zip() {
  const readFile = fs.createReadStream("/home/raramuri/Desktop/filestream_koa/index.txt", "utf8")
  const writeFile = fs.createWriteStream(join("/home/raramuri/Desktop/filestream_koa/filezip", "words-filtered.txt"), "utf8")
  const transformFile = new Transform({
    transform(chunk: any, enc: any, next: any) {
      let c = chunk.toString().replace(/R|f/g, "  ")
      this.push(c)
      next()
    },
  })

  pipeline(readFile, transformFile, writeFile, (err: any) => {
    if (err) {
      console.log(err.message)
    }
  })
  
  console.log("start", process.pid);
  var date1 = new Date();
  const output = fs.createWriteStream("/home/raramuri/Desktop/filestream_koa/" + "create.zip");
  const archive = await archiver("zip", { zlib: { level: 9 } });
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
      );
    });
    output.on("end", function () {
      console.log("Data has been drained");
    });
    archive.on("warning", function (err: any) {
      if (err.code === "ENOENT") {
      }
      else {
        throw err;
      }
    });
    archive.on("error", function (err: any) {
      throw err;
    });
    await archive.pipe(output);
    const file1 = "/home/raramuri/Desktop/filestream_koa/" + "index.txt";
    await archive.append(fs.createReadStream(file1), { name: "index.txt" });
    await archive.finalize();
    var date2 = new Date();
    const diff = date2.getTime() - date1.getTime();
    console.log(diff + " ms");
    return diff;
   
  }
  process.on("message", async (message: any) => {
    const result = await zip();
    process.send?.(result)
    process.exit(1)
  })




















// import { exec } from "child_process";
// const fs = require('fs');
// const archiver = require('archiver')

// const location = "/home/raramuri/Desktop/";

// async function zip() {
//   console.log("start");
//   var date1 = new Date();
//   const output = fs.createWriteStream(location + "created.zip");
//   const archive = await archiver("zip", { zlib: { level: 9 } });
//   output.on("close", function () {
//     console.log(archive.pointer() + " total bytes");
//     console.log(
//       "archiver has been finalized and the output file descriptor has closed."
//     );
//   });
//   output.on("end", function () {
//     console.log("Data has been drained");
//   });
//   archive.on("warning", function (err: any) {
//     if (err.code === "ENOENT") {
//     } else {
//       throw err;
//     }
//   });
//   archive.on("error", function (err: any) {
//     throw err;
//   });
//   await archive.pipe(output);
//   const file1 = location + "file.txt";
//   await archive.append(fs.createReadStream(file1), { name: "file.txt" });
//   await archive.finalize();
//   exec(`rm ${location}created.zip`);
//   var date2 = new Date();
//   const diff = date2.getTime() - date1.getTime();
//   console.log(diff / 1000 + " seconds");
//   return diff / 1000;
// }

// process.on("message", async (message) => {
//   if (message === "zip") {
//     const timeTaken: any = await zip();
//     process.send?.(timeTaken / 1000);
//   }
// });






















































// const archiver = require('archiver');
// var fs = require("fs");
// const { pipeline, Transform } = require("stream")
// const { join } = require("path")

// export async function zip() {
//   const readFile = fs.createReadStream("/home/raramuri/Desktop/filestream_koa/index.txt", "utf8")
//   const writeFile = fs.createWriteStream(join("/home/raramuri/Desktop/filestream_koa/filezip", "words-filtered.txt"), "utf8")
//   const transformFile = new Transform({
//     transform(chunk: any, enc: any, next: any) {
//       let c = chunk.toString().replace(/R/g, "  ")
//       this.push(c)
//       next()
//     },
//   })

//   pipeline(readFile, transformFile, writeFile, (err: any) => {
//     if (err) {
//       console.log(err.message)
//     }
//   })
  
//   console.log("start", process.pid);
//   var date1 = new Date();
//   const output = fs.createWriteStream("/home/raramuri/Desktop/filestream_koa/" + "create.zip");
//   const archive = await archiver("zip", { zlib: { level: 9 } });
//   output.on("close", function () {
//     console.log(archive.pointer() + " total bytes");
//     console.log(
//       "archiver has been finalized and the output file descriptor has closed."
//       );
//     });
//     output.on("end", function () {
//       console.log("Data has been drained");
//     });
//     archive.on("warning", function (err: any) {
//       if (err.code === "ENOENT") {
//       }
//       else {
//         throw err;
//       }
//     });
//     archive.on("error", function (err: any) {
//       throw err;
//     });
//     await archive.pipe(output);
//     const file1 = "/home/raramuri/Desktop/filestream_koa/" + "index.txt";
//     await archive.append(fs.createReadStream(file1), { name: "index.txt" });
//     await archive.finalize();
//     var date2 = new Date();
//     const diff = date2.getTime() - date1.getTime();
//     console.log(diff + " ms");
//     return diff;
   
//   }
//   process.on("message", async (message: any) => {
//     const result = await zip();
//     process.send?.(result)
//     process.exit(1)
//   })