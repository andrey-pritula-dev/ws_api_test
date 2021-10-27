docker_compose_bin= $(shell command -v docker-compose 2> /dev/null)
user=1000

##Actions --------------------------------------------------
up: ## Start all containers (in background)
	$(docker_compose_bin) -f docker-compose.yml up
down: ## Stop
	$(docker_compose_bin) -f docker-compose.yml down
install: ## Install deps
	$(docker_compose_bin) -f docker-compose.yml run --rm --user="$(user)" "app" npm install
start: install up

