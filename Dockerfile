FROM node:16.13.2

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    vim \
    zip \
    unzip

# # Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Create system user to run node commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user
RUN chown -R $user:$user /home/$user
RUN chmod -R 755 /home/$user

# Set working directory
WORKDIR /var/www

USER $user