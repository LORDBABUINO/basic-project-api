#!/bin/sh

/wait
yarn migrate
yarn test:e2e:debug
