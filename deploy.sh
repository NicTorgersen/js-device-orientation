#! /usr/bin/env bash
set -x

WORKING_DIRECTORY=$PWD
SCRIPT_PATH=$(readlink -f -- ${BASH_SOURCE[0]})
SCRIPT_DIRECTORY=$(dirname "${SCRIPT_PATH}")

cd $SCRIPT_DIRECTORY

bun run build

cd $WORKING_DIRECTORY

SPLUNK_HOST=nichlas.no \
SPLUNK_DOMAIN=playground.nichlas.no \
SPLUNK_USER=nic \
SPLUNK_PROJECT_NAME=web-geolocation-api \
splunk up
