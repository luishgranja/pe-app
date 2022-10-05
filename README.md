# Assignment

We need to collect unique Portable Executable (PE) files from many clients and queue or save telemetry data for reporting.


# Usage

| Upload file |  |
|--|--|
| `POST`| https://pe-app.tech/file-upload/ |

Body
| Name|  Description|
|--|--|
| file  |file to be checked  |

Response
```json
{
    "status": 200,
    "message": "File has already been received",
    "data": {
        "size": 65024,
        "last_date_added": "2022-10-05T11:04:43+00:00",
        "mimetype": "application/x-dosexec",
        "encoding": "7bit",
        "is_pe": true,
        "ID": "eec41d6cc8120392ddc8c730",
        "name": "file.exe",
        "md5": "afe117684f38aa25d4d"
    }
}
```

## Installation
For local testing and development

Requires Node v17.9.1

 - Install dependencies

    ```$ npm i```
    
   
 - Start project

   ```$ npm start```
    
    Go to localhost:3500
    
## Info

Deployed using AWS
