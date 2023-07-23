#!/bin/bash

# Navigate to the build directory
cd build

# Create a .htaccess file with rewrite rules for React Router
cat <<EOT >> .htaccess
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
EOT

# Deploy the build folder to Hostinger (update with your Hostinger SSH details)
scp -r ./* ssh -p 65002 u973484608@82.180.175.77:/public_html/hawar-app
