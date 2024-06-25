# Makefile

# Define your environment variables
export SKIP_ENV_VALIDATION=true

# Default target to start Docker Compose
.PHONY: up
up:
	@echo "Starting Docker Compose with SKIP_ENV_VALIDATION=${SKIP_ENV_VALIDATION}"
	SKIP_ENV_VALIDATION=${SKIP_ENV_VALIDATION} docker compose up -d

# Default target to watch Docker Compose
.PHONY: watch
watch:
	@echo "Watching Docker Compose with SKIP_ENV_VALIDATION=${SKIP_ENV_VALIDATION}"
	SKIP_ENV_VALIDATION=${SKIP_ENV_VALIDATION} docker compose watch

# Target to stop Docker Compose
.PHONY: down
down:
	@echo "Stopping Docker Compose"
	docker compose down

# Target to restart Docker Compose
.PHONY: restart
restart: down up

# Target to build Docker Compose services
.PHONY: build
build:
	@echo "Building Docker Compose services"
	docker compose build

# Target to view Docker Compose logs
.PHONY: logs
logs:
	@echo "Viewing Docker Compose logs"
	docker compose logs
