FROM mongo:7.0

# Set environment variables if necessary (you can set version, password, etc.)

#ENV MONGO_INITDB_ROOT_USERNAME=root
#ENV MONGO_INITDB_ROOT_PASSWORD=password

# Optionally copy a custom configuration file or scripts
# COPY ./mongod.conf /etc/mongod.conf
# COPY ./initdb/ /docker-entrypoint-initdb.d/

# Expose the default MongoDB port
EXPOSE 27017

# The CMD directive is inherited from the official MongoDB image, which starts `mongod`