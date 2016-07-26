#!/bin/bash

# Compilation script for server (website) directory
 
# --BEFORE USING THIS SCRIPT--
# 1) Run "chmod +x compile.sh" in your terminal

# --RUN THE SCRIPT--
# Running "./compile.sh" in the terminal will:
# - install components
# - build the project
# - run the server

echo "============================================================================="
echo "                               NPM INSTALL"
echo "============================================================================="

sudo npm install -g gulp
npm install
echo ""

echo "----------------------------"
echo "                   complete."
echo ""

echo "============================================================================="
echo "                               BOWER INSTALL"
echo "============================================================================="

bower install
echo ""

echo "----------------------------"
echo "                   complete."
echo ""

echo "============================================================================="
echo "                                   GULP"
echo "============================================================================="

gulp
echo ""

echo "----------------------------"
echo "                   complete."
echo ""

echo "============================================================================="
echo "                            START NODE SERVER"
echo "============================================================================="

killall ionic

echo ""
echo "Shutting down existing node servers..."
echo ""

sleep 2 && open /Applications/Google\ Chrome.app http://localhost:8100/ & ionic serve -lab
