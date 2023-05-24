# This makefile is created to simplify deployment to dev server
# Run `make deploy` to pull latest changes, prepare build and restart services
up:
	docker-compose up --build -d
down:
	docker-compose down --remove-orphans
