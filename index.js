const express = require('express')
const PORT = process.env.PORT || 3500
const fileUpload = require('express-fileupload');
const cors = require('cors');
const md5 = require("md5");
const utils = require("./utils")
const dynamoDb = require("./dynamoDb")
const dayjs = require('dayjs');
const isEmpty = require('lodash.isempty');

const app = express()

// config
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());

// endpoint for uploaded files
app.post('/file-upload',
    async (req, res) =>  {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            // uploaded file
            let up_file = req.files.file;
            //get more accurate mimetype
            let real_mime = await utils.getMimeType(up_file.data).then((res) => {
                return res
            })
            let msg;
            let file_data;
            let data;

            // check if file is PE, if not, then ignore
            if (["application/vnd.microsoft.portable-executable", "application/x-dosexec", "application/x-msdownload", "application/x-msdos-program"].includes(real_mime)) {
                let id_ = utils.getShaSum(up_file.data)
                let today = dayjs();

                // get data object to save
                data = {
                    name: up_file.name,
                    size: up_file.size,
                    mimetype: real_mime,
                    md5: md5(up_file.data),
                    ID: id_,
                    last_date_added: today.format(),
                    is_pe: true,
                    encoding: up_file.encoding
                }

                // get data from the dynamodb table with the ID (sha256 sum) of file
                let p_data = await dynamoDb.getItem(id_)

                //update or save
                await dynamoDb.saveData(data)
                file_data = await dynamoDb.getItem(id_).then((res) => res["Item"])

                // check if there is already a file with the same ID and save if not
                if (!isEmpty(p_data)) {
                    msg = "File has already been received"
                } else {
                    msg = "File has been received"
                }
            } else {
                msg = "File is not Portable Executable (PE)"
            }

            //send response
            res.send({
                status: 200,
                message: msg,
                data: file_data
            });
        }
    }
);

app.listen(PORT, () => console.log('running on port: ' + PORT))
