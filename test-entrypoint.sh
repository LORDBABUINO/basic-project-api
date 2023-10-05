#!/bin/sh

/wait
yarn migrate
yarn integration --watchAll
