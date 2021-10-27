# Express API

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux

Install [Docker Compose](http://docs.docker.com/compose/) on your system.

* Python/pip: `sudo pip install -U docker-compose`
* Other: ``curl -L https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose; chmod +x /usr/local/bin/docker-compose``

Install Make `sudo apt install make`
#You need to add env variables to .env file
You can use you own api key and in some cases you need to change API_URL'S
- `PORT=3000`
- `API_KEY=6BA3D957-9E12-4983-8EBA-B31F33BA1872`
- `API_REST_URL=https://rest-sandbox.coinapi.io/`
- `API_WS_URL=ws://ws-sandbox.coinapi.io/v1/`
- `DB_CONNECTION_URL=mongodb://mongo:27017/project`

## Setup and start
Run `make start`

#Other
- You can find DB UI here http://127.0.0.1:8888/db/project/
- You can find API here http://127.0.0.1:6868/
