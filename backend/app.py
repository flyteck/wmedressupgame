# imports
from flask import Flask, render_template, request, redirect, url_for, flash
# database import
from flask_sqlalchemy import SQLAlchemy
# imports for password hashing (data security)
from werkzeug.security import generate_password_hash, check_password_hash
# flask login imports
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
# import classes from models.py
from models import User, db

# initialise flask app
app = Flask(__name__)

# secreyt key for session mgmt todo: replace with random string later for security
app.config['SECRET_KEY'] = 'dev_key_change_this'

# SQLite Configuration for SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/kittysimmons/Documents/Studio/Programming/Web Dev/wmedressupgame/backend/instance/wmedressupgame.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# import instantiated database
db.init_app(app)
with app.app_context():
    db.create_all()


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# create function to handle user registrations
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        discord = request.form['discord']

        # prevents register for duplicate user and error msg
        if User.query.filter_by(username=username).first():
            flash('username already exists')
            return redirect(url_for('login'))

        user = User(username=username, discord=discord)
        user.set_password(password)
        # adds changes to userbase
        db.session.add(user)
        # commits changes and saves to server
        db.session.commit()

        flash('registration successful! have fun :)')
        return redirect(url_for('game'))

    return render_template('login.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('invalid username or password')

    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/dashboard')
@login_required
def dashboard():
    # this is an f string which is a string that you can do cool functional stuff with
    return f'welcome, {current_user.username}!'


# render the game page
@app.route('/game')
def game():
    return render_template('dressup-game.html')


# run the app (if name==main means only run the app when it's being run directly or sth idk really)
if __name__ == "__main__":
    app.run()

