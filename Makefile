.PHONY: all build up down restart logs clean re

all: up

build:
	docker compose build

up:
	docker compose up -d --build

dev: 
	cd frontend && npm run dev

down:
	docker compose down


logs:
	docker compose logs -f

clean:
	docker compose down -v --remove-orphans

fclean:
	docker compose down --rmi all --volumes --remove-orphans

restart:
	docker compose down
	docker compose up -d --build

re: fclean up