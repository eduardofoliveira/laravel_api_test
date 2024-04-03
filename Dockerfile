FROM php:8.3-fpm-alpine

RUN apk add --no-cache openssl bash nodejs npm postgresql-dev

RUN docker-php-ext-install bcmath pdo pdo_pgsql

WORKDIR /var/www

RUN rm -rf /var/www/html

RUN ln -s public html 

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www

RUN chmod -R 777 /var/www/test-dev/storage

RUN cd /var/www/test-dev && composer install

RUN cd /var/www/test-dev && npm install

RUN cd /var/www/test-dev && npm run build

#RUN cd /var/www/test-dev && php artisan migrate

EXPOSE 9000

ENTRYPOINT [ "php-fpm" ]