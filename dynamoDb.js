const AWS = require('aws-sdk');
require('dotenv').config()
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = 'PE_APP'

const getData = async () => {
    const params = {
        TableName: TABLE_NAME,
    }
    const data = await dynamoClient.scan(params).promise()
    return data
}

const getItem = (ID) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            ID,
        }
    }

    return dynamoClient.get(params).promise().then((res) => {
        return res
    })
}

const saveData = async (data) => {
    const params = {
        TableName: TABLE_NAME,
        Item: data
    }

    return await dynamoClient.put(params).promise()
}

module.exports = {getItem, getData, saveData}