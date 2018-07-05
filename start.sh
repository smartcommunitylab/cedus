#!/bin/bash

# mvn clean install -Dmaven.test.skip=true
java -jar cedus-engine/target/cedus.jar

echo "http://localhost:6050/cedus/web/student"
