'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')
const upDateOpt =require("./../mysql")
const { compress } = require('compress-images/promise');
const rootInput = "/var/www/compress-images.com/node/originalfiles/"
const rootOutput = "/var/www/compress-images.com/node/optimalfile/"
var fs = require('fs');

module.exports = {
    opt: (req, res) => {
        let sql = 'SELECT * FROM product_images WHERE timeoptimal=0 limit 1';
        db.query(sql, function (err, result, fields) {
            var row = result[0];
            console.log(row.originalfile);
            const lenOriginalfile = row.originalfile.indexOf("?v=");
            var originalfile = row.originalfile;
            if (lenOriginalfile > 0)
                originalfile = row.originalfile.substring(0, lenOriginalfile);
            console.log(originalfile);
            try {
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
                        throw error
                    }
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
                        upDateOpt.updateOpt(originalfile, obj.size_in, obj.size_output, obj.percent, row.imageID,1);

                    }
                    
                    res.json(statistic); 
                });
            } else {
                upDateOpt.updateOpt(row.originalfile, 0, 0, "0%", row.imageID,9);
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
