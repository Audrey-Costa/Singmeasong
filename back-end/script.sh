#!/bin/bash

case "$1" in 
    test)
        dotenv -e .env.test prisma migrate dev
        dotenv -e .env.test jest  -- -i --coverage
    ;;
    start)
        ts-node src/server.ts
    ;;
    dev)
        nodemon src/server.ts
    ;;
    *)
        echo "Usage: {test|start}"
        exit 1
    ;;
esac