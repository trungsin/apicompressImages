'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')
const compress = require('./compress')
const rootInput = "/var/www/compress-images.com/node/originalfiles/"
const rootOutput = "/var/www/compress-images.com/node/optimalfile/"

module.exports = {
    opt: async (req, res) => {
        let input = req.params.input;
        //res.json(compress.compress_image(rootInput + input,rootOutput));
        let result =  await compress.compress_image(rootInput + input,rootOutput);
        res.json(result.input);
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
    },
    opts: (req, res) => {

        let sql = 'SELECT * FROM product_images WHERE timeoptimal=0'
        //const [ rows , fields ] = await db.execute(sql);
        db.query(sql, function (err, result, fields) {
            // if any error while executing above query, throw error
            if (err) throw err;
            // if there is no error, you have the result
            // iterate for all the rows in result
            Object.keys(result).forEach(function(key) {
              var row = result[key];
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
