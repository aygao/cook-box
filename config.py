import os

class Development(object):
    debug = True
    testing = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')


app_config = {
    'development': Development
}