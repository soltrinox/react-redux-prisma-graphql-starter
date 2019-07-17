#!/bin/bash

# this will find all node_modules above your path and will remove them

find . | grep /node_modules$ | grep -v /node_modules/ | xargs rm -fR