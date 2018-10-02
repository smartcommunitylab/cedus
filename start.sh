#!/bin/bash

cd cedus-engine

mvn clean install -Dmaven.test.skip=true

java -jar target/cedus.jar

echo "http://localhost:6050/cedus/web/student"
