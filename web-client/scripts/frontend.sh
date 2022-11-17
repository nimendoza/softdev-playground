#!/bin/sh

if ! which next > /dev/null ; then
    npm install
fi

npm run frontend