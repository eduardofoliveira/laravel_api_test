# Como executar o projeto
Execute os comando:

-- Contruir o container docker
```
docker-compose up -d --build
```

-- Quando todos os container estiverem executando roda as migrations para criar as tabelas no banco de dados
```
docker exec -it -w /var/www/test-dev 4eb6f2561527 php artisan migrate
```

-- Ao final execute os testes
```
docker exec -it -w /var/www/test-dev 4eb6f2561527 php artisan test
```

-- Para acessar o projeto e testar pela web
```
http://localhost:8000
```

# Install Composer

-- Instalar o composer
```
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
```

-- descosiderar
```
/root/.composer/vendor/laravel/installer/bin/laravel
```

-- Contruir o container docker
```
docker-compose up -d --build
```

-- Executar as migrations
```
php artisa migrate
```

-- Executar as seeds
```
php artisan db:seed
```