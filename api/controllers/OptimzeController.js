'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')
const upDateOpt =require("./../mysql")
const { compress } = require('compress-images/promise');
const rootInput = process.env.ROOT_HOST+ "/node/originalfiles/"
const rootOutput = process.env.ROOT_HOST+ "/node/optimalfile/"
var fs = require('fs');

module.exports = {
    opt: (req, res) => {
        let sql = 'SELECT * FROM product_images WHERE timeoptimal=0 limit 1';
        db.query(sql, function (err, result, fields) {
            if (result.length === 0) {
                res.json("null");
            } else {
                var row = result[0];
                console.log(row.originalfile);
                const lenOriginalfile = row.originalfile.indexOf("?v=");
                var originalfile = row.originalfile;
                if (lenOriginalfile > 0)
                    originalfile = row.originalfile.substring(0, lenOriginalfile);
                const extension = originalfile.split('.').pop();
                if(extension == "webp"){
                    upDateOpt.updateOpt(row.originalfile, 0, 0, "0%", row.imageID,8);
                    res.json("");
                } else {
                    try {
                        console.log("proccessing check original file ")
                        if (fs.existsSync(rootOutput+originalfile)) {
                        fs.unlink(rootOutput+originalfile, function (err) {
                            if (err)  console.log(err);
                            // if no error, file has been deleted successfully
                            console.log('File deleted!');
                        });
                        }
                        } catch(err) {
                        console.error(err)
                    }
                    if (fs.existsSync(rootInput+originalfile)) {
                        console.log("compressing file ")
                        const processImages = async (onProgress) => {
                            const resultopt = await compress({
                                source: rootInput + originalfile,
                                destination: rootOutput,
                                onProgress,
                                enginesSetup: {
                                    jpg: { engine: 'mozjpeg', command: ['-quality', '60']},
                                    png: { engine: 'pngquant', command: ['--quality=20-50', '-o']},
                                }
                            });
                    
                            const { statistics, errors } = resultopt;
                            // statistics - all processed images list
                            // errors - all errros happened list
                        };
                    
                        processImages((error, statistic, completed) => {
                            if (error) {
                                console.log('Error happen while processing file');
                                console.log(error);
                                //throw error
                                upDateOpt.updateOpt(originalfile+"; "+"Error happen while processing file", 0, 0, 0, row.imageID,3);
                                res.json("error");
                            } else {
                                console.log('Sucefully processed file');
                                console.log(statistic);
                                if ( typeof statistic !== 'undefined' && statistic )
                                {
                                    const stringdata = JSON.stringify(statistic);
                                    const obj = JSON.parse(stringdata);
                                    console.log(obj.input);
                                    upDateOpt.updateOpt(originalfile, obj.size_in, obj.size_output, obj.percent, row.imageID,1);
                                    fs.unlink(rootInput+originalfile, function (err) {
                                        if (err)  console.log(err);
                                        // if no error, file has been deleted successfully
                                        console.log('File deleted!');
                                    });
            
                                }
                                res.json(statistic); 
                            }
                            
                        });
                    } else {
                        upDateOpt.updateOpt(row.originalfile, 0, 0, "0%", row.imageID,9);
                        res.json("");
                    }
                }
            }
            
        });
        
    },
    opttini: (req, res) => {
        let sql = 'SELECT * FROM product_images WHERE timeoptimal=3 limit 1';
        db.query(sql, function (err, result, fields) {
            if (result.length === 0) {
                res.json("null");
            } else {
                var row = result[0];
                console.log(row.originalfile);
                const lenOriginalfile = row.originalfile.indexOf("?v=");
                var originalfile = row.originalfile;
                if (lenOriginalfile > 0)
                    originalfile = row.originalfile.substring(0, lenOriginalfile);
                const extension = originalfile.split('.').pop();
                if(extension == "webp"){
                    upDateOpt.updateOpt(row.originalfile, 0, 0, "0%", row.imageID,8);
                    res.json("");
                } else {
                    try {
                        console.log("proccessing check original file ")
                        if (fs.existsSync(rootOutput+originalfile)) {
                        fs.unlink(rootOutput+originalfile, function (err) {
                            if (err)  console.log(err);
                            // if no error, file has been deleted successfully
                            console.log('File deleted!');
                        });
                        }
                        } catch(err) {
                        console.error(err)
                    }
                    if (fs.existsSync(rootInput+originalfile)) {
                        console.log("compressing file ")
                        const processImages = async (onProgress) => {
                            const resultopt = await compress({
                                source: rootInput + originalfile,
                                destination: rootOutput,
                                onProgress,
                                enginesSetup: {
                                    jpg: { engine: 'mozjpeg', command: ['-quality', '60']},
                                    png: { engine: 'tinify', key: "hjnnngRqg8x9nTmbKQMYBHz5nyxTlS0H", command: false}
                                    //png: {engine: 'optipng', command: false}
                                }
                            });
                    
                            const { statistics, errors } = resultopt;
                            // statistics - all processed images list
                            // errors - all errros happened list
                        };
                    
                        processImages((error, statistic, completed) => {
                            if (error) {
                                console.log('Error happen while processing file');
                                console.log(error);
                                //throw error
                                upDateOpt.updateOpt(originalfile+"; "+"Error happen while processing file", 0, 0, 0, row.imageID,3);
                                res.json("error");
                            } else {
                                console.log('Sucefully processed file');
                                console.log(statistic);
                                if ( typeof statistic !== 'undefined' && statistic )
                                {
                                    const stringdata = JSON.stringify(statistic);
                                    const obj = JSON.parse(stringdata);
                                    console.log(obj.input);
                                    upDateOpt.updateOpt(originalfile, obj.size_in, obj.size_output, obj.percent, row.imageID,1);
                                    fs.unlink(rootInput+originalfile, function (err) {
                                        if (err)  console.log(err);
                                        // if no error, file has been deleted successfully
                                        console.log('File deleted!');
                                    });
            
                                }
                                res.json(statistic); 
                            }
                            
                        });
                    } else {
                        upDateOpt.updateOpt(row.originalfile, 0, 0, "0%", row.imageID,9);
                        res.json("");
                    }
                }
            }
            
        });
        
    },
    opts: (req, res) => {

        let sql = 'SELECT * FROM product_images WHERE timeoptimal=0 limit 0, 24';
        //const [ rows , fields ] = await db.execute(sql);
        db.query(sql, function (err, result, fields) {
            // if any error while executing above query, throw error
            if (err) throw err;
            // if there is no error, you have the result
            // iterate for all the rows in result
            Object.keys(result).forEach(async function(key) {
                var row = result[key];
                try {
                  if (fs.existsSync(rootOutput+row.originalfile)) {
                    fs.unlink(rootOutput+row.originalfile, function (err) {
                        if (err)  console.log(err);
                        // if no error, file has been deleted successfully
                        console.log('File deleted!');
                    });
                  }
                } catch(err) {
                  console.error(err)
                }
                // nen anh
                //check anh ton truoc khi nen
                if (fs.existsSync(rootInput+row.originalfile)) {
                    const processImages = async (onProgress) => {
                        const result = await compress({
                            source: rootInput + row.originalfile,
                            destination: rootOutput,
                            onProgress,
                            enginesSetup: {
                                jpg: { engine: 'mozjpeg', command: ['-quality', '60']},
                                png: { engine: 'pngquant', command: ['--quality=20-50', '-o']},
                            }
                        });
                
                        const { statistics, errors } = result;
                        // statistics - all processed images list
                        // errors - all errros happened list
                    };
                
                    processImages((error, statistic, completed) => {
                        // if (error) {
                        //     console.log('Error happen while processing file');
                        //     console.log(error);
                        //     throw error
                        // }
                        console.log('Sucefully processed file');
                        console.log(statistic);
                        if ( typeof statistic !== 'undefined' && statistic )
                        {
                            const stringdata = JSON.stringify(statistic);
                            const obj = JSON.parse(stringdata);
                            console.log(obj.input);    
                            // var sqli = "UPDATE product_images SET optimalfile = '"+row.originalfile+"',timeoptimal=1, originalsize='"+obj.size_in+"', optimalsize='"+obj.size_output+"',percent='"+obj.percent+"' WHERE imageID = '"+row.imageID+"'";
                            // db.query(sqli, function (err, resulti) {
                            // // if (err) throw err;
                            //     console.log(resulti.affectedRows + " record(s) updated");
                            // });
                            upDateOpt.updateOpt(row.originalfile, obj.size_in, obj.size_output, obj.percent, row.imageID,1);
                        } else
                        {
                            ;
                        }
                        
                        //res.json(statistic); 
                    });
                } else {
                    var sqli = "UPDATE product_images SET timeoptimal=9 WHERE imageID = '"+row.imageID+"'";
                    await db.query(sqli, function (err, resulti) {
                    // if (err) throw err;
                        console.log(resulti.affectedRows + " record(s) updated");
                    });
                }
                //ket thuc nen anh 
              //console.log(row.apply);
            });
            res.json(result);
        });
        // db.query(sql, (err, response) => {
        //     if (err) throw err
        //     res.json(response)
        // })
        // let input = req.params.input;
        // const processImages = async (onProgress) => {
        //     const result = await compress({
        //         source: rootInput + input,
        //         destination: rootOutput,
        //         onProgress,
        //         enginesSetup: {
        //             jpg: { engine: 'mozjpeg', command: ['-quality', '60']},
        //             png: { engine: 'pngquant', command: ['--quality=20-50', '-o']},
        //         }
        //     });
    
        //     const { statistics, errors } = result;
        //     // statistics - all processed images list
        //     // errors - all errros happened list
        // };
    
        // processImages((error, statistic, completed) => {
        //     if (error) {
        //         console.log('Error happen while processing file');
        //         console.log(error);
        //         throw error
        //     }
        //     console.log('Sucefully processed file');
        //     console.log(statistic)
        //     res.json(statistic) 
        // });
    }
}
