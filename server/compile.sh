#!/bin/bash

# Compilation script for server (website) directory
 
# --BEFORE USING THIS SCRIPT--
# 1) Run "chmod +x compile.sh" in your terminal
# 2) Ensure the username and password credentials match your mysql credentials
# 3) Ensure that the PATH variable is pointing to your mysql install

# --RUN THE SCRIPT--
# Running "./compile.sh" in the terminal will:
# - install components
# - update the database schema
# - add dummy data to the database
# - build the project
# - run the server

export PATH=$PATH:/usr/local/mysql/bin/

echo ""
echo "Directory:"
pwd
echo ""

echo "============================================================================="
echo "                               NPM INSTALL"
echo "============================================================================="

echo ""
npm install
echo ""

echo "----------------------------"
echo "                   complete."
echo ""

echo "============================================================================="
echo "                               BOWER INSTALL"
echo "============================================================================="

echo ""
bower install
echo ""

echo "----------------------------"
echo "                   complete."
echo ""

echo "============================================================================="
echo "                                DROP TABLES"
echo "============================================================================="

echo ""
eval "mysql --host='localhost' --user='root' --password='' -e 'DROP DATABASE seandb;'"
eval "mysql --host='localhost' --user='root' --password='' -e 'CREATE DATABASE seandb'"
echo ""

echo "----------------------------"
echo "                   complete."
echo ""

cd db
echo "============================================================================="

echo ""
echo "Directory:"
pwd
echo ""

echo "============================================================================="
echo "                                 SEQUELIZE"
echo "============================================================================="

echo ""
sequelize db:migrate
echo ""
cd ..

echo "----------------------------"
echo "                   complete."
echo ""

echo "============================================================================="

echo ""
echo "Directory:"
pwd
echo ""

echo "============================================================================="
echo "                             INSERT DEMO DATA"
echo "============================================================================="

echo ""
eval "mysql --host='localhost' --user='root' --password='' -D seandb -e 'USE seandb; DELETE FROM products; Source ./db/casesPopulate.sql;'"
echo ""

echo "----------------------------"
echo "                   complete."
echo ""

echo "============================================================================="
echo "                                  GRUNT"
echo "============================================================================="

echo ""
killall grunt

echo ""
grunt
echo ""

echo "----------------------------"
echo "                   complete."
echo ""

echo ""
echo "Starting Grunt Watch..."
echo ""

pwd=$(pwd)
osascript -e "tell application \"Terminal\" to do script \"cd $pwd; clear; grunt watch \" " > /dev/null
echo ""

echo "----------------------------"
echo "                   complete."
echo ""

echo "============================================================================="
echo "                            START NODE SERVER"
echo "============================================================================="

echo ""
killall node

echo ""
echo "Killing existing node servers..."
echo ""

echo "Opening website..."
echo ""

open /Applications/Google\ Chrome.app http://localhost:3000/

echo ""

node app.js
