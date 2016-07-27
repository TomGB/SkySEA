#!/bin/bash

pwd=$(pwd)

echo "Starting website..."
osascript -e "tell application \"Terminal\" to do script \"cd $pwd/server; clear; ./compile.sh \" " > /dev/null
echo ""
echo "Starting customer app..."
osascript -e "tell application \"Terminal\" to do script \"cd $pwd/IONIC; clear; ./compile.sh \" " > /dev/null

