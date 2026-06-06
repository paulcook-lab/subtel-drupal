# Dockerfile - SUBTEL Drupal 10 en Kubernetes
FROM drupal:10-apache

# Copiar el proyecto
COPY subtel-drupal/ /var/www/html/

# Copiar tema personalizado
COPY subtel-drupal/web/themes/custom/subtel_improved/ /var/www/html/web/themes/custom/subtel_improved/

# Permisos
RUN chown -R www-data:www-data /var/www/html

# Configurar permisos en sites
RUN chown -R www-data:www-data /var/www/html/web/sites

# Puerto
EXPOSE 80
