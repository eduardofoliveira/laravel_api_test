# Como executar o projeto
Execute os comando:

-- Contruir o container docker
```
docker-compose up -d --build
```

-- Quando todos os container estiverem executando roda as migrations para criar as tabelas no banco de dados
```
docker exec -it -w /var/www/test-dev laravel-web php artisan migrate
```

-- Ao final execute os testes
```
docker exec -it -w /var/www/test-dev laravel-web php artisan test
```

-- Para acessar o projeto e testar pela web
```
http://localhost:8000
```