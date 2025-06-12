# imports, to import some libraries that handle some stuff for us so we don't have to write all this dumb code ourself
# flask is a framework to help build web apps, handles some stuff so we don't have to manually
from flask import Flask, render_template, request, redirect, url_for, flash
# database import
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.testing.pickleable import User
# imports for password hashing (data security)
from werkzeug.security import generate_password_hash, check_password_hash
# flask login imports
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

# initialise (basically start the app) flask app
# what is __name__? do NOT fucking ask me i still dont understand that shit and its been 3 years
# this line is allegedly for telling flask where to find the app's code
app = Flask(__name__)

# SQLite Configuration for SQLAlchemy
# the database we are using is SQLite- there are various types you can use but this one is lightweight
# and good for a small project
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///wmedressupgame.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login' #come back and reinspect this later pond doesnt knwo what she doin

# what's the @symbol about? baby i don't fully know. something thats just in the boilerplate code i seen :)
# i think it's something to do with communicating with the imported libraries properly
# in this case we're telling the flask app how it is supposed to pick users out from the db
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# create user class for user objects
class user(UserMixin, db.Model):
    # primary key user ID number. this line of code creates a column in the database
    # that sets an id number for each user in the data type integer
    id = db.Column(db.Integer, primary_key=True)
    # username, type string w character limit 80, each username is unique and user must have a username
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    # function to set a password (known as a setter) (read: setters and getters)
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # a function to check the password from the hash
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# create function to handle user registrations
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # prevents register for duplicate user and error msg
        if User.query.filter_by(username=username).first():
            flash('username already exists')
            return redirect(url_for('register'))

        user = User(username=username)
        user.set_password(password)
        # adds changes to userbase
        db.session.add(user)
        # commits changes and saves to server
        db.session.commit()

        flash('registration successful! have fun :)')
        return redirect(url_for('login'))

# TODO: revisit this line as url may be incorrect
    return render_template('register.html')

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


# run the app (if name==main means only run the app when it's being run directly or sth idk really)
if __name__ == "__main__":
    app.run()

