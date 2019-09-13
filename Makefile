setup:
	@docker-compose build
	@docker-compose up -d

build_db:
	@docker-compose exec web ./node_modules/.bin/sequelize db:create
	@docker-compose exec web ./node_modules/.bin/sequelize db:migrate
	@docker-compose exec web ./node_modules/.bin/sequelize db:create --env test
	@docker-compose exec web ./node_modules/.bin/sequelize db:migrate --env test

bash:
	@docker-compose exec web bash
