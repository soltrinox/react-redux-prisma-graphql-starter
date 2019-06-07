#!/bin/bash

curl \
  http://0.0.0.0:13987/send \
  -v \
  -X POST \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "templateId": "test",
  "strategies": "sendgrid",
  "data": {
    "from": "strigoaica@gmail.com",
    "to": "9pitops@gmail.com",
    "payload": {
      "answer": 42
    }
  }
}
EOF