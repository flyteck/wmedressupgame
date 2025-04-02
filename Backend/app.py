from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

# initialises flask app
app = Flask(__name__)

# MySQL Configuration for SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://your_username:your_password@localhost/wmedressupgame'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define models (User, Equid, Item, etc.)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

