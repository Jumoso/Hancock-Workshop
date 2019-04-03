.PHONY: all init-submodules build-dev dev db-shell-dev db-shell-pre db-shell-pro db-shell-qa db-init-broker-dev db-init-adapter-dev db-init-wallet-dev db-init-signer-dev db-init-dev down-dev console-dev clean-dev

YML_DEV=./docker-compose.yml
YML_SUBMODULE=/environment/dev/docker-compose.yml
COMPOSE_DEV=docker-compose \
	--project-directory . \
	-f ${YML_DEV}

all: init-submodules | db-init-dev dev

init-submodules:
	git submodule update --init

build-dev:
	${COMPOSE_DEV} build

update-dev:
	git pull && git submodule update --recursive

dev: build-dev | down-dev
	${COMPOSE_DEV} up

top-dev:
	${COMPOSE_DEV} top

logs-dev:
	${COMPOSE_DEV} logs -f ${LOG}

down-dev:
	${COMPOSE_DEV} down

clean-dev:
	${COMPOSE_DEV} rm -f -s -v && docker volume rm \
	kst-hancock-docker-compose_hancock_dlt_mongodb_data

# ------------- DATABASE -------------

db-shell-local: build-dev
	${COMPOSE_DEV} run --rm mongo-shell

db-init-adapter-dev: build-dev
	${COMPOSE_DEV} run --rm --service-ports mongo-shell /scripts/adapter/init_db.js

db-init-broker-dev: build-dev
	${COMPOSE_DEV} run --rm --service-ports mongo-shell /scripts/broker/init_db.js

db-init-wallet-dev: build-dev
	${COMPOSE_DEV} run --rm --service-ports mongo-shell /scripts/wallet/init_db.js

# db-init-dev: db-init-wallet-dev db-init-adapter-dev
db-init-dev: 
	${COMPOSE_DEV} run --rm --service-ports mongo-shell /scripts/common/init_db.js
