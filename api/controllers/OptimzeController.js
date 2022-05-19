'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')
const { compress } = require('compress-images/promise');
const rootInput = "/var/www/compress-images.com/node/originalfiles/"
const rootOutput = "/var/www/compress-images.com/node/optimalfile/"

module.exports = {
    opt: (req, res) => {
        let input = req.params.input;
        const processImages = async (onProgress) => {
            const result = await compress({
                source: rootInput + input,
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
            }
            
            res.json(statistic); 
        });
    },
    opts: (req, res) => {

        let sql = 'SELECT * FROM product_images WHERE timeoptimal=0 limit 1 , 10';
        //const [ rows , fields ] = await db.execute(sql);
        db.query(sql, function (err, result, fields) {
            // if any error while executing above query, throw error
            if (err) throw err;
            // if there is no error, you have the result
            // iterate for all the rows in result
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                // nen anh
                // const processImages = async (onProgress) => {
                //     const result = await compress({
                //         source: rootInput + row.originalfile,
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
                //     console.log(statistic);
                //     if ( typeof statistic !== 'undefined' && statistic )
                //     {
                //         const stringdata = JSON.stringify(statistic);
                //         const obj = JSON.parse(stringdata);
                //         console.log(obj.input);    
                //         var sql = "UPDATE product_images SET optimalfile = '"+row.originalfile+"',timeoptimal=1, originalsize='"+obj.size_in+"', optimalsize='"+obj.size_output+"',percent='"+obj.percent+"' WHERE imageID = '"+row.imageID+"'";
                //         con.query(sql, function (err, result) {
                //             if (err) throw err;
                //             console.log(result.affectedRows + " record(s) updated");
                //         });
                //     } else
                //     {
                //         continue;
                //     }
                    
                //     //res.json(statistic); 
                // });
                //ket thuc nen anh
              console.log(row.apply);
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
