#!/bin/bash

docker build -t subasta-back ./SpringSubastAll
docker build -t subasta-frontend ./fronted_subastall

docker swarm init
docker stack deploy --compose-file docker-compose.yml subasta-stack

docker service scale subasta-stack_back=3

